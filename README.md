## Description
Export your Obsidian canvas in a web page.
Converts .canvas file (in [jsoncanvas](https://github.com/obsidianmd/jsoncanvas) format) to html/js, with [d3.js](https://github.com/d3/d3) for data-viz, [zero-md](https://github.com/zerodevx/zero-md) for markdown to HTML rendering.

A small Golang server `main.go` is used to serve the website. Remove if needed.

## Usage
1. Replace the `Untitled.canvas` in the `canva` folder by your .canvas file
2. If needed, change the filename of the .canvas file in the `loadData.js` line `d3.json("/canvas/FILENAME_HERE.canvas").then(data => {`
3. Using the included Golang server or yours, serve the folder to access `index.html`

## Todo
- Text in links
- Nicer bezier curves
- Side UI tutorial (pan + zoom instructions)
- ...

## Development
Pull request are welcome for features or polishing, otherwise project is on standby.