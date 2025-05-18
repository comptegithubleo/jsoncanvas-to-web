// code for link + arrowhead

export function link(linksGroup, data) {
  //link
  linksGroup.selectAll("path.link")
    .data(data.edges)
    .enter()
    .append("path")
    .attr("class", "link")
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
    .style("stroke-width", 2)
    // no arrowhead when toEnd is "none", not working :(
    .attr("marker-end", d => (d.toEnd === "none") ? null : "url(#arrowhead)");

    //ghost link (easier to hover or select)
    linksGroup.selectAll("path.link-ghost")
    .data(data.edges)
    .enter()
    .append("path")
    .attr("class", "link-ghost")
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

  //arrowhead
  linksGroup.selectAll("path.arrowhead")
    .data(data.edges)
    .enter()
    .append("path")
    .attr("class", "arrowhead")
    .attr("d", d => {
      const targetNode = getNodeById(data.nodes, d.toNode);
      const target = getAnchorPoint(targetNode, d.toSide);
      const size = 10;
      let path;

      switch (d.toSide) {
        case 'left':
          path = `M${target.x},${target.y} l${-size},${-size / 2} l0,${size} Z`;
          break;
        case 'right':
          path = `M${target.x},${target.y} l${size},${-size / 2} l0,${size} Z`;
          break;
        case 'top':
          path = `M${target.x},${target.y} l${-size / 2},${-size} l${size},0 Z`;
          break;
        case 'bottom':
          path = `M${target.x},${target.y} l${-size / 2},${size} l${size},0 Z`;
          break;
        default:
          path = '';
      }

      return path;
    })
    .style("fill", d => d.color || "#7e7e7e");
}

// custom bezier, fixes link going in straight directions, adds "momentum" to the start and end connections
function generateCurvedPath(source, target, fromSide, toSide) {
  const offset = 130; 

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