import { zoomHandler } from "./zoom.js";
import { loadData } from "./loadData.js";

const svg = d3.select("#canvas")
.style("background-color", "#1e1e1e");
const gridGroup = svg.select(".grid");
const linksGroup = svg.select(".links");
const nodesGroup = svg.select(".nodes");

loadData(linksGroup, nodesGroup);

zoomHandler(svg, gridGroup, linksGroup, nodesGroup);