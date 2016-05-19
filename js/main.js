import * as keys from "mousetrap";
import * as fullscreen from "screenfull";

document.addEventListener("DOMContentLoaded", function() {
    var spinner = document.getElementsByClassName("spinner")[0];

    var canvas = document.getElementsByTagName("canvas")[0];
    var context = canvas.getContext("2d");

    var video = document.createElement("video");
    video.src = "/assets/are_you_there_god.mp4";
    video.loop = true;
    video.autoplay = true;
    video.addEventListener("play", function() {
        spinner.style.display = "none";
        setInterval(drawCanvas, 40, video, canvas, context);
    }, false);

    var info = document.getElementById("info");

    canvas.addEventListener("dblclick", function() {
        fullscreen.toggle();
    }, false);

    info.addEventListener("click", function() {
        toggleDisplay("info");
    }, false);
}, false);

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

keys.bind("?", function() { toggleDisplay("info"); });
keys.bind("f", function() { fullscreen.toggle(); });
