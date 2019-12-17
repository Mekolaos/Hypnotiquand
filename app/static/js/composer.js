var notes = ['e', 'B', 'G', 'D', 'A', 'E']
var c = document.getElementById("composer-view");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.font = "11px Arial";
ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";

function drawFromTo(x,y, z, w){
    ctx.moveTo(x, y);
    ctx.lineTo(z, w)
}

function drawLines(distance) {
    for (let i = 0; i < 6; i++) {
        var dist = distance * (i+1)
        ctx.moveTo(18, dist);
        ctx.lineTo(500, dist);
        ctx.fillText(notes[i], 5, dist + (distance / 7));
        
    }
};
drawLines(15);
ctx.moveTo(500, 15)
ctx.lineTo(500, 15*6)
ctx.closePath()

ctx.stroke()

window.addEventListener("keyup", moveSomething, false);
var deltaX = 0;
var deltaY = 0;


function drawSelector(){
    ctx.beginPath();
    drawFromTo(25 + deltaX, 10 + deltaY, 35 + deltaX, 10 + deltaY);
    drawFromTo(25 + deltaX, 10 + deltaY, 25 + deltaX, 20 + deltaY);
    drawFromTo(25 + deltaX, 20 + deltaY, 35 + deltaX, 20 + deltaY);
    drawFromTo(35 + deltaX, 20 + deltaY, 35 + deltaX, 10 + deltaY);
    ctx.closePath();
    
    ctx.stroke()
}
drawSelector()

function moveSomething(e) {
    switch(e.keyCode) {
        case 37: // left
            deltaX -= 15;
            break;
        case 38: // up
            deltaY -= 15;
            break;
        case 39: // right
            deltaX += 15;
            break;
        case 40: // down
            deltaY += 15;
            break;
    }
    drawSelector();
}

