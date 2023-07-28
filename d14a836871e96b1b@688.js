function _1(md){return(
md`# SPOTIFY | ARTISTS INTERACTIVE | D3

What makes music danceable? 👯     

In order to answer this question, we will check in this notebook the relationship of different audio features with danceability by artist. 

Find out by selecting the corresponding audio feature in the drop-down menu and check out the relationship with "danceability". For detailed information about the artist hover over the points. 



Data source: [Kaggle](https://www.kaggle.com/code/vatsalmavani/music-recommendation-system-using-spotify-dataset/data) `
)}



function _Channel(Inputs,data){return(
Inputs.select(data.columns.slice(2), {
  label: "",
  value: "energy"
})
)}

function _voronoi_chart_and_points(d3,width,height,data,x,c,y,Channel,voronoi,hover,xAxis,yAxis)
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

  const circles = svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => x(d.danceability))
    .attr("cy", 0)
    .style("fill", (d) => c(d.danceability))
    .style("opacity", 0.5)
    .attr("r", 0)
    .transition()
    .duration(1)
    .delay((d, i) => i * 0.2)
    .attr("r", 2)
    .attr("cy", (d) => y(d[Channel]));


  const cells = svg
    .append("g")
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .selectAll("path")
    .data(data)
    .join("path")
    .attr("d", (d, i) => voronoi.renderCell(i));

  const tip = svg
    .append("g")
    .style("pointer-events", "none")
    .attr("class", "tooltip");
  cells
    .on("mouseenter", (event) => {
      const value = event.target.__data__;
      const pointer = [x(value.danceability), y(value[Channel])];
      const text = [value.artists];
      tip.call(hover, pointer, text);
    })
    .on("mouseout", (event) => {
      tip.selectAll("*").remove();
    });

  svg.append("g").call(xAxis);

  svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height - 5})`)
    .append("text")
    .style("text-anchor", "middle")
    .text("danceability")
    .attr("class", "x_text");

  svg.append("g").call(yAxis);

  svg
    .append("g")
    .attr("transform", `translate(30, ${height / 2})rotate(-90)`)
    .append("text")
    .style("text-anchor", "middle")
    .text(Channel)
    .attr("class", "y_text");

  return svg.node();
}


function _voronoi(d3,data,x,y,Channel,margin,width,height){return(
d3.Delaunay.from(
  data,
  (d) => x(d.danceability),
  (d) => y(d[Channel])
).voronoi([
  margin.left,
  margin.top,
  width - margin.right,
  height - margin.bottom
])
)}

function _6(md){return(
md`### Scales`
)}

function _c(d3,data){return(
d3
  .scaleLinear()
  .range(["#F20505", "#024059"])
  .domain(d3.extent(data, (d) => d.danceability))
)}

function _x(d3,data,margin,width){return(
d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.danceability))
  .nice()
  .range([margin.left, width - margin.right])
)}

function _y(d3,data,Channel,height,margin){return(
d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d[Channel]))
  .nice()
  .range([height - margin.bottom, margin.top])
)}

function _10(md){return(
md`### Axes`
)}

function _xAxis(height,margin,d3,x,width,formatNumber){return(
(g) =>
  g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(
      d3
        .axisTop(x)
        .tickValues(0)
        .tickSize(-width)
        .tickPadding(1)
        .tickFormat(formatNumber)
    )
)}

function _yAxis(margin,d3,y,formatNumber){return(
(g) =>
  g
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(0).tickSize(0).tickFormat(formatNumber))
)}

function _13(md){return(
md`### Interactivity`
)}

function _hover(margin,width){return(
(tip, pos, text) => {
  const side_padding = 3;

  tip
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .attr("transform", `translate(${pos[0]}, ${pos[1]})`)
    .selectAll("text")
    .data(text)
    .join("text")
    .style("dominant-baseline", "ideographic")
    .text((d) => d)
    .attr("y", (d, i) => (i - (text.length - 1)) * 10)
    .style("font-weight", (d, i) => (i === 0 ? "bold" : "normal"));

  const bbox = tip.node().getBBox();


  tip
    .append("rect")
    .attr("y", bbox.y)
    .attr("x", bbox.x - side_padding)
    .attr("width", bbox.width + side_padding * 2)
    .attr("height", bbox.height)
    .style("fill", "white")
    .style("stroke", "white")
    .lower();


  let x = pos[0];
  let y = pos[1];

 
  if (x + bbox.x < margin.left) {
    x = margin.left + bbox.width / 2 + side_padding;
  }
  
  else if (x - bbox.x > width - margin.right) {
    x = width - margin.right - bbox.width / 2;
  }

  
  if (y + bbox.y < 0) {
    y = margin.top + bbox.height + 10;
  }
  tip.attr("transform", `translate(${x}, ${y})`);
}
)}

function _15(md){return(
md`### Data`
)}

function _formatNumber(d3){return(
d3.format(".0")
)}

async function _data(d3,FileAttachment){return(
d3.csvParse(
  await FileAttachment("data_by_artist.csv").text(),
  d3.autoType
)
)}

function _18(md){return(
md`
---
## Appendix`
)}

function _height(){return(
500
)}

function _d3(require){return(
require("d3@7")
)}

function _margin(){return(
{top: 20, right: 30, bottom: 30, left: 40}
)}

function _style(html){return(
html`<style>

@import url("https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;1,100;1,300&display=swap");

body {
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight:400;
  font-size:13px;
  background-color:white;
}

svg {
  background-color:white;
}

/*Defining text stylings*/

h1 {
  margin-top: 50;
  font-size: 1.3rem;
  color:#f20666;
  margin-bottom: 50;
  font-weight:600;
}

h2 {
  margin-top: 5px;
  font-size: 1rem;
  margin-bottom: 5px;
  color:#f20666;
  font-weight:500;
}

h3 {
  margin-top: 5px;
  font-size: 1rem;
  margin-bottom: 10px;
  color:#f20666;
  font-weight:400;
}

h4 {
  margin-top: 5px;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color:#f20666;
  font-weight:300;
}

h5 {
  margin-top: 5px;
  font-size: 1rem;
  margin-bottom: 0px;
  color:#f20666;
  font-weight:400;
}

a:link, a:active, a:visited {
  margin-top:0.5px;
  color:#662e9b;
  font-size:12px;
  font-weight:500;
}

a:hover {
  margin-top:0.5px;
  color:#662e9b;
  font-size:12px;
  font-weight:500;
}

/*Defining axis stylings*/

.y_text, .x_text {
  font-family:'Montserrat Alternates', sans-serif;
  font-weight:600;
  font-size:12px;
  opacity:1;
  fill:#f20666;
}

.y-axis path, .x-axis path {
  fill:none;
  stroke-width:0;
  stroke-opacity:1;
  stroke:#495867;
}

.y-axis line, .x-axis line {
  fill:none;
  stroke-width:0.1;
  stroke-opacity:1;
  stroke:#495867;
  stroke-dasharray:2;
}

.y-axis text, .x-axis text {
  font-family:'Montserrat Alternates', sans-serif;
  font-weight:500;
  font-size:12px;
  opacity:1;
  fill:#495867;
}

/*Defining chart stylings*/

.tooltip {
  font-family:'Montserrat Alternates', sans-serif;
  font-weight:700;
  font-size:17px;
  fill:#f20666;
}

.tooltip2 {
  font-family:'Montserrat Alternates', sans-serif;
  font-weight:400;
  font-size:11px;
  fill:#f20666;
}

circle {
   opacity:1;
   stroke:#f20666;
   stroke-width:0;
}

</style>`
)}

function _23(md){return(
md`
### Danceability
Danceability refers to the suitability of a track for dancing, determined by factors like tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 indicates a track is least danceable, while 1.0 suggests it is highly danceable.
### Acousticness
A confidence measure ranging from 0.0 to 1.0, indicating whether a track is acoustic. A value of 1.0 represents high confidence that the track is acoustic in nature.
### Energy
A measure ranging from 0.0 to 1.0, reflecting the perceived intensity and activity of a track. Energetic tracks often feel fast, loud, and dynamic. For instance, genres like death metal have high energy, while a Bach prelude scores low on this scale. Features like dynamic range, perceived loudness, timbre, onset rate, and entropy contribute to this attribute.
### Duration_ms
The duration of the track in milliseconds.
### Instrumentalness
Instrumentalness predicts whether a track contains vocals or not. Sounds like "ooh" and "aah" are considered instrumental in this context. Tracks with rap or spoken word are clearly labeled as "vocal." The closer the instrumentalness value is to 1.0, the higher the likelihood that the track contains no vocal content. Values above 0.5 generally indicate instrumental tracks, and as the value approaches 1.0, the confidence in it being instrumental increases.
### Liveness
Liveness detects the presence of an audience in the recording. Higher liveness values suggest a greater probability that the track was performed live. A value above 0.8 indicates a strong likelihood that the track is a live performance.
### Loudness
Loudness is the overall volume level of a track measured in decibels (dB). It provides a way to compare the relative loudness of different tracks. Loudness values typically range between -60 dB and 0 dB.
### Speechiness
Speechiness detects the presence of spoken words in a track. The attribute value approaches 1.0 for recordings that are more speech-like, such as talk shows, audio books, or poetry. Values above 0.66 describe tracks that likely consist entirely of spoken words. Values between 0.33 and 0.66 indicate tracks that may contain both music and speech, including genres like rap music. Values below 0.33 are more likely to represent purely instrumental or non-speech-like tracks.
### Tempo
Tempo represents the estimated overall speed or pace of a track, measured in beats per minute (BPM). It derives directly from the average beat duration in musical terms.
### Valence
Valence is a measure ranging from 0.0 to 1.0, describing the level of positiveness conveyed by a track. Tracks with high valence sound more positive, happy, cheerful, or euphoric, while those with low valence sound more negative, sad, or angry.`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data_by_artist.csv", {url: new URL("./files/c0f4789f1c558bb279eac18307c588377c47aabe02c92ee08726664be78922b7408777639a72ecb2e5b38be2c731254e86a48eff44599f2f47b00e2f1ed84e63.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment","md"], _2);
  main.variable(observer("viewof Channel")).define("viewof Channel", ["Inputs","data"], _Channel);
  main.variable(observer("Channel")).define("Channel", ["Generators", "viewof Channel"], (G, _) => G.input(_));
  main.variable(observer("voronoi_chart_and_points")).define("voronoi_chart_and_points", ["d3","width","height","data","x","c","y","Channel","voronoi","hover","xAxis","yAxis"], _voronoi_chart_and_points);
  main.variable(observer("voronoi")).define("voronoi", ["d3","data","x","y","Channel","margin","width","height"], _voronoi);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("c")).define("c", ["d3","data"], _c);
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","data","Channel","height","margin"], _y);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width","formatNumber"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","formatNumber"], _yAxis);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("hover")).define("hover", ["margin","width"], _hover);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("formatNumber")).define("formatNumber", ["d3"], _formatNumber);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], _data);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("style")).define("style", ["html"], _style);
  main.variable(observer()).define(["md"], _23);
  return main;
}
