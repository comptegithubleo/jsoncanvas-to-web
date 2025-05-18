export function rectangle(node) {
  node.append("rect")
    .attr("width", d => d.width || 100)
    .attr("height", d => d.height || 50)
    .style("rx", 8)
    .style("ry", 8)
    .style("fill", "#1e1e1e")
    .style("stroke", d => d.color || "#7e7e7e")
    .style("stroke-width", 2);
}