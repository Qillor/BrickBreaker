/* Grabs canvas*/
var c = document.getElementById("myCanvas");
/* paired with ctx variable (allows Visual Studio Code to understand what you are referring to.)*/
/** @type {CanvasRenderingContext2D} */
/*Declaring variables */
var ctx = c.getContext("2d");
var left = false;
var right = false;
var xaxis = 0;
var ballx = 0;
var bally = 0;
var gravity = true;
var gravityright = true;
/*Declaring Brick function, it draws the bricks on the canvas.*/
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
/*Declaring Ball function, it draws the ball on the canvas.*/
function ball() {
    ctx.beginPath();
    ctx.arc(ballx, bally, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.
}
/*Declaring Paddle function, it draws the paddle on the canvas.*/
function paddle() {
    ctx.beginPath();
    ctx.rect(xaxis, c.height - 10, 60, 10);
    ctx.fillstyle = "#00ffff"
    ctx.fill();
    ctx.closePath();
}
/*All of the invidual functions to the Brickbreaker game.*/ 
function components() {
    ctx.clearRect(0, 0, c.width, c.height);
    ball();
    brick();
    paddle();

    /*Moves the ball left and right*/
    if (right == true)
        xaxis += 5;
    if (left == true) 
        xaxis -= 5;
    

/* Responsible for gravity up and down.*/
    if (bally >= c.height - 35) {
        gravity = false;
    }
    if (bally <= c.height - 355) {
        gravity = true;
    }

    if (gravity) {
        bally += 2;
    } else {
        bally -= 2;
    }


/* Resposible for the gravity moving right and left*/
    if (ballx >= c.width - 25) {
        gravityright = false;
    }
    if (ballx <= 25) {
        gravityright = true;
    }

    if (gravityright) {
        ballx += 2;
    } else {
        ballx -= 2;
    }
}
/*Setting the variable of left and right to true, when the left / right key is pressed */
function keyDown(event) {
    if (event.keyCode == 39) {
        right = true;
    }
    if (event.keyCode == 37) {
        left = true;

    }
}
/*Setting the variabke of left and right to false, when the left / right key is lifted.*/
function keyUp(event) {
    if (event.keyCode == 39) {
        right = false;
    }
    if (event.keyCode == 37) {
        left = false;
    }
}
/*Listening for a key event*/
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);
/*calls components every 20 milliseconds.*/
setInterval(components, 20);
