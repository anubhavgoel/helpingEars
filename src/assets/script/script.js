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
  var interaudio;

  /*----------video play button------------*/

  $(".play-button").on("click", function() {
    oldlady_video.play();
    //oldlady_audio.play();
    clearInterval(inter);
    inter = setInterval(function() {
      updateData();
    }, 400);
    clearInterval(interaudio);
    interaudio = setInterval(function() {
      updateData1();
    }, 400);
    $(".videoaccuracy").hide();
    $(".observer-text")
      .html("Everything Looks Good")
      .removeClass("red-color");
    $(".observer-bar").removeClass("red-backgroundcolor");
    setTimeout(function() {
      //   $(".observer-text")
      //     .html("Distress Observed")
      //     .addClass("red-color");
      //   $(".observer-bar").addClass("red-backgroundcolor");
      //   $(".notification-popup").show();
      //   setTimeout(function() {
      //     $(".notification-popup").hide();
      //   }, 1000);
    }, 7300);
  });
  $(".pause-button").on("click", function() {
    oldlady_video.pause();
    //oldlady_audio.play();
    clearInterval(inter);

    clearInterval(interaudio);
  });
  /*----------video end event------------*/
  oldlady_video.addEventListener("ended", function(e) {
    //$(".videoaccuracy").show();
    clearInterval(inter);
    clearInterval(interaudio);
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
    .attr("width", 480)
    .attr("height", 100);

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
    .attr("stop-color", "#404040")
    .attr("stop-opacity", 1);

  var line = svg
    .append("path")
    .attr("d", lineFunction(lineData))
    .attr("stroke-width", 3)
    .attr("stroke", "url(#svgGradient)")
    .attr("fill", "none");

  /*---------------------- capturing video time----------------------
  var distress = [
    [2, 4, true, true, true, true],
	[4, 6, true, true, true, true],
	[8, 10, true, true, true, true],
	  [20, 24, true, true, true, true],
	[34, 36, true, true, true, true],
	[48, 50, true, true, true, true],
	[58, 61, true, true, true, true],
	[65, 69, true, true, true, true],
	[72, 75, true, true, true, true]
  ];*/

  var distress = [
    [
      8,
      11,
      true,
      true,
      true,
      true,
      "./images/img_avatar.png",
      "8AM",
      "Living Room",
      "Banda Gir gya aur marne wala hai"
    ],
    [
      27,
      29,
      true,
      true,
      true,
      true,
      "./images/img_avatar.png",
      "12AM",
      "Living Room",
      "ek aur gira"
    ],
    [
      46,
      48,
      true,
      true,
      true,
      true,
      "./images/img_avatar.png",
      "1AM",
      "Living Room",
      "bachaooooooooooooooooooo"
    ],
    [
      57,
      58,
      true,
      true,
      true,
      true,
      "./images/img_avatar.png",
      "4AM",
      "Living Room",
      "OMGGGGGGGGGGGGG"
    ],
    [
      69,
      71,
      true,
      true,
      true,
      true,
      "./images/img_avatar.png",
      "7AM",
      "Living Room",
      "reuqired help"
    ],
    [
      82,
      83,
      true,
      true,
      true,
      true,
      "./images/img_avatar.png",
      "8AM",
      "Living Room",
      "Banda Gir gya aur marne wala hai"
    ],
    [
      83,
      84,
      true,
      true,
      true,
      true,
      "./images/img_avatar.png",
      "7AM",
      "Living Room",
      "Banda Gir gya aur marne wala hai"
    ],
    [
      92,
      95,
      true,
      true,
      true,
      true,
      "./images/img_avatar.png",
      "9AM",
      "Living Room",
      "DHMamammaaamam"
    ],
    [
      97,
      98,
      true,
      true,
      true,
      true,
      "./images/img_avatar.png",
      "8AM",
      "Living Room",
      "Banda Gir gya aur marne wala hai"
    ],
    [
      104,
      108,
      true,
      true,
      true,
      true,
      "./images/img_avatar.png",
      "8AM",
      "Living Room",
      "bassssssssssssssssss"
    ]
  ];

  function distressObserver(video, audio, msg) {
    $(".observer-text")
      .html("Distress Observed")
      .addClass("red-color");
    $(".observer-bar").addClass("red-backgroundcolor");
    $(".notification-popup")
      .append(
        `<span class="notificationMsg">Notification Sent: ${msg}
  </span>`
      )
      .show();
    if (video) {
      $(".main-video").addClass("border-trans");
      $(".blink-box").addClass("blink");
    }
    if (audio) {
    }
    $(".observe-percentage").show();
    $(".videoaccuracy").show();
    $(".audio-accuracy").show();
  }
  function distressNotObserver(video, audio) {
    var oldlady_video1 = document.getElementById("oldlady_video");

    clearInterval(inter);
    clearInterval(interaudio);
    //   $(".videoaccuracy").show();
    clearInterval(inter);
    clearInterval(interaudio);
    oldlady_video1.pause();
    //setTimeout(function() {
    oldlady_video1.play();
    inter = setInterval(function() {
      updateData();
    }, 400);

    interaudio = setInterval(function() {
      updateData1();
    }, 400);
    $(".audio-distress").hide();
    $(".main-video").removeClass("border-trans");
    $(".blink-box").removeClass("blink");

    $(".videoaccuracy").hide();
    $(".observer-text")
      .html("Everything Looks Good")
      .removeClass("red-color");
    $(".observer-bar").removeClass("red-backgroundcolor");
    $("span").remove(".notificationMsg");
    $(".notification-popup").hide();

    $(".observe-percentage").hide();
    $(".videoaccuracy").hide();
    $(".audio-accuracy").hide();
    //  }, 500);
  }

  function addItemOnTheReport(image, time, loc, msg) {
    $(".report-container").append(`<div class="card">
    <img src="${image}" alt="Avatar" style="width: 200px;height: 200px;">
    <div class="container">
      <h4><b>${msg}</b></h4> 
      <p>Location: ${loc}</p> 
      <p>Time: ${time}</p> 
    </div>
  </div>`);
  }
  function onTimeUpdate(event) {
    //onTrackedVideoFrame(this.currentTime, this.duration);

    // [8, 11, false, false, true, true], [start, end, blink started, blink stoped, video, audio]
    // [27, 29, false, false, true, true],
    // [46, 48, false, true, true, true],

    var currentTime = event.currentTarget.currentTime; //this.currentTime;

    for (var index = 0; index < distress.length; index++) {
      var element = distress[index];
      //distress.forEach(function(element) {

      //console.log( "CurrentTime: " + currentTime + " elementARrya: "+ element);
      if (parseInt(currentTime) >= element[0] && element[2] === true) {
        //start the blink;
        element[2] = false;
        distressObserver(element[4], element[5], element[9]);
        //console.log("START > > > > CurrentTime :" + currentTime + " Started blink element[2] " + element[2] + " for element : " + index + " start time " + element[0]);
      }
      if (
        parseInt(currentTime) >= element[1] &&
        element[2] == false &&
        element[3] == true
      ) {
        //stop the blink
        element[3] = false;
        distressNotObserver(element[4], element[5]);
        addItemOnTheReport(element[6], element[7], element[8], element[9]);
        //distress.splice(index, 1);
        //console.log("STOP > > > > CurrentTime :" + currentTime + " Stoped blink " + element[3] + " for element : " + index + " stop time " + element[1]);
      }
    }
  }
  $("#oldlady_video").on("timeupdate", onTimeUpdate);
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

  data2 = GenData1(400, lastUpdateTime1);
  lastUpdateTime1 = data1[data1.length - 1].timestamp;

  globalData1 = data1;
  globalData2 = data2;

  var margin1 = { top: 0, right: 20, bottom: 0, left: 30 },
    width1 = 480 - margin1.left - margin1.right,
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

  //rahul

  var svg2 = d3
    .select(".av-series-graph")
    .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

  var chartBody2 = svg2.append("g");

  chartBody2
    .append("path") // Add the valueline path
    .datum(globalData1)
    .attr("class", "line")
    .attr("d", valueline1);

  chartBody2
    .append("path") // Add the valueline path
    .datum(globalData2)
    .attr("class", "line1")
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
    refreshData2();
  }

  function refreshData2() {
    var offset = Math.max(0, globalOffset1 + panOffset1);
    var graphData = globalData2.slice(offset, offset + 100);

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
      .attr("stroke-width", "2")
      .attr("fill", "none");
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
      .attr("stroke-width", "2")
      .attr("fill", "none");
  }
});

function onTrackedVideoFrame(currentTime, duration) {
  $("#current").text(currentTime); //Change #current to currentTime
  $("#duration").text(duration);
}
