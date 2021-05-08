const width = 640;
breadcrumbHeight = 30;
breadcrumbWidth = 75;
radius = width / 2;
data = readJSON("flare.json")

partition = data =>
    d3.partition().size([2 * Math.PI, radius * radius])(
        d3
            .hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value)
    )

color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
format = d3.format(",d")

const root = partition(data);

arc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(1 / radius)
    .padRadius(radius)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(d => Math.sqrt(d.y1) - 1)

mousearc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(radius)

/* const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("font", "10px sans-serif");
*/

const vis = d3.select("div#container")
//    .append("div").classed("vis-container", true)
//    .style("position", "relative");

const svg = vis.append("div").classed("sunburst-container", true)
 //   .style("position", "absolute")
    .append("svg")
    .attr("viewBox", [-radius, -radius, width, width])
    .style("font", "12px sans-serif");

const breadScale = (width / (breadcrumbWidth * 10));

const svgBread = vis.append("div").classed("breadcrumbs-container", true)
 //   .style("position", "absolute")
    .append("svg")
    .attr("viewBox", [0, 0, breadcrumbWidth * 10, breadcrumbHeight])
    .style("font", "12px sans-serif")
    .style("background", "#000")
    .style("margin", "5px"); 

// Make this into a view, so that the currently hovered sequence is available to the breadcrumb
var element = { sequence: [], percentage: 0.0 };

const label = svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("fill", "#888")
    .style("visibility", "hidden");

label
    .append("tspan")
    .attr("class", "percentage")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dy", "-0.1em")
    .attr("font-size", "3em")
    .text("");

label
    .append("tspan")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dy", "1.5em")
    .text("of visits begin with this sequence");

const path = svg
    .append("g")
    .selectAll("path")
    .data(
        root.descendants().filter(d => {
            // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
            return d.depth && d.x1 - d.x0 > 0.001;
        })
    )
    .join("path")
    .attr("fill", d => color(d.data.name))
    .attr("d", arc);

svg
    .append("g")
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseleave", () => {
        path.attr("fill-opacity", 1);
        label.style("visibility", "hidden");
        // Update the value of this view
        element = { sequence: [], percentage: 0.0 };
        //element.dispatchEvent(new CustomEvent("input"));
        drawBreadcrumbs();
    })
    .selectAll("path")
    .data(
        root.descendants().filter(d => {
            // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
            return d.depth && d.x1 - d.x0 > 0.001;
        })
    )
    .join("path")
    .attr("d", mousearc)
    .on("mouseenter", (event, d) => {
        // Get the ancestors of the current segment, minus the root
        const sequence = d
            .ancestors()
            .reverse()
            .slice(1);
        // Highlight the ancestors
        path.attr("fill-opacity", node =>
            sequence.indexOf(node) >= 0 ? 1.0 : 0.3
        );
        const percentage = ((100 * d.value) / root.value).toPrecision(3);
        label
            .style("visibility", null)
            .select(".percentage")
            .text(percentage + "%");
        // Update the value of this view with the currently hovered sequence and percentage
        element = { sequence: sequence, percentage: percentage };
        //element.dispatchEvent(new CustomEvent("input"));
        drawBreadcrumbs();
    });

function breadcrumbPoints(d, i) {
    const tipWidth = 10;
    const points = [];
    points.push("0,0");
    points.push(`${breadcrumbWidth},0`);
    points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`);
    points.push(`${breadcrumbWidth},${breadcrumbHeight}`);
    points.push(`0,${breadcrumbHeight}`);
    if (i > 0) {
        // Leftmost breadcrumb; don't include 6th vertex.
        points.push(`${tipWidth},${breadcrumbHeight / 2}`);
    }
    return points.join(" ");
}

function drawBreadcrumbs() { //TODO just pass the breadcrumb parameters
    g = svgBread
        .selectAll("g")
        .data(element.sequence)
        .join("g")
        .attr("transform", (d, i) => `translate(${i * breadcrumbWidth}, 0)`);

    g.append("polygon")
        .attr("points", breadcrumbPoints)
        .attr("fill", d => color(d.data.name))
        .attr("stroke", "white");

    g.append("text")
        .attr("x", (breadcrumbWidth + 10) / 2)
        .attr("y", 15)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(d => d.data.name);

    svgBread
        .append("text")
        .text(element.percentage > 0 ? element.percentage + "%" : "")
        .attr("x", (element.sequence.length + 0.5) * breadcrumbWidth)
        .attr("y", breadcrumbHeight / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle");
}