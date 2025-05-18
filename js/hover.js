export function hoverHandler(edgesGroup, nodesGroup) {
  nodesGroup.selectAll("g.node")
  .on('mouseover', function (event, d) {
    d3.select(this).select("rect")
      .transition()
      .duration(150)
      .style("stroke-width", 4);
  })
  .on('mouseout', function (event, d) {
    d3.select(this).select("rect")
      .transition()
      .duration(150)
      .style("stroke-width", 2);
  });

  edgesGroup.selectAll("path.edge-ghost")
  .on("mouseover", function(event, d) {
    edgesGroup.selectAll("path.edge[id='" + d.id + "']")
      .transition()
      .duration(150)
      .style("stroke-width", 4);

    d3.select(this)
      .transition()
      .duration(150)
      .style("opacity", 0.2);
  })
  .on("mouseout", function (event, d) {
    edgesGroup.selectAll("path.edge[id='" + d.id + "']")
      .transition()
      .duration(150)
      .style("stroke-width", 3);
      
    d3.select(this)
      .transition()
      .duration(150)
      .style("opacity", 0);
  });
}