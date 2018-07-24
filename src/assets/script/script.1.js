//========================================== audio frequency code
var fft;

function preload() {
  sound = loadSound("assets/audio/final_audio.mp3");
}

function setup() {
  sound = loadSound("assets/audio/final_audio.mp3");
  var cnv = createCanvas(440, 150);
  cnv.mouseClicked(togglePlay);
  cnv.parent("canvabox");
  fft = new p5.FFT();
  //fft = new p5.Amplitude()
  sound.amp(100);
  //document.getElementById("canvabox").appendChild(cnv);
  //var svg2 = d3.select(".av-audio-series-graph").append(cnv);
}

function draw() {
  //debugger;
  background(255);

  // var spectrum = fft.analyze();
  var spectrum = fft.analyze();
  //var spectrum = fft.getEnergy("bass", "lowMid")
  noStroke();
  fill(0, 0, 0); // spectrum is green
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }

  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255, 0, 0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 0, width + 200);
    var y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();

  //text("click to play/pause", 4, 10);
}
function playaudio() {
  $("#defaultCanvas0").trigger("click");
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
    //document.getElementById("oldlady_video").pause();
  } else {
    sound.play();
    // document.getElementById("oldlady_video").play();
    //draw();
  }
}

//======================================== audi frequency code end

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

  oldlady_video.volume = 0;

  /*----------video play button------------*/

  $(".play-button").on("click", function() {
    oldlady_video.play();
    $(".distree-audio-chart-img").hide();
    playaudio();

    $(".videoaccuracy").hide();
    $(".observer-text")
      .html("Everything Looks Good")
      .removeClass("red-color");
    $(".observer-bar").removeClass("red-backgroundcolor");
  });
  $(".pause-button").on("click", function() {
    oldlady_video.pause();
    playaudio();
  });

  var distress = [
    [
      23,
      26,
      true,
      true,
      true,
      true,
      "https://firebasestorage.googleapis.com/v0/b/helping-ears.appspot.com/o/1.png?alt=media&token=556d3b21-273e-4fd3-819e-723d97b9bc16",
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
      "https://firebasestorage.googleapis.com/v0/b/helping-ears.appspot.com/o/2.png?alt=media&token=3301bc5b-50e9-45a2-b5ea-a3c9b2f47c52",
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
      "https://firebasestorage.googleapis.com/v0/b/helping-ears.appspot.com/o/3.png?alt=media&token=514fdd6f-dfea-4a79-a693-38855744c562",
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
      "https://firebasestorage.googleapis.com/v0/b/helping-ears.appspot.com/o/4.png?alt=media&token=acf22790-ddb7-4594-a28b-9bd698ac0e22",
      "4AM",
      "Living Room",
      "",
      3
    ]
  ];

  function distressObserver(video, audio, msg) {
    var oldlady_video1 = document.getElementById("oldlady_video");
    oldlady_video1.pause();
    $(".distree-audio-chart-img").show();
    playaudio();
    //addItemOnTheReport(configuration[element[10]], element[10]);
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
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/helping-ears.appspot.com/o/1.png?alt=media&token=556d3b21-273e-4fd3-819e-723d97b9bc16",
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
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/helping-ears.appspot.com/o/2.png?alt=media&token=3301bc5b-50e9-45a2-b5ea-a3c9b2f47c52",
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
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/helping-ears.appspot.com/o/3.png?alt=media&token=514fdd6f-dfea-4a79-a693-38855744c562",
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
    },
    {
      reportTitle: "Fall in Common Room " + curDate(),
      roomNo: "Common Room",
      eventType: "Level 2",
      category: "Fall",
      accuracy: "80%",
      date: curDate(),
      time: timeNow(),
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/helping-ears.appspot.com/o/4.png?alt=media&token=acf22790-ddb7-4594-a28b-9bd698ac0e22",
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
    addNotificationInChart(configuration, index);
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
		addItemOnTheReport(configuration[element[10]], element[10]);

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

        //addItemOnTheReport(configuration[element[10]], element[10]);

        //distress.splice(index, 1);
        //console.log("STOP > > > > CurrentTime :" + currentTime + " Stoped blink " + element[3] + " for element : " + index + " stop time " + element[1]);
      }
    }
  }
  $("#oldlady_video").on("timeupdate", onTimeUpdate);
  /*-------------------- drawing audio graph--------------------*/
});

function onTrackedVideoFrame(currentTime, duration) {
  $("#current").text(currentTime); //Change #current to currentTime
  $("#duration").text(duration);
}
//==================================== Notification in chart window

function addNotificationInChart(configuration, index) {
  var notificationTemplate = "";
  $(".notification-data").html(`<div id="${index + "chart"}" class="col-md-12">
  <div class="row">
      <div class="col-md-12">
          <div class="report-title1">IN - ${configuration.reportTitle} | ${
    configuration.time
  }</div> 
          
      </div>
  </div>
  <div class="row">
      <div class="col-md-12 report-main-container1">
          <div class="col-md-2 report-padding1">
          <div class="report-text-container1">
          <span class="report-label1">Event type-</span>
          <span>${configuration.category}</span>
      </div>
              <div class="report-text-container1">
                  <span class="report-label1">Category – </span>
                  <span>${configuration.eventType}</span>
              </div>
             
              <div class="report-text-container1">
                  <span class="report-label1">Accuracy –</span>
                  <span>${configuration.accuracy}</span>
              </div>
              
          </div>
          
      </div>
  </div>`);
}
