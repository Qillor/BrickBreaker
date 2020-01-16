/* Grabs canvas*/
var c = document.getElementById("myCanvas");
/* paired with ctx variable (allows Visual Studio Code to understand what you are referring to.)*/
/** @type {CanvasRenderingContext2D} */
/*Declaring variables */
var ctx = c.getContext("2d");
var left;
var right;
var xaxis;
var ballx;
var bally;
var gravity = true;
var gravityright = true;
var ballrate = 5;
/*starting brick array, each item in the array will hold the x, and y position. Also, whether it exists or not. */
var bricks = [];
reset();

/* Resetting variables to their initial values.*/
function reset() {
    ballx = c.width / 2;
    bally = c.height - 35;
    xaxis = c.width / 2 - 30;
    left = false;
    right = false;
    for (col = 0; col < 12; ++col) {
        bricks[col] = [];
        for (row = 0; row < 3; ++row) {
            bricks[col][row] = { bx: 0, by: 0, exist: 1 };
        }
    }
}

/*Declaring Brick function, it draws the bricks on the canvas.*/
function brick() {
    ctx.beginPath();
    for (x = 0; x < 12; ++x) {
        for (y = 0; y < 3; ++y) {
            if (bricks[x][y].exist == 1) {
                bricks[x][y].bx = x * 50;
                bricks[x][y].by = y * 50;
                ctx.rect(x * 50, y * 50, 45, 45);
                ctx.fillStyle = "#800080";
                ctx.fill();
            }
        }
    }
    ctx.closePath();
}
/* Bally-25 indicates the top of the ball, so the top of the ball can hit the bottom of the brick and make the brick dissapear
The xpos + 45 is the right side of the brick, ypos + 45 is the bottom of the brick. If all of the if statements are true,
then the brick that got hit will dissapear.
*/
function contact() {
    for (icol = 0; icol < 12; ++icol) {
        for (irow = 0; irow < 3; ++irow) {
            var xpos = bricks[icol][irow].bx;
            var ypos = bricks[icol][irow].by;
            if (ballx >= xpos && ballx <= (xpos + 45)) {
                if (bricks[icol][irow].exist == 1 || bally - 25 <= 0) {
                    if ((bally - 25) >= ypos && (bally - 25) <= (ypos + 45)) {
                        bricks[icol][irow].exist = 0;
                        gravity = true;
                    }
                }
            }
        }
    }
}



/*Declaring Ball function, it draws the ball on the canvas.*/
function ball() {
    ctx.beginPath();
    ctx.arc(ballx, bally, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}
/*Declaring Paddle function, it draws the paddle on the canvas.*/
function paddle() {
    ctx.beginPath();
    ctx.rect(xaxis, c.height - 10, 60, 10);
    ctx.fillstyle = "#00ffff"
    ctx.fill();
    ctx.closePath();
}
/*Calling all of the invidual functions to the Brickbreaker game.*/
function components() {
    ctx.clearRect(0, 0, c.width, c.height);
    ball();
    brick();
    paddle();
    contact();

    /*Moves the paddle to the right*/
    if (xaxis <= (c.width - 60)) {
        if (right == true)
            xaxis += 5;
    }
    /*Moves the paddle to the left*/
    if (xaxis >= 0) {
        if (left == true)
            xaxis -= 5;
    }

    /* Responsible for gravity up and down.*/
    if (ballx > xaxis && ballx < xaxis + 60) {
        if (bally >= c.height - 35) {
            gravity = false;
        }
    }
    /*Brings up a dialogue box when the ball completely dissapears from the canvas */
    if (bally > c.height + 30) {
        var r = confirm("Game Over! \nWould you like to play again? \nPress 'OK' to play again. \nPress 'Cancel' to close the game.");
        if (r == true) {
            reset();
    /*When cancel is pressed, the window is closed*/
        } else {
            window.close();
        }
    }
    /*Replaced the numbers with a ballrate variable, so I could change the speed of the game in one spot to be more efficient*/
    if (gravity) {
        bally += ballrate;
    } else {
        bally -= ballrate;
    }


    /*Resposible for the gravity moving right and left*/
    if (ballx >= c.width - 25) {
        gravityright = false;
    }
    if (ballx <= 25) {
        gravityright = true;
    }
    /* Gravity right control the right and left movement of the ball*/
    if (gravityright) {
        ballx += ballrate;
    } else {
        ballx -= ballrate;
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
