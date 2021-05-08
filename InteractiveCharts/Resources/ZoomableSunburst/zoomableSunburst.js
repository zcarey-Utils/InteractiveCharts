width = 1000;
radius = width / 2;

data = readJSON("data.json")

const temp = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);
const partition = d3.partition().size([2 * Math.PI, radius])
const root = partition(temp);
const aHistory = [];

const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1)

const format = d3.format(",d");

let oLastZoomed = root;

root.each(d => d.current = d);

function sourceEvent(event) {
    let sourceEvent;
    while (sourceEvent = event.sourceEvent) event = sourceEvent;
    return event;
}

function d3Pointer(event, node) {
    event = sourceEvent(event);
    if (node === undefined) node = event.currentTarget;
    if (node) {
        var svg = node.ownerSVGElement || node;
        if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            point.x = event.clientX, point.y = event.clientY;
            point = point.matrixTransform(node.getScreenCTM().inverse());
            return [point.x, point.y];
        }
        if (node.getBoundingClientRect) {
            var rect = node.getBoundingClientRect();
            return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
        }
    }
    return [event.pageX, event.pageY];
}

/*const svg = d3.select(DOM.svg(width, width))
    .style("width", "100%")
    .style("height", "auto")
    .style("padding", "10px")
    .style("font", "10px sans-serif")
    .style("box-sizing", "border-box");
    */
const container = d3.select("div#container");
const svg = container.append("svg")
    .attr("viewBox", [-width / 2, -width / 2, width, width]);

//Add tooltip
const tooltipPadding = 15; //Pixels from the bottom of the screen before it flips sides
const tooltip = container.append('div')
    .attr('id', 'tooltip')
    .attr('class', 'sunburst-tooltip');
const htmlTooltip = document.getElementById('tooltip');

//event to move the tooltip with the mouse
container.on('mousemove', function (ev) {
    var mousePos = d3Pointer(ev);

    var y = mousePos[1];
    var dy = 21;
    var height = htmlTooltip.offsetHeight;
    if ((y + dy + height + tooltipPadding) >= window.innerHeight) {
        dy = -21 - height;
    }
    tooltip.style('left', mousePos[0] + 'px')
        .style('top', y + 'px')
        .style('transform', "translate(-".concat(mousePos[0] / window.innerWidth * 100, "%, " + dy + "px)")); // adjust horizontal position to not exceed canvas boundaries
});

//Tooltip title
if ((typeof tooltipTitle !== "function") || (tooltipTitle.length !== 2)) {
    tooltipTitle = function (data, d) {
        var excludeRoot = false;
        return getNodeStack(d).slice(excludeRoot ? 1 : 0).map(function (d) {
            return d.data.name;
        }).join(' &rarr; ');
    };
}

//Temporary tooltip content
if ((typeof tooltipContent !== "function") || (tooltipContent.length !== 2)) {
    tooltipContent = function (data, d) {
        return "Size: " + format(d.value);
    };
}

//Reset focus by clicking on the canvas
svg.on('click', function () {
    focusOn(root); // Reset zoom on canvas click
});

const g = svg.append("g");

let paths = g.append("g")
    .attr("fill-opacity", 0.6)
    .selectAll("path")
    .data(root.descendants())
    .enter().append("path")
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return !d.depth ? 'none' : color(d.data.name); })
    .attr("fill-opacity", d => d.children ? 0.6 : 0.4)
    .attr("d", arc)
    .attr("id", function (d, i) {
        return 'cp-' + i;
    })
    .on('mouseover', sliceMouseOver)
    .on('mouseout', sliceMouseOut);

//paths.append("title")
//    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

paths.filter(d => d.children)
    .style('cursor', 'pointer')
    .on("click", function (ev, p) {
        ev.stopPropagation();
        focusOn(p);
    });

const labels = g.append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants().filter(d => d.depth))
    .enter().append("text")
    .attr("transform", d => labelTransform(d))
    .attr("fill-opacity", d => +labelVisible(d))
    .attr("dy", "0.35em")
    .attr("clip-path", function (d, i) {
        return 'url(#cp-' + i + ')';
    })
    .text(d => arcText(d, d.data.name));

function labelVisible(d) {
    return (d.x1 - d.x0 > 0) && ((d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10);
}

function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}

// Label of an arc
function arcText(d, sKey) {
    var CHAR_SPACE = 7,
        deltaAngle = d.x1 - d.x0,
        r = Math.max(0, (d.y0 + d.y1) / 2),
        perimeter = r * deltaAngle,
        iMinLength = 3, // minimum length of label
        iMaxLength = Math.floor(perimeter / CHAR_SPACE);

    iMaxLength = iMaxLength < iMinLength ? 0 : iMaxLength;
    // Need to tune it better
    return sKey; //(sKey || '').toString().slice(0, iMaxLength);
}

function focusOn(p) {
    /**
     * First time, mark the clicked node as zoomed;
     * Second time, un-mark the node as zoomed.
     * When an already zoomed node is clicked, lets zoom out to its parent or root.
     */
    let target;

    // determine actual node to highlight
    // root will have no parent
    if (p.depth > 1) {
        target = p.bZoomed ? p : (p.children ? p : p.parent);
    } else {
        target = p;
    }

    if (target.bZoomed) {
        delete target.bZoomed;
        target = oLastZoomed = aHistory.pop();

        if (!aHistory.length) {
            root.bHighlighted = true;
            target = oLastZoomed = root;
        }
    } else {
        target.bZoomed = true;
        if (oLastZoomed) {
            aHistory.push(oLastZoomed);
        }
        oLastZoomed = target;
    }

    root.each(function (d) {
        d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - target.x0) / (target.x1 - target.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - target.x0) / (target.x1 - target.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - target.y0),
            y1: Math.max(0, d.y1 - target.y0)
        };
    });

    const t = g.transition().duration(750);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    paths.transition(t)
        .tween("data", d => {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
        })
        .attrTween("d", d => () => arc(d.current));

    labels.transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
}

function sliceMouseOver (ev, d) {
    ev.stopPropagation();
    tooltip.style('display', 'inline');
    tooltip.html("<div class=\"tooltip-title\">"
        .concat(tooltipTitle ? tooltipTitle(d.data, d) : "", "</div>")
        .concat(tooltipContent(d.data, d)));
}

function sliceMouseOut() {
    tooltip.style('display', 'none');
}

function getNodeStack(d) {
    var stack = [];
    var curNode = d;

    while (curNode) {
        stack.unshift(curNode);
        curNode = curNode.parent;
    }

    return stack;
}


/*
document.body.appendChild(svg.node());

const box = g.node().getBBox();

svg.remove()
    .attr("width", box.width)
    .attr("height", box.height)
    .attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);

return svg.node();
*/