var c = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */
var ctx = c.getContext("2d");
ctx.beginPath();
for (x = 2; x < 600; x += 50) {
    for (y = 2; y < 150; y += 50) {
        ctx.rect(x,y,45,45);
        ctx.fillStyle= "#89cff0";
        ctx.fill();
    }
}
ctx.closePath();
  
