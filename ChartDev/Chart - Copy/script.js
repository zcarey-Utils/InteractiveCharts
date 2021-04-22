const size = 1000;
radius = size / 2
data = readJSON("flare.json")

const container = d3.select("div#container");
const svg = container
    .append("svg")
    .attr("viewBox", [-size / 2, -size / 2, size, size]);

//Add tooltip
const tooltip = container.append('div').attr('class', 'sunburst-tooltip');
container.on('mousemove', function (ev) {
    var mousePos = d3Pointer(ev);
    tooltip.style('left', mousePos[0] + 'px')
        .style('top', mousePos[1] + 'px');
        //.style('transform', "translate(-".concat(mousePos[0] / window.innerWidth * 100, "%, 21px)")); // adjust horizontal position to not exceed canvas boundaries
});

//Reset focus by clicking on the canvas
svg.on('click', function () {
    focusOn(null); // Reset zoom on canvas click
});

//Reset tooltip? when hovered on canvas
svg.on('mouseover', function () {
    //onHover(null);
});

//Temporary tooltip title
tooltipTitle = function (data, d) {
    return "I am a title!";
};

//Temporary tooltip content
tooltipContent = function (data, d) {
    return "I am content!";
};

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

const formatNumber = d3.format(',d');

const x = d3.scaleLinear()
    .range([0, 2 * Math.PI])
    .clamp(true);

const y = d3.scaleSqrt()
    .range([radius * .1, radius]);

const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

const partition = d3.partition();

const arc = d3.arc()
    .startAngle(d => x(d.x0))
    .endAngle(d => x(d.x1))
    .innerRadius(d => Math.max(0, y(d.y0)))
    .outerRadius(d => Math.max(0, y(d.y1)));

const middleArcLine = d => {
    const halfPi = Math.PI / 2;
    const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
    const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

    const middleAngle = (angles[1] + angles[0]) / 2;
    const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
    if (invertDirection) { angles.reverse(); }

    const path = d3.path();
    path.arc(0, 0, r, angles[0], angles[1], invertDirection);
    return path.toString();
};

const textFits = d => {
    const CHAR_SPACE = 6;

    const deltaAngle = x(d.x1) - x(d.x0);
    const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
    const perimeter = r * deltaAngle;

    return d.data.name.length * CHAR_SPACE < perimeter;
};

root = data;

root = d3.hierarchy(root);
root.sum(d => d.size);

const slice = svg.selectAll('g.slice')
    .data(partition(root).descendants());

slice.exit().remove();

const newSlice = slice.enter()
    .append('g').attr('class', 'slice')
    .on('click', function(ev, d) {
        ev.stopPropagation();
        focusOn(d);
    }).on('mouseover', function (ev, d) {
        ev.stopPropagation();
        //onHover(d.data);
        tooltip.style('display', 'inline');
        tooltip.html("<div class=\"tooltip-title\">".concat(tooltipTitle ? tooltipTitle(d.data, d) : getNodeStack(d).slice(state.excludeRoot ? 1 : 0).map(function (d) {
            return nameOf(d.data);
        }).join(' &rarr; '), "</div>").concat(tooltipContent(d.data, d)));
    }).on("mouseout", function () {
        tooltip.style('display', 'none');
    });

newSlice.append('title')
    .text(d => d.data.name + '\n' + formatNumber(d.value));

newSlice.append('path')
    .attr('class', 'main-arc')
    .style('fill', d => color((d.children ? d : d.parent).data.name))
    .attr('d', arc);

newSlice.append('path')
    .attr('class', 'hidden-arc')
    .attr('id', (_, i) => `hiddenArc${i}`)
    .attr('d', middleArcLine);

const text = newSlice.append('text')
    .attr('display', d => textFits(d) ? null : 'none');

// Add white contour
/*text.append('textPath')
    .attr('startOffset', '50%')
    .attr('xlink:href', (_, i) => `#hiddenArc${i}`)
    .text(d => d.data.name)
    .style('fill', 'none')
    .style('stroke', '#fff')
    .style('stroke-width', 5)
    .style('stroke-linejoin', 'round');
    */
text.append('textPath')
    .attr('startOffset', '50%')
    .attr('xlink:href', (_, i) => `#hiddenArc${i}`)
    .text(d => d.data.name);

function focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
    // Reset to top-level if no data point specified

    const transition = svg.transition()
        .duration(750)
        .tween('scale', () => {
            const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(y.domain(), [d.y0, 1]);
            return t => { x.domain(xd(t)); y.domain(yd(t)); };
        });

    transition.selectAll('path.main-arc')
        .attrTween('d', d => () => arc(d));

    transition.selectAll('path.hidden-arc')
        .attrTween('d', d => () => middleArcLine(d));

    transition.selectAll('text')
        .attrTween('display', d => () => textFits(d) ? null : 'none');

    moveStackToFront(d);

    //

    function moveStackToFront(elD) {
        svg.selectAll('.slice').filter(d => d === elD)
            .each(function (d) {
                this.parentNode.appendChild(this);
                if (d.parent) { moveStackToFront(d.parent); }
            })
    }
}
