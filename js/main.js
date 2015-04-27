---
#
---
var birth = Date.parse("Tue Apr 14 15:59:17 2015 +1000");

document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementsByTagName("canvas")[0];
    var context = canvas.getContext("2d");

    var video = document.createElement("video");
    video.src = "{{ site.assets }}are_you_there_god.mp4";
    video.loop = true;
    video.addEventListener("loadedmetadata", function() {
        syncPlayback(video);
    }, false);
    video.addEventListener("canplaythrough", function() {
        video.play();
        setInterval(drawCanvas, 40, video, canvas, context);
    }, false);

    var info = document.getElementById("info");

    canvas.addEventListener("dblclick", function() {
        screenfull.toggle();
    }, false);

    info.addEventListener("click", function() {
        toggleDisplay("info");
    }, false);
}, false);

function syncPlayback(video) {
    t = Date.now();
    video.currentTime = (t - birth) / 1000 % video.duration;
}

function drawCanvas(video, canvas, context) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var sRatio = video.videoWidth / video.videoHeight;
    var dWidth = canvas.width;
    var dHeight = canvas.height;
    var dRatio =  dWidth / dHeight;
    var dX = 0;
    var dY = 0;

    if(dRatio < sRatio) {
        dWidth = dHeight * sRatio;
        dX = 0 - (dWidth - canvas.width) / 2;
    }
    else {
        dHeight = dWidth / sRatio;
        dY = 0 - (dHeight - canvas.height) / 2;
    }

    context.drawImage(video, dX, dY, dWidth, dHeight);
}

function toggleDisplay(id) {
    var element = document.getElementById(id);
    if(element.style.display == "block") {
        element.style.display = "none";
    }
    else {
        element.style.display = "block";
    }
}

Mousetrap.bind("?", function() { toggleDisplay("info"); });
Mousetrap.bind("f", function() { screenfull.toggle(); });
