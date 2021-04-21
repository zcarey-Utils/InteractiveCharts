// https://observablehq.com/@git-ashish/d3-sunburst-zoomable@272
function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# D3 Sunburst — Zoomable

The Flare visualization toolkit package hierarchy. Data: [Flare](https://flare.prefuse.org).

Key points about the interaction - 

* Arcs are clickable. Allows you to focus on clicked parent and its descendents.
* Organic user flow of drill down is followed. It makes the interaction more intutive.
`
)});
  main.variable(observer("chart")).define("chart", ["partition","data","d3","DOM","width","color","arc","format"], function(partition,data,d3,DOM,width,color,arc,format)
  {
      data = readJSON("flare.json")
  const root = partition(data);
  console.log(root)
  const aHistory = [];
  
  let oLastZoomed = root;
  
  root.each(d => d.current = d);

  const svg = d3.select(DOM.svg(width, width))
      .style("width", "100%")
      .style("height", "auto")
      .style("padding", "10px")
      .style("font", "10px sans-serif")
      .style("box-sizing", "border-box");
  
  const g = svg.append("g");
  
  let paths = g.append("g")
      .attr("fill-opacity", 0.6)
    .selectAll("path")
    .data(root.descendants())
    .enter().append("path")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return !d.depth ? 'none' : color(d.data.name); })
      .attr("fill-opacity", d => d.children ? 0.6 : 0.4)
      .attr("d", arc)
      .attr("id", function(d,i){
        return 'cp-' + i;
      });
  
  paths.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
  
  paths.filter(d => d.children)
    .style('cursor', 'pointer')
    .on("click", clicked);
  
   const labels = g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants().filter(d => d.depth))
    .enter().append("text")
      .attr("transform", d => labelTransform(d))
      .attr("fill-opacity", d => +labelVisible(d) )
      .attr("dy", "0.35em")
      .attr("clip-path", function(d, i){
        return 'url(#cp-'+ i + ')';
      })
      .text(d => arcText(d, d.data.name));
  
  function labelVisible(d) {
    return (d.x1 - d.x0 > 0) && ((d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10);
  }
  
  function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 ;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }
  
  // Label of an arc
  function arcText(d, sKey) {
    var CHAR_SPACE = 7,
      deltaAngle = d.x1 - d.x0,
      r = Math.max(0, (d.y0 + d.y1) / 2),
      perimeter = r * deltaAngle,
      iMinLength = 3, // minimum length of label
      iMaxLength = Math.floor(perimeter/CHAR_SPACE);
      
    iMaxLength = iMaxLength < iMinLength ? 0 : iMaxLength;
    // Need to tune it better
    return sKey; //(sKey || '').toString().slice(0, iMaxLength);
  }
  
  function clicked(p) {

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
    }else{
      target = p;
    }
    
    if(target.bZoomed){
      delete target.bZoomed;
      target = oLastZoomed = aHistory.pop();

      if (!aHistory.length) {
        root.bHighlighted = true;
        target = oLastZoomed = root;
      }
    }else{
      target.bZoomed = true;
      if (oLastZoomed) {
        aHistory.push(oLastZoomed);
      }
      oLastZoomed = target;
    }
    
    root.each(function(d){ 
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
        .attr("fill-opacity", d => +labelVisible(d.target) )
        .attrTween("transform", d => () => labelTransform(d.current));

  }
  
 
  
  document.body.appendChild(svg.node());

  const box = g.node().getBBox();

  svg.remove()
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);

  return svg.node();
}
);
  main.variable(observer("partition")).define("partition", ["d3","radius"], function(d3,radius){return(
data => d3.partition()
    .size([2 * Math.PI, radius])
  (d3.hierarchy(data)
    .sum(d => d.size)
    .sort((a, b) => b.value - a.value))
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});
  main.variable(observer("width")).define("width", function(){return(
930
)});
  main.variable(observer("radius")).define("radius", ["width"], function(width){return(
width / 2
)});
  main.variable(observer("arc")).define("arc", ["d3","radius"], function(d3,radius){return(
d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1)
)});
    main.variable(observer("data")).define("data", ["require"], function (require) {
        return (
            readJSON("flare.json")//require("@observablehq/flare")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("https://d3js.org/d3.v5.min.js")
)});
  return main;
}
