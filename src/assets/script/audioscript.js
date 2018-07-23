/*-------------------- drawing audio graph--------------------*/
var lastUpdateTime1 = +new Date();

var GenData1 = function(N1, lastTime) {
  var output = [];
  for (var i = 0; i < N1; i++) {
    output.push({ value: Math.random() * 100, timestamp: lastTime });
    lastTime = lastTime + 1000;
  }
  return output;
};

var globalData1;
var dataIntervals1 = 1;

// plot the original data by retrieving everything from time 0
data1 = GenData1(100, lastUpdateTime1);
lastUpdateTime1 = data1[data1.length - 1].timestamp;

globalData1 = data1;

var margin1 = { top: 30, right: 20, bottom: 0, left: 30 },
  width1 = 390 - margin1.left - margin1.right,
  height1 = 100 - margin1.top - margin1.bottom;

var x = d3.time.scale().range([0, width1]);

var y = d3.scale.linear().range([height1, 0]);

x.domain(
  d3.extent(globalData1, function(d) {
    return d.timestamp;
  })
);
y.domain(
  d3.extent(globalData1, function(d) {
    return d.value;
  })
);

var valueline1 = d3.svg
  .line()
  .x(function(d) {
    return x(d.timestamp);
  })
  .y(function(d) {
    return y(d.value);
  });
var svg1 = d3
  .select(".audio-series-graph")
  .append("svg")
  .attr("width", width1 + margin1.left + margin1.right)
  .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
  .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

var chartBody1 = svg1.append("g");

chartBody1
  .append("path") // Add the valueline path
  .datum(globalData1)
  .attr("class", "line")
  .attr("d", valueline1);

//var panMeasure = 0;
var oldScale1 = 1;
var globalOffset1 = 0;
var panOffset1 = 0;

//////////////////////////////////////////////////////////////

var N1 = 10;
//var dx = 0;
function updateData1() {
  var newData = GenData1(N1, lastUpdateTime1);
  lastUpdateTime1 = newData[newData.length - 1].timestamp;

  for (var i = 0; i < newData.length; i++) {
    globalData1.push(newData[i]);
  }
  //console.log(globalOffset);
  globalOffset1 += newData.length;
  refreshData1();
}

function refreshData1() {
  var offset = Math.max(0, globalOffset1 + panOffset1);
  var graphData = globalData1.slice(offset, offset + 100);

  x.domain(
    d3.extent(graphData, function(d) {
      return d.timestamp;
    })
  );
  //svg.select(".x.axis").call(xAxis1);

  x1 = graphData[0].timestamp;
  x2 = graphData[graphData.length - 1].timestamp;
  //dx = (x(x1) - x(x2)); // dx needs to be cummulative

  d3.select("path")
    .datum(graphData)
    .attr("class", "line")
    .attr("d", valueline1(graphData))
    .attr("stroke", "#404040")
    .attr("stroke-width", "1")
    .attr("fill", "none");
}
