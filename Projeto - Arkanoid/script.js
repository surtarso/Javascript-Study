//game dimensions
var CANVAS = document.getElementById("canvas");
var CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 600;
CANVAS.height = 600;

var ball_size = 10;
var ball_speed = 1;
var ball_loc_x, ball_loc_y;  // ball location
var ball_dir_x, ball_dir_y; // ball direction

var brick_width = 40;
var brick_height = 20;
var bricks=[];
var total_brick_rows = 10;
var total_brick_cols = 13;
var brick_margin_x = brick_width;
var brick_margin_y = brick_height + ball_size;

var paddle_width = 100;
var paddle_height = 10;
var paddle_x=CANVAS.width / 2; //center
var paddle_y=CANVAS.height - 20; 



// brick creation and placement
function init(){
    bricks=[];
    ball_loc_x = CANVAS.width / 2;
    ball_loc_y = CANVAS.height - 100;
    ball_dir_x = ball_speed;
    ball_dir_y = -ball_speed;

    for (var y = 0; y < total_brick_rows; y++){  //rows
        // for (var x = y; x < total_brick_cols - y; x++){  //columns V
        for (var x = 0; x < total_brick_cols; x++){         //columns rect
            bricks.push({
                x: brick_margin_x + x * brick_width,
                y: brick_margin_y + y * brick_height,
                active: true
            })
        }
    }
}

//----------------------------------------------- DRAW GAME ITEMS:
//draws rectangles (brick/paddle/bg)
function drawRect(color, x, y, w, h) {
    CONTEXT.fillStyle = color
    CONTEXT.beginPath()
    CONTEXT.rect(x, y, w, h)
    CONTEXT.fill()
    CONTEXT.stroke()
}

//draw circles (ball)
function drawCircle(color, x, y, r) {
    CONTEXT.fillStyle = color
    CONTEXT.beginPath()
    CONTEXT.arc(x, y, r, 0, 2 * Math.PI, false)
    CONTEXT.fill()
}

//draw game details
function draw(){
    //background
    drawRect('black', 0, 0, CANVAS.width, CANVAS.height);
    //ball
    drawCircle('darkgray', ball_loc_x, ball_loc_y, ball_size);

    for (var i = 0; i < bricks.length; i++){
        var current_brick = bricks[i];
        
        if (!current_brick.active) {continue};
        //bricks
        drawRect('#1a1a', current_brick.x, current_brick.y, brick_width, brick_height);
    }
    //paddle
    drawRect('gray', paddle_x-paddle_width/2, paddle_y, paddle_width, paddle_height);
}

//random colors for effects (UNUSED SO FAR)
function getRandomColors(){
    var brick_colors = ['darkpink', 'darkviolet', 'darkblue'];
    var n = Math.round(Math.random() * brick_colors.length);
    return brick_colors[n];
}

//-------------------------------------------------- GAME LOGIC:
//ball movement / hits
function move(){
    //bounce on side walls
    if (ball_loc_x - ball_size + ball_dir_x < 0 ||
            ball_loc_x + ball_size + ball_dir_x > CANVAS.width){
        ball_dir_x = -ball_dir_x;
    };
    //bounce on top wall
    if (ball_loc_y - ball_size + ball_dir_y < 0){
        ball_dir_y = -ball_dir_y;
    };

    //--------- LOSE CONDITION ball past paddle
    if (ball_loc_y - ball_size > paddle_y){
        return false;  //stops draw()
    };

    //hit paddle
    if (ball_loc_y + ball_size > paddle_y &&
            ball_loc_x + ball_size > paddle_x - paddle_width / 2 &&
                ball_loc_x - ball_size < paddle_x + paddle_width / 2){
        //bounce
        ball_dir_y = -ball_dir_y;
    };
    
    //ball movement
    ball_loc_x += ball_dir_x;
    ball_loc_y += ball_dir_y;
    
    // ball hit test
    for (var i = 0; i < bricks.length; i++){
        var b = bricks[i];
        if (!b.active){ continue };
        // ball hits brick
        if (b.x < ball_loc_x + ball_size - 1 &&
                ball_loc_x - ball_size - 1 < b.x + brick_width &&
                    b.y < ball_loc_y + ball_size - 1 &&
                        ball_loc_y - ball_size < b.y + brick_height - 1){
            //deactivate brick
            b.active = false;
            //bounce
            ball_dir_y = -ball_dir_y;
            break;
        };
    };
    return true;  //keeps draw()ing
}

//main update on interval
function updateGame(){
    if (!move()){
        alert('Game over!');
        init();
    }
    draw();
}

//--------------------------------------------------- MOVEMENT:
//paddle movement setup
document.addEventListener("keydown", function(e){
    switch (e.keyCode) {
        case 37:
            if (paddle_x >= paddle_width/2){
                paddle_x -= 20;
                break;
            }
        case 39:
            if (paddle_x <= CANVAS.width - (paddle_width/2)){
                paddle_x += 20;
                break;
            }
    };
});

//set-up bricks and start game
init();
setInterval(updateGame, 1);
// setInterval(() => {updateGame()}, 1000/30);