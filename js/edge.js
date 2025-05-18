// code for edge + arrowhead

export function edge(svg, edgesGroup, data) {

  //add arrows
  const defs = svg.append("svg:defs");
  data.edges.forEach(edge => {
    defs.append("svg:marker")
      .attr("id", `arrow-${edge.id}`)
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 10)
      .attr("refY", 5)
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", 6)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M 0 2 C 0 1 0 0 2 1 L 6 3 C 10 5 10 5 6 7 L 2 9 C 0 10 0 9 0 8 Z")
      .style("stroke", edge.color || "#7e7e7e")
      .style("fill", edge.color || "#7e7e7e");
  });

  //add edges
  edgesGroup.selectAll("path.edge")
    .data(data.edges)
    .enter()
    .append("path")
    .attr("class", "edge")
    .attr("id", d => d.id)
    .attr("d", d => {
      const sourceNode = getNodeById(data.nodes, d.fromNode);
      const targetNode = getNodeById(data.nodes, d.toNode);
      const source = getAnchorPoint(sourceNode, d.fromSide);
      const target = getAnchorPoint(targetNode, d.toSide);

      return generateCurvedPath(source, target, d.fromSide, d.toSide);
    })
    .style("fill", "none")
    .style("stroke", d => d.color || "#7e7e7e")
    .style("stroke-width", 3)
    .attr("marker-end", d => (d.toEnd === "none") ? null : `url(#arrow-${d.id})`)
    //todo : bidirectionnal
    .attr("marker-start", d => (d.fromEnd === "none") ? null : `url(#arrow-${d.id})`)

  //ghost edges (easier to hover or select)
  edgesGroup.selectAll("path.edge-ghost")
    .data(data.edges)
    .enter()
    .append("path")
    .attr("class", "edge-ghost")
    .attr("d", d => {
      const sourceNode = getNodeById(data.nodes, d.fromNode);
      const targetNode = getNodeById(data.nodes, d.toNode);
      const source = getAnchorPoint(sourceNode, d.fromSide);
      const target = getAnchorPoint(targetNode, d.toSide);

      return generateCurvedPath(source, target, d.fromSide, d.toSide);
    })
    .style("fill", "none")
    .style("stroke", d => d.color || "#7e7e7e")
    .style("opacity", 0)
    .style("stroke-width", 15)
}

// custom bezier, fixes edge going in straight directions, adds "momentum" to the start and end connections
function generateCurvedPath(source, target, fromSide, toSide) {
  const offset = 90;

  const sourceOffset = { ...source };
  const targetOffset = { ...target };

  switch (fromSide) {
    case 'left':
      sourceOffset.x -= offset;
      break;
    case 'right':
      sourceOffset.x += offset;
      break;
    case 'top':
      sourceOffset.y -= offset;
      break;
    case 'bottom':
      sourceOffset.y += offset;
      break;
  }

  switch (toSide) {
    case 'left':
      targetOffset.x -= offset;
      break;
    case 'right':
      targetOffset.x += offset;
      break;
    case 'top':
      targetOffset.y -= offset;
      break;
    case 'bottom':
      targetOffset.y += offset;
      break;
  }

  return `M${source.x},${source.y} C${sourceOffset.x},${sourceOffset.y} ${targetOffset.x},${targetOffset.y} ${target.x},${target.y}`;
}

function getNodeById(nodes, id) {
  return nodes.find(node => node.id === id);
}

function getAnchorPoint(node, side) {
  const w = node.width || 100;
  const h = node.height || 50;
  switch (side) {
    case 'left':
      return { x: node.x, y: node.y + h / 2 };
    case 'right':
      return { x: node.x + w, y: node.y + h / 2 };
    case 'top':
      return { x: node.x + w / 2, y: node.y };
    case 'bottom':
      return { x: node.x + w / 2, y: node.y + h };
    default:
      return { x: node.x + w / 2, y: node.y + h / 2 };
  }
}