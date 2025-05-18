// for now it generates points in viewport -> refrehses every pan movement
// todo : optimize by making chunks around viewport -> refresh only when going outside of chunk

export function zoomHandler(svg, gridGroup, edgesGroup, nodesGroup) {
  const zoom = d3.zoom()
    .scaleExtent([0.1, 10])
    .on("zoom", (event) => {
      const transform = event.transform;
      gridGroup.attr("transform", transform);
      edgesGroup.attr("transform", transform);
      nodesGroup.attr("transform", transform);

      const zoomLevel = Math.max(Math.floor(Math.log2(1.5 / transform.k)), -1);
      const gridSize = 50 * Math.pow(2, zoomLevel);

      const visiblePoints = getVisibleGridPoints(transform, gridSize, svg);
      const dots = gridGroup.selectAll("circle").data(visiblePoints, d => `${d.x},${d.y}`);

      dots.enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 1.5)
        //.attr("fill", randomHexColorCode());
        .attr("fill", "#2c2c2c");

        dots.exit().remove();
    });
      
  svg.call(zoom).on("dblclick.zoom", null);
}

const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};
  

function getVisibleGridPoints(transform, gridSize) {

  const width = window.innerWidth;
  const height = window.innerHeight;
  
  const startX = Math.floor((-transform.x) / (gridSize * transform.k)) * gridSize;
  let endX = Math.ceil((width - transform.x) / (gridSize * transform.k)) * gridSize;
  const startY = Math.floor((-transform.y) / (gridSize * transform.k)) * gridSize;
  let endY = Math.ceil((height - transform.y) / (gridSize * transform.k)) * gridSize;

  const points = [];

  for (let x = startX; x <= endX; x += gridSize) {
    for (let y = startY; y <= endY; y += gridSize) {
      points.push({ x, y });
    }
  }
  return points;
}