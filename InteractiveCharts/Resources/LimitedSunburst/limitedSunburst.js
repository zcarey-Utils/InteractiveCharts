width = 1000;
radius = width / 6;
data = readJSON("data.json");

color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
format = d3.format(",d")
arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

function partition(data) {
    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
    return d3.partition()
        .size([2 * Math.PI, root.height + 1])
        (root);
}

const root = partition(data);

root.each(d => d.current = d);

/*
const svg = d3.create("svg")
  .attr("viewBox", [0, 0, width, width])
  .style("font", "10px sans-serif");
  */
const container = d3.select('div#container');
const svg = container
    .append('svg')
    .attr("viewBox", [0, 0, width, width])
    .style("font", "10px sans-serif");

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

const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${width / 2})`);

const path = g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
    .attr("d", d => arc(d.current))
    .on('mouseover', sliceMouseOver)
    .on('mouseout', sliceMouseOut);;

path.filter(d => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);

//path.append("title")
//    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

const label = g.append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
    .attr("dy", "0.35em")
    .attr("fill-opacity", d => +labelVisible(d.current))
    .attr("transform", d => labelTransform(d.current))
    .text(d => d.data.name);

const parent = g.append("circle")
    .datum(root)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("click", clicked);

function clicked(event, p) {
    parent.datum(p.parent || root);

    root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
    });

    const t = g.transition().duration(750);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path.transition(t)
        .tween("data", d => {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
        })
        .filter(function (d) {
            return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attrTween("d", d => () => arc(d.current));

    label.filter(function (d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
    }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
}

function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
}

function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
}

function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}

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

function sliceMouseOver(ev, d) {
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