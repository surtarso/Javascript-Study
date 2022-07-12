var CANVAS;
var CONTEXT;
var ball_x = 50;
var ball_y = 50
var ball_speed_x = 10;
var ball_speed_y = 4;

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
const WIN_SCORE = 10

var showWinScreen = false;

function calcMousePos(evt){
    var rect = CANVAS.getBoundingClientRect();
    var root = document.documentElement;
    var mouse_x = evt.clientX - rect.left - root.scrollLeft;
    var mouse_y = evt.clientY - rect.top - root.scrollTop;
    return {x:mouse_x, y:mouse_y}
}

function handleMouseClick(){
    if(showWinScreen){
        player_score = computer_score = 0;
        showWinScreen = false;
    }
}

window.onload = function(){
    //html elements
    CANVAS = document.getElementById('gameCanvas');
    CANVAS.width = 800;
    CANVAS.height = 600;
    CONTEXT = CANVAS.getContext('2d');
    PLAYER_SCORE = document.getElementById("playerScore");
    COMP_SCORE = document.getElementById("computerScore");
    //game fps
    var FPS = 30;
    setInterval(function(){
        moveEverything();
        drawEverything()
    },1000/FPS);
    //mouse control
    CANVAS.addEventListener('mousedown', handleMouseClick);
    CANVAS.addEventListener('mousemove', function(evt){
        var mousePos = calcMousePos(evt);
        paddle_left_y = mousePos.y - (PADDLE_HEIGHT / 2);
        // paddle_right_y = mousePos.y - (PADDLE_HEIGHT / 2);
    })
}

function ballReset(){
    if(player_score >= WIN_SCORE || computer_score >= WIN_SCORE){
        showWinScreen = true;
    }
    // TODO: add if p1/comp just scored, ball comes from him! (insted of middle)
    ball_x = CANVAS.width/2;
    ball_y = CANVAS.height/2;
}

//"a.i."
function computerMovement(){
    var paddle_right_y_center = paddle_right_y + (PADDLE_HEIGHT / 2);
    if(paddle_right_y_center < ball_y - 35){
        paddle_right_y += 6;
    } else if(paddle_right_y_center > ball_y + 35){
        paddle_right_y -= 6;
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

        CONTEXT.fillText("click to restart", 350, 300);
        return;
    }
    //net
    drawNet();

    //ball
    colorCircle(ball_x, ball_y, 10, 'red')

    //score
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