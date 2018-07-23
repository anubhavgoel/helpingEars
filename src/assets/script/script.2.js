$(document).ready(function() {
  $(".dropdown-toggle").dropdown();
  /*----------binding data into dropdown option click------------*/
  $(".living-room .dropdown-item").on("click", function() {
    var text = $(this).text();
    $(".living-room #dropdownMenuButton").html(text);
  });
  /*----------binding data into dropdown option click------------*/
  $(".modal-applied .dropdown-item").on("click", function() {
    var text = $(this).text();
    $(".modal-applied #dropdownMenuButton1").html(text);
  });
  var oldlady_video = document.getElementById("oldlady_video");
  var oldlady_audio = document.getElementById("oldlady_audio");
  var inter;
  /*----------video play button------------*/
  $(".play-button").on("click", function() {
    oldlady_video.play();
    oldlady_audio.play();
    clearInterval(inter);
    inter = setInterval(function() {
      updateData();
    }, 400);
    $(".videoaccuracy").hide();
    $(".observer-text")
      .html("Everything Looks Good")
      .removeClass("red-color");
    $(".observer-bar").removeClass("red-backgroundcolor");
    setTimeout(function() {
      $(".observer-text")
        .html("Distress Observed")
        .addClass("red-color");
      $(".observer-bar").addClass("red-backgroundcolor");
      $(".notification-popup").show();
      setTimeout(function() {
        $(".notification-popup").hide();
      }, 1000);
    }, 7300);
  });
  /*----------video end event------------*/
  oldlady_video.addEventListener("ended", function(e) {
    $(".videoaccuracy").show();
    clearInterval(inter);
  });

  /*--------Time series chart--------*/

  var lineData = [
    { x: 1, y: 20 },
    { x: 80, y: 80 },
    { x: 160, y: 40 },
    { x: 240, y: 160 },
    { x: 320, y: 20 },
    { x: 400, y: 240 }
  ];
  var self = this;
  var oldScale = 1;
  var globalOffset = 0;
  var panOffset = 0;
  function updateData() {
    var newData = GenData(10, 100);
    lastUpdateTime = newData[newData.length - 1].x;

    for (var i = 0; i < newData.length; i++) {
      lineData.push(newData[i]);
    }
    //console.log(globalOffset);
    globalOffset += newData.length;
    refreshData();
  }

  function refreshData() {
    var offset = Math.max(0, globalOffset + panOffset);
    var graphData = lineData.slice(offset, offset + 100);

    d3.svg
      .line()
      .x(function(d) {
        return d.x;
      })
      .y(function(d) {
        return d.y;
      })
      .interpolate("cardinal");
    //svg.select(".x.axis").call(xAxis);

    x1 = graphData[0].y;
    x2 = graphData[graphData.length - 1].y;
    //dx = (x(x1) - x(x2)); // dx needs to be cummulative

    var line = svg
      .append("path")
      .attr("d", lineFunction(lineData))
      .attr("stroke-width", 3)
      .attr("stroke", "url(#svgGradient)")
      .attr("fill", "none");
  }
  function GenData(N, lastTime) {
    var output = [];
    for (var i = 0; i < N; i++) {
      output.push({ y: Math.random() * 100, x: lastTime });
      lastTime = lastTime + 10;
    }
    return output;
  }
  lineData = GenData(100, 10);
  var lineFunction = d3.svg
    .line()
    .x(function(d) {
      return d.x;
    })
    .y(function(d) {
      return d.y;
    })
    .interpolate("cardinal");

  var svg = d3
    .select(".time-series-graph")
    .append("svg")
    .attr("width", 390)
    .attr("height", 400);

  var defs = svg.append("defs");
  var gradient = defs
    .append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "100%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "100%");
  gradient
    .append("stop")
    .attr("class", "start")
    .attr("offset", "10%")
    .attr("stop-color", "red")
    .attr("stop-opacity", 1);
  gradient
    .append("stop")
    .attr("class", "end")
    .attr("offset", "20%")
    .attr("stop-color", "green")
    .attr("stop-opacity", 1);

  var line = svg
    .append("path")
    .attr("d", lineFunction(lineData))
    .attr("stroke-width", 3)
    .attr("stroke", "url(#svgGradient)")
    .attr("fill", "none");
});
