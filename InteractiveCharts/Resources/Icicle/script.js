const width = 975;
const height = 2400
data = readJSON("data.json")

partition = data => d3.partition()
    .size([height, width])
    .padding(1)
    (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.height - a.height || b.value - a.value))

color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
format = d3.format(",d")

const root = partition(data);

/*const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("font", "10px sans-serif");
*/

const svg = d3.select("div#container")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("font", "10px sans-serif");

const cell = svg
    .selectAll("g")
    .data(root.descendants())
    .join("g")
    .attr("transform", d => `translate(${d.y0},${d.x0})`);

cell.append("rect")
    .attr("width", d => d.y1 - d.y0)
    .attr("height", d => d.x1 - d.x0)
    .attr("fill-opacity", 0.6)
    .attr("fill", d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
    });

const text = cell.filter(d => (d.x1 - d.x0) > 16).append("text")
    .attr("x", 4)
    .attr("y", 13);

text.append("tspan")
    .text(d => d.data.name);

text.append("tspan")
    .attr("fill-opacity", 0.7)
    .text(d => ` ${format(d.value)}`);

cell.append("title")
    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);