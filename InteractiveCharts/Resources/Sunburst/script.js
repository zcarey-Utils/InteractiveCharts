const size = 1000;
radius = size / 2
data = readJSON("data.json")

partition = data => d3.partition()
    .size([2 * Math.PI, radius])
    (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value))

color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
format = d3.format(",d")

arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1)
/*
function autoBox() {
    document.body.appendChild(this);
    const { x, y, width, height } = this.getBBox();
    document.body.removeChild(this);
    return [x, y, width, height];
}
*/
const root = partition(data);

//const svg = d3.create("svg");
//const svg = d3.select('.container').append('svg')
/*const svg = d3.select('.container')
    .append("div")
    // Container class to make it responsive.
    .classed("svg-container", true)
    .append("svg")
    // Responsive SVG needs these 2 attributes and no width and height attr.
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "" + (-width/2) + " " + (-width/2) + " " + width + " " + width)
    // Class to make it responsive.
    .classed("svg-content-responsive", true)*/


const svg = d3.select("div#container")
    .append("svg")
    .attr("viewBox", [-size/2, -size/2, size, size]);

svg.append("g")
    .attr("fill-opacity", 0.6)
    .selectAll("path")
    .data(root.descendants().filter(d => d.depth))
    .join("path")
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr("d", arc)
    .append("title")
    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

svg.append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .selectAll("text")
    .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
    .join("text")
    .attr("transform", function (d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    })
    .attr("dy", "0.35em")
    .text(d => d.data.name);

//svg.attr("viewBox", autoBox).node();
//svg.attr("viewBox", [0, 0, width, width])