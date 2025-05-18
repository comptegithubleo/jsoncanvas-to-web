import { rectangle } from "./rect.js";
import { link } from "./link.js";
import { text } from "./text.js";
import { hoverHandler } from "./hover.js";

export function loadData(linksGroup, nodesGroup) {
  d3.json("/canvas/Untitled.canvas").then(data => {

    const node = nodesGroup.selectAll("g")
    .data(data.nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`)
    // disable mouse pan on node
    .on("mousedown", function(event) {
      console.log("stopped");
      event.stopPropagation();
    })

    rectangle(node);
    
    text(node);

    link(linksGroup, data);

    hoverHandler(linksGroup, nodesGroup);

  });
}
