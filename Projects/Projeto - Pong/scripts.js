var CANVAS;
var CONTEXT;
var ball_x = 50;
var ball_y = 50

var min_y = -10;
var max_y = 10;
var ball_random_y = Math.floor(Math.random() * (max_y - min_y + 1)) + min_y;

var ball_speed_y = ball_random_y;
var ball_speed_x = 10;

const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;
var paddle_left_y = 210;
var paddle_right_y = 210;

//html reference
var PLAYER_SCORE;
var COMP_SCORE;
//code
var player_score = 0;
var computer_score = 0;
const WIN_SCORE = 5;

var showWinScreen = false;
var lastscored = '';

function calcMousePos(evt){
    var rect = CANVAS.getBoundingClientRect();
    var root = document.documentElement;
    var mouse_x = evt.clientX - rect.left - root.scrollLeft;
    var mouse_y = evt.clientY - rect.top - root.scrollTop;
    return {x:mouse_x, y:mouse_y}
}

function calTouchPos(evt){
    var rect = CANVAS.getBoundingClientRect();
    var root = document.documentElement;
    var touch = evt.touches[0];
    var touch_x = touch.clientX - rect.left - root.scrollLeft;
    var touch_y = touch.clientY - rect.top - root.scrollTop;
    return {x:touch_x, y:touch_y}
}

function handleMouseClick(){
    if(showWinScreen){
        player_score = computer_score = 0;
        COMP_SCORE.innerHTML = "Computer Score: " + computer_score;
        PLAYER_SCORE.innerHTML = "Player Score: " + player_score;
        showWinScreen = false;
    }
}

window.onload = function(){
    //get html elements
    CANVAS = document.getElementById('gameCanvas');
    CANVAS.width = 800;
    CANVAS.height = 600;
    CONTEXT = CANVAS.getContext('2d');
    CONTEXT.font = "30px Georgia";  //set canvas font
    PLAYER_SCORE = document.getElementById("playerScore");
    COMP_SCORE = document.getElementById("computerScore");
    //set initial score
    PLAYER_SCORE.innerHTML = "Player Score: " + player_score;
    COMP_SCORE.innerHTML = "Computer Score: " + computer_score;

    //pc starts game
    ball_x = CANVAS.width - PADDLE_THICKNESS;
    ball_y = paddle_right_y + (PADDLE_HEIGHT/2);
    //toggle click to start
    showWinScreen = true

    //game fps
    var FPS = 30;
    setInterval(function(){
        moveEverything();
        drawEverything()
    },1000/FPS);

    //mouse control
    CANVAS.addEventListener('mousedown', handleMouseClick);

    //position control
    CANVAS.addEventListener('mousemove', function(evt){
        var mousePos = calcMousePos(evt);
        paddle_left_y = mousePos.y - (PADDLE_HEIGHT / 2);  //player 1
    });

    CANVAS.addEventListener('touchmove', function(evt){
        var touch_position = calTouchPos(evt);
        paddle_left_y = touch_position.y - (PADDLE_HEIGHT / 2);  //player 1
    });
}

function ballReset(){
    if(player_score >= WIN_SCORE || computer_score >= WIN_SCORE){
        showWinScreen = true;
    }
    
    if(lastscored == 'computer'){
        ball_x = CANVAS.width - PADDLE_THICKNESS;
        ball_y = paddle_right_y + (PADDLE_HEIGHT/2);
    }
    if(lastscored == 'player'){
        ball_x = 0;
        ball_y = paddle_left_y + (PADDLE_HEIGHT/2);
    }
    if(lastscored == ''){
        ball_x = CANVAS.width/2;
        ball_y = CANVAS.height/2;
    }
    ball_speed_y = ball_random_y;
}

//"a.i."
function computerMovement(){
    var paddle_right_y_center = paddle_right_y + (PADDLE_HEIGHT / 2);
    if(paddle_right_y_center < ball_y - 35){
        paddle_right_y += 7;
    } else if(paddle_right_y_center > ball_y + 35){
        paddle_right_y -= 7;
    }
}

function moveEverything(){
    if(showWinScreen){
        return;
    }
    computerMovement();

    ball_x += ball_speed_x;
    ball_y += ball_speed_y;

    //hit left
    if(ball_x < 0){
        if(ball_y > paddle_left_y && ball_y < paddle_left_y + PADDLE_HEIGHT){
            ball_speed_x = -ball_speed_x;
            var deltaY = ball_y - (paddle_left_y + PADDLE_HEIGHT / 2);
            ball_speed_y = deltaY * 0.35;
        } else {
            computer_score++;
            COMP_SCORE.innerHTML = "Computer Score: " + computer_score;
            lastscored = 'computer';
            ballReset();
        }
    }
    //hit right
    if(ball_x > CANVAS.width){
        if(ball_y > paddle_right_y && ball_y < paddle_right_y + PADDLE_HEIGHT){
            ball_speed_x = -ball_speed_x
            var deltaY = ball_y - (paddle_right_y + PADDLE_HEIGHT / 2);
            ball_speed_y = deltaY * 0.35;
        } else {
            player_score++;
            PLAYER_SCORE.innerHTML = "Player Score: " + player_score;
            lastscored = 'player';
            ballReset(); 
        }
    }
    //hit tops
    if(ball_y > CANVAS.height || ball_y < 0){
        ball_speed_y = -ball_speed_y
    }
}

function drawNet(){
    for(var i = 0; i < CANVAS.height; i += 40){
        colorRect(CANVAS.width/2-1, i, 2, 20, 'white')
    }
}

function drawEverything(){
    //bg
    colorRect(0, 0, CANVAS.width, CANVAS.height, 'black');

    //left paddle
    colorRect(0, paddle_left_y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white')

    //right paddle
    colorRect(CANVAS.width - PADDLE_THICKNESS, paddle_right_y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white')

    if(showWinScreen){
        if(player_score >= WIN_SCORE){
            // CONTEXT.fillText("YOU WON!", 350, 200);
            PLAYER_SCORE.innerHTML = "YOU WON!"
            COMP_SCORE.innerHTML = "Player: " + player_score + "  vs  Computer: " + computer_score;
        }
        else if(computer_score >= WIN_SCORE){
            // CONTEXT.fillText("COMPUTER WON!", 350, 200);
            COMP_SCORE.innerHTML = "COMPUTER WON!"
            PLAYER_SCORE.innerHTML = "Player: " + player_score + "  vs  Computer: " + computer_score;
        }

        CONTEXT.fillText("click to start", 330, 300);
        return;
    }
    //net
    drawNet();

    //ball
    colorCircle(ball_x, ball_y, 10, 'red')

    //score inside canvas
    //CONTEXT.fillText(player_score, 100, 100);
    //CONTEXT.fillText(computer_score, CANVAS.width - 100, 100);
}

//ball creation
function colorCircle(center_x, center_y, radius, drawColor){
    CONTEXT.fillStyle = drawColor;
    CONTEXT.beginPath();
    CONTEXT.arc(center_x, center_y, radius, 0, Math.PI * 2, true)
    CONTEXT.fill();
}

//rects creation
function colorRect(left_x, top_y, width, height, drawColor){
    CONTEXT.fillStyle = drawColor;
    CONTEXT.fillRect(left_x, top_y, width, height);
}
