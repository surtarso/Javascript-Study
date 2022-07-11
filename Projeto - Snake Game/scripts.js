
document.addEventListener("keydown",keyPush);

CANVAS = document.getElementById("gc");
CONTEXT = CANVAS.getContext("2d");

CANVAS.width = 400;
CANVAS.height = 400;

gs = tc = 20;

//snake and apple start position
snake_x = snake_y = 10;
apple_x = apple_y = 15;
//tail initial size
snake_tail_initial = 3
snake_tail = snake_tail_initial;
trail = [];
//move direction (stopped)
vec_x = vec_y = 0;
snake_speed = 2.5

setInterval(updateGame,1000/snake_speed);

function updateGame() {
    snake_x += vec_x;
    snake_y += vec_y;

    setDirection();
    drawBrackground();
    drawSnake();
    drawApple();
}

function setDirection(){
    if(snake_x < 0) {
        snake_x = tc - 1;
    }
    if(snake_x > tc - 1) {
        snake_x = 0;
    }
    if(snake_y < 0) {
        snake_y = tc - 1;
    }
    if(snake_y > tc - 1) {
        snake_y = 0;
    }
}

//background
function drawBrackground(){
    CONTEXT.fillStyle = "black";
    CONTEXT.fillRect(
            0,
            0,
            CANVAS.width,
            CANVAS.height
    );
}

//snake
function drawSnake(){
    CONTEXT.fillStyle = "lime";
    for(var i = 0; i < trail.length; i++) {
        CONTEXT.fillRect(
                trail[i].x * gs,
                trail[i].y * gs,
                gs - 2,
                gs - 2
        );

        //eat own body
        if(trail[i].x ==snake_x && trail[i].y == snake_y) {
            snake_tail = snake_tail_initial;
        }
    }

    trail.push({x:snake_x, y:snake_y});

    while(trail.length > snake_tail) {
        trail.shift();
    }

    //eat apple
    if(apple_x == snake_x && apple_y == snake_y) {
        snake_tail++;
        apple_x = Math.floor(Math.random() * tc);
        apple_y = Math.floor(Math.random() * tc);
    }
}

//apple
function drawApple(){
    CONTEXT.fillStyle = "red";
    CONTEXT.fillRect(
        apple_x * gs,
        apple_y * gs,
        gs - 2,
        gs - 2
    );
}


//move keys
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            vec_x = -1; vec_y = 0;
            break;
        case 38:
            vec_x = 0; vec_y = -1;
            break;
        case 39:
            vec_x = 1; vec_y = 0;
            break;
        case 40:
            vec_x = 0; vec_y = 1;
            break;
    }
}
