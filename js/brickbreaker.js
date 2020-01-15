/* Grabs canvas*/
var c = document.getElementById("myCanvas");
/* paired with ctx variable (allows Visual Studio Code to understand what you are referring to.)*/
/** @type {CanvasRenderingContext2D} */
/*Declaring variables */
var ctx = c.getContext("2d");
var contacty = 330;
var left = false;
var right = false;
var xaxis = c.width / 2 - 30;
var ballx = c.width / 2;
/*ball start pos */
var bally = c.height - 35;
var gravity = true;
var gravityright = true;

/*starting brick array, each item in the array will hold the x, and y position. Also, whether it exists or not. */
var bricks = [];
for (col = 0; col < 12; ++col) {
    bricks[col] = [];
    for (row = 0; row < 3; ++row) {
        bricks[col][row] = { bx: 0, by: 0, exist: 1 };
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
                if ((bally - 25) >= ypos && (bally - 25) <= (ypos + 45)) {
                    /*Gotta figure out how to set contacty higher when the brick is missing*/
                    if (bricks[icol][irow].exist == 0) {
                        contacty = 330 + (50 * irow);
                    }
                    bricks[icol][irow].exist = 0;
                    /*Silly, you had to change the gravity to false. that's why the border was in the way 
                    Still need to fix the middle row bottom brick, because it needs the same thing as the bottom row. 
                    Also, the border at the top is going off of the border */
                    gravity = false;
                    
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
/*All of the invidual functions to the Brickbreaker game.*/
function components() {
    ctx.clearRect(0, 0, c.width, c.height);
    ball();
    brick();
    paddle();
    contact();

    /*Moves the ball left and right*/
    if (right == true)
        xaxis += 5;
    if (left == true)
        xaxis -= 5;


    /* Responsible for gravity up and down.*/
    if (ballx > xaxis && ballx < xaxis + 60) {
        if (bally >= c.height - 35) {
            gravity = false;
        }
    }



    if (bally <= c.height - contacty) {
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
