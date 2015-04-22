---
#
---
var birth = Date.parse("Tue Apr 14 15:59:17 2015 +1000");

document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementsByTagName("canvas")[0];
    var context = canvas.getContext("2d");

    var video = document.createElement("video");
    video.src = "{{ site.assets }}are_you_there_god_720p.mp4";
    video.autoplay = true;
    video.loop = true;
    video.currentTime = (Date.now() - birth) / 1000 % video.duration;
    // video.addEventListener("playing", syncPlayback(this), false);

    var info = document.getElementById("info");

    canvas.addEventListener("dblclick", function() {
        screenfull.toggle();
    }, false);

    info.addEventListener("click", function() {
        toggleDisplay("info");
    }, false);

    drawCanvas(video, canvas, context);
}, false);

function drawCanvas(image, canvas, context) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var sRatio = image.videoWidth / image.videoHeight;
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

    context.drawImage(image, dX, dY, dWidth, dHeight);
    setTimeout(drawCanvas, 40, image, canvas, context);
}

function syncPlayback(video) {
    video.currentTime = (Date.now() - birth) / 1000 % video.duration;
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
