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
      27,
      34,
      true,
      true,
      true,
      true,
      "./assets/images/Major_Destess.png",
      "8AM",
      "Living Room",
      "",
      0
    ],
    [
      63,
      64,
      true,
      true,
      true,
      true,
      "./assets/images/Major_Destress1.png",
      "12AM",
      "",
      "",
      1
    ],
    [
      76,
      78,
      true,
      true,
      true,
      true,
      "./assets/images/Minor_Destress.png",
      "1AM",
      "Living Room",
      "",
      2
    ],
    [
      81,
      83,
      true,
      true,
      true,
      true,
      "./assets/images/Minor_Distress.png",
      "4AM",
      "Living Room",
      "",
      3
    ]
  ];

  function distressObserver(video, audio, msg) {
    $(".observer-text")
      .html("Distress Observed")
      .addClass("red-color");
    $(".observer-bar").addClass("red-backgroundcolor");
    $(".notification-popup")
      .append(
        `<span class="notificationMsg">Notification Sent ${msg}
  </span>`
      )
      .show();

    if (video) {
      $(".main-video").addClass("border-trans");
      $(".blink-box").addClass("blink");
    }
    if (audio) {
      //$(".audio-area").addClass("blink");
    }
    $(".observe-percentage").show();
    $(".videoaccuracy").show();
    $(".audio-accuracy").show();

    //this will dispatch the event and will be caught in angular component
    var event = new CustomEvent("custom-event", { detail: notificationObj });
    window.dispatchEvent(event);
  }
  function distressNotObserver(video, audio) {
    //var oldlady_video1 = document.getElementById("oldlady_video");

    clearInterval(inter);
    clearInterval(interaudio);
    //   $(".videoaccuracy").show();
    clearInterval(inter);
    clearInterval(interaudio);
    //oldlady_video1.pause();
    //setTimeout(function() {
    // oldlady_video1.play();
    inter = setInterval(function() {
      updateData();
    }, 400);

    interaudio = setInterval(function() {
      updateData1();
    }, 400);
    $(".audio-distress").hide();
    $(".blink-box").removeClass("blink");
    //$(".audio-area").removeClass("blink");
    $(".main-video").removeClass("border-trans");
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

  var curDate = function() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    return day + "-" + month + "-" + year;
  };
  function timeNow() {
    var d = new Date(),
      h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
      m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    var ampm = h >= 12 ? "PM" : "AM";
    return h + ":" + m + " " + ampm;
  }
  var configuration = [
    {
      reportTitle: "Fall in Common Room " + curDate(),
      roomNo: "Common Room",
      eventType: "Level 3",
      category: "Fall",
      accuracy: "80%",
      date: curDate(),
      time: timeNow(),
      imageURL: "./assets/images/Major_Destess.PNG",
      notifications: [
        {
          level: "Level 3",
          notificationSentTime: curDate() + " " + timeNow(),
          notificationSentOptions: [
            { contactType: "Email sent to ", details: "admin@helpingears.com" },
            {
              contactType: "Push notifications sent to ",
              details: "phone11X011 "
            }
          ]
        },
        {
          level: "Level 2",
          notificationSentTime: curDate() + " " + timeNow(),
          notificationSentOptions: [
            { contactType: "Email sent to ", details: "admin@helpingears.com" },
            {
              contactType: "Push notifications sent to ",
              details: "phone11X011 "
            }
          ]
        }
      ]
    },
    {
      reportTitle: "Fall in Common Room " + curDate(),
      roomNo: "Common Room",
      eventType: "Level 3",
      category: "Fall",
      accuracy: "80%",
      date: curDate(),
      time: timeNow(),
      imageURL: "./assets/images/Major_Destess.PNG",
      notifications: [
        {
          level: "Level 3",
          notificationSentTime: curDate() + " " + timeNow(),
          notificationSentOptions: [
            { contactType: "Email sent to ", details: "admin@helpingears.com" },
            {
              contactType: "Push notifications sent to ",
              details: "phone11X011 "
            }
          ]
        },
        {
          level: "Level 2",
          notificationSentTime: curDate() + " " + timeNow(),
          notificationSentOptions: [
            { contactType: "Email sent to ", details: "admin@helpingears.com" },
            {
              contactType: "Push notifications sent to ",
              details: "phone11X011 "
            }
          ]
        }
      ]
    },
    {
      reportTitle: "Fall in Common Room " + curDate(),
      roomNo: "Common Room",
      eventType: "Level 2",
      category: "Fall",
      accuracy: "80%",
      date: curDate(),
      time: timeNow(),
      imageURL: "./assets/images/Minor_Destress.PNG",
      notifications: [
        {
          level: "Level 2",
          notificationSentTime: curDate() + " " + timeNow(),
          notificationSentOptions: [
            { contactType: "Email sent to ", details: "admin@helpingears.com" },
            {
              contactType: "Push notifications sent to ",
              details: "phone11X011 "
            }
          ]
        },
        {
          level: "Level 1",
          notificationSentTime: curDate() + " " + timeNow(),
          notificationSentOptions: [
            { contactType: "Email sent to ", details: "admin@helpingears.com" },
            {
              contactType: "Push notifications sent to ",
              details: "phone11X011 "
            }
          ]
        }
      ]
    }
  ];
  function addItemOnTheReport(configuration, index) {
    $(".left-container").append(`<div>
                                      <a href="javascript:void(0)"  data-target="#${index}"> ${configuration.reportTitle} </a>
                                 </div>`);

    var notificationTemplate = "";
    for (var i = 0; i < configuration.notifications.length; i++) {
      var localLength =
        configuration.notifications[i].notificationSentOptions.length;
      var notificationSubTemplate = "";
      for (var j = 0; j < localLength; j++) {
        notificationSubTemplate = `${notificationSubTemplate}<div class="row report-row">
                                                <div class="col-md-12">
                                                    <div class="col-md-4">
                                                        <span>${
                                                          configuration
                                                            .notifications[i]
                                                            .notificationSentOptions[
                                                            j
                                                          ].contactType
                                                        }
                                                            <a href="javascript:void(0)" class="report-link-text">${
                                                              configuration
                                                                .notifications[
                                                                i
                                                              ]
                                                                .notificationSentOptions[
                                                                j
                                                              ].details
                                                            }</a>
                                                        </span>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <span class=" report-margin-left">
                                                            <a href="javascript:void(0)" class="report-link-text report-margin-left">view</a>
                                                        </span>
                                                    </div>
                                                </div>
                                             </div>`;
      }
      notificationTemplate = `${notificationTemplate}<div class="report-main-row ">+
                                            <span class="report-label-text">${
                                              configuration.notifications[i]
                                                .level
                                            }</span>
                                            <span>Notification sent -  ${
                                              configuration.notifications[i]
                                                .notificationSentTime
                                            }</span>
                                </div>
                                <div class="report-log-content">
                                               ${notificationSubTemplate}
                                </div>`;
    }

    $(
      ".left-container"
    ).parent().append(`<div id="${index}" class="col-md-9 right-container report-hide">
    <div class="row">
        <div class="col-md-12">
            <div class="report-title">IN - ${configuration.reportTitle}</div>
            <div>${configuration.roomNo}</div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 report-main-container">
            <div class="col-md-2 report-padding">
                <div class="report-text-container">
                    <span class="report-label">Category – </span>
                    <span>${configuration.category}</span>
                </div>
                <div class="report-text-container">
                    <span class="report-label">Event type-</span>
                    <span>${configuration.eventType}</span>
                </div>
                <div class="report-text-container">
                    <span class="report-label">Probability –</span>
                    <span>${configuration.accuracy}</span>
                </div>
                <div class="report-text-container">
                    <span class="report-label">Date and Time – </span>
                    <span>${configuration.date}</span>
                </div>
                <div class="report-text-container">
                    <span class="report-label"></span>
                    <span>${configuration.time}</span>
                </div>
            </div>
            <div class="col-md-10">
                <img width="400px" src="${configuration.imageURL}" />
            </div>
        </div>
    </div>
    <div class="row report-bottom-line">
        <div class="col-md-12 ">
            <div class="report-title">Notifications Log</div>
            <div class="report-log-container">
                  ${notificationTemplate}          
            </div>
        </div>
    </div>
</div>`);
    $(".left-container div a") &&
      $(".left-container div a")
        .first()
        .addClass("report-active");
    $(".right-container") &&
      $(".right-container")
        .first()
        .show(100);
    $(".report-main-row")
      .next()
      .hide();
    (() => {
      $(".left-container div a").unbind("click");
      $(".left-container div a").click(function(event) {
        $(".left-container div a").removeClass("report-active");
        $(event.target).addClass("report-active");
        $(".right-container").hide();
        $(event.target.getAttribute("data-target")).show(100);
      });
      $(".report-main-row").unbind("click");
      $(".report-main-row").click(function() {
        $(this)
          .next()
          .toggle(100);
      });
    })();
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
        notificationObj = {
          title: "Fall detected in the living room at " + timeNow(),
          body: `Please check in ${element[8]}`,
          icon: element[6],
          click_action: "Immediate Attention"
        };
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
        addItemOnTheReport(configuration[element[10]], element[10]);
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

  var lastUpdateTime2 = +new Date();

  var GenData2 = function(N1, lastTime) {
    var output = [];
    for (var i = 0; i < N1; i++) {
      output.push({ value: Math.random() * 75, timestamp: lastTime });
      lastTime = lastTime + 1000;
    }
    return output;
  };

  var globalData1;
  var globalData2;
  var dataIntervals1 = 1;

  // plot the original data by retrieving everything from time 0
  data1 = GenData1(100, lastUpdateTime1);

  data2 = GenData2(200, lastUpdateTime2);

  lastUpdateTime1 = data1[data1.length - 1].timestamp;
  lastUpdateTime2 = data2[data2.length - 1].timestamp;

  globalData1 = data1;
  globalData2 = data2;

  var margin1 = { top: 0, right: 20, bottom: 0, left: 30 },
    width1 = 480 - margin1.left - margin1.right,
    height1 = 100 - margin1.top - margin1.bottom;

  var x = d3.time.scale().range([0, width1]);

  var y = d3.scale.linear().range([height1, 0]);

  x.domain(
    d3.extent(globalData2, function(d) {
      return d.timestamp;
    })
  );
  y.domain(
    d3.extent(globalData2, function(d) {
      return d.value;
    })
  );

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

  var valueline2 = d3.svg
    .line()
    .x(function(d) {
      return x(d.timestamp);
    })
    .y(function(d) {
      return y(d.value);
    });

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
    .select(".av-audio-series-graph")
    .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

  var chartBody2 = svg2.append("g");

  chartBody2
    .append("path") // Add the valueline path
    .datum(globalData1)
    .attr("class", "av-line")
    .attr("d", valueline1);

  var svg3 = d3
    .select(".av-video-series-graph")
    .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

  var chartBody3 = svg3.append("g");

  chartBody3
    .append("path") // Add the valueline path
    .datum(globalData2)
    .attr("class", "av-line1")
    .attr("d", valueline2);

  //var panMeasure = 0;
  var oldScale1 = 1;
  var globalOffset1 = 0;
  var globalOffset2 = 0;
  var panOffset1 = 0;
  var panOffset2 = 0;

  //////////////////////////////////////////////////////////////

  var N1 = 100;
  //var dx = 0;
  function updateData1() {
    var newData = GenData1(N1, lastUpdateTime1);
    var newData2 = GenData2(N1, lastUpdateTime1);

    lastUpdateTime1 = newData[newData.length - 1].timestamp;
    lastUpdateTime2 = newData2[newData2.length - 1].timestamp;

    for (var i = 0; i < newData.length; i++) {
      globalData1.push(newData[i]);
    }
    for (var i = 0; i < newData2.length; i++) {
      globalData2.push(newData2[i]);
    }
    //console.log(globalOffset);
    globalOffset1 += newData.length;
    globalOffset2 += newData2.length;

    refreshData1();
    refreshData2();
  }

  function refreshData2() {
    var offset2 = Math.max(0, globalOffset2 + panOffset2);

    var graphData = globalData2.slice(offset2, offset2 + 100);

    x.domain(
      d3.extent(graphData, function(d) {
        return d.timestamp;
      })
    );
    //svg.select(".x.axis").call(xAxis1);

    x1 = graphData[0].timestamp;
    x2 = graphData[graphData.length - 1].timestamp;
    //dx = (x(x1) - x(x2)); // dx needs to be cummulative

    d3.select(".av-line1")
      .datum(graphData)
      .attr("class", "av-line1")
      .attr("d", valueline2(graphData))
      .attr("stroke", "#ed7d31")
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

    d3.select(".line")
      .datum(graphData)
      .attr("class", "line")
      .attr("d", valueline1(graphData))
      .attr("stroke", "#404040")
      .attr("stroke-width", "2")
      .attr("fill", "none");

    d3.select(".av-line")
      .datum(graphData)
      .attr("class", "av-line")
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
