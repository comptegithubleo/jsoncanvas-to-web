import { zoomHandler } from "./zoom.js";
import { loadData } from "./loadData.js";

const svg = d3.select("#canvas")
.style("background-color", "#1e1e1e");
const gridGroup = svg.select(".grid");
const edgesGroup = svg.select(".edges");
const nodesGroup = svg.select(".nodes");

loadData(svg, edgesGroup, nodesGroup);

zoomHandler(svg, gridGroup, edgesGroup, nodesGroup);