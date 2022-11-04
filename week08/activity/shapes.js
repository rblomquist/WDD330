const canvas = document.getElementById("myCanvas");
// const context = canvas.getContext("2d");
// context.strokeStyle = "red";
// context.fillStyle = "rgba(0, 0, 255, 0.5)";
// context.fillRect(10, 10, 100, 100);   
// context.strokeRect(10, 10, 100, 100);

function drawGradient() {
    const gradient = context.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "blue"); 
    gradient.addColorStop(1, "white"); 
    context.fillStyle = gradient; 
    context.fillRect(10, 10, 100, 100); 
    context.strokeRect(10, 10, 100, 100); 
}
// drawGradient()

function drawCircle(canvas) {
    const context = canvas.getContext("2d");
    context.beginPath();
    context.arc(100, 100, 50, 0, Math.PI*2, true);
    context.closePath();
    context.strokeStyle = "red";
    context.fillStyle = "blue";
    context.lineWidth = 3;
    context.fill(); 
    context.stroke(); 
}
drawCircle(canvas)