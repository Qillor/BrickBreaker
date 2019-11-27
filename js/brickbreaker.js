var c = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */
var ctx = c.getContext("2d");
var left = false;
var right = false;
var xaxis = 0;
var ballx = 0;
var bally = 0;

function brick() {
    ctx.beginPath();
    for (x = 2; x < 600; x += 50) {
        for (y = 2; y < 150; y += 50) {
            ctx.rect(x, y, 45, 45);
            ctx.fillStyle = "#800080";
            ctx.fill();
        }
    }
    ctx.closePath();
}

function ball() {
    ctx.beginPath();
    ctx.arc(ballx, bally, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function paddle() {
    ctx.beginPath();
    ctx.rect(xaxis, 400, 60, 10);
    ctx.fillstyle = "#00ffff"
    ctx.fill(); 
    ctx.closePath();
}

function components() {
    ctx.clearRect(0, 0, c.Width, c.Height);
    ball();
    brick();
    paddle();
  
    if (right == true)
        xaxis += 5;
    if (left == true)
        xaxis -= 5;
    
}


function keyDown(event) {
    if (event.keyCode == 39)
        right = true;
    if (event.keyCode == 37)
        left = true;
}

function keyUp(event) {
    if (event.keyCode == 39)
        right = false;
    if (event.keyCode == 37)
        left = false;

}

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

setInterval(components, 20);
