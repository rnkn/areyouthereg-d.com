---
#
---
document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementsByTagName("video")[0];

    var canvas = document.getElementsByTagName("canvas")[0];
    var context = canvas.getContext("2d");
    var canvasW = {{ site.canvas.width }};
    var canvasH = {{ site.canvas.height }};
    canvas.width = canvasW;
    canvas.height = canvasH;

    var info = document.getElementById("info");

    video.addEventListener("canplay", function() {
        this.play();
    }, false);

    canvas.addEventListener("dblclick", function() {
        screenfull.toggle();
    }, false);

    info.addEventListener("click", function() {
        toggleDisplay("info");
    }, false);

    drawCanvas(video, context, canvasW, canvasH);
}, false);

function drawCanvas(source, context, width, height) {
    context.drawImage(source, 0, 0, width, height);
    setTimeout(drawCanvas, 40, source, context, width, height);
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
