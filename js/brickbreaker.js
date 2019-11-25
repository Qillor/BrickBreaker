var c = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */
var ctx = c.getContext("2d");

function brick() {
    ctx.beginPath();
    for (x = 2; x < 600; x += 50) {
        for (y = 2; y < 150; y += 50) {
            ctx.rect(x,y,45,45);
            ctx.fillStyle= "#89cff0";
            ctx.fill();
        }
    }
    ctx.closePath(); 
}

function ball(){
    ctx.beginPath();
    ctx.arc(300, 300, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  };
 
function paddle() {
    ctx.beginPath();
    ctx.rect(275,400,60,10)
    ctx.stroke();
    ctx.closePath();
}    

function components(){
    ctx.clearRect(0,0,c.clientWidth,c.height)
    ball();
    brick();
    paddle();
}

setInterval(components, 20);
