// handle text and text wrapping when too long. Other method : https://gist.github.com/mbostock/7555321
/*
Structure of the text node (see zero-md doc : https://zerodevx.github.io/zero-md/)

<g class="node" ...>
  <foreignObject ...>
    <div ...>
      <zero-md>
        <script type="text/markdown">

          # Hello World
          This is a test
        
          <template ...>
*/
export function text(node) {
  node.append("foreignObject")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", d => d.width || 100)
  .attr("height", d => d.height || 50)
  .style("padding-top", "3px")

  .append("xhtml:div")
  //.style("display", "flex")
  //.style("align-items", "center")
  //.style("overflow-y", "auto")
  .style("word-wrap", "break-word")
  .style("padding", "0px 25px")
  .style("font-family", "Roboto, sans-serif")
  .style("font-size", "17px")
  .style("color", d => d.textColor || "#bebebe")

  .append("zero-md")
  .append("script")
  .attr("type", "text/markdown")
  .text(d => d.text || d.id)
  .append("template")
  .attr("rel", "stylesheet")
  .attr("media", "(prefers-color-scheme:dark)")
  .attr("href", "https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11/styles/github-dark.min.css")
}