CANVAS = document.getElementById("gameCanvas");
CONTEXT = CANVAS.getContext("2d");
SNAKE_SIZE = document.getElementById("size");

//size relation
CANVAS.width = CANVAS.height = 400;
grid_size = tile_count = 20;

//snake and apple start position
snake_x = snake_y = 10;
apple_x = apple_y = 15;
//tail initial size
snake_tail_initial = 3
snake_tail = snake_tail_initial;
snake_trail = [];

score = 0

//initial move direction (stopped)
x_velocity = y_velocity = 0;
snake_speed = 5
//keyboard keys listener
document.addEventListener("keydown",keyPush);
setInterval(updateGame,1000/snake_speed);

//----------------------------------------MAIN UPDATE:
function updateGame() {
    //move
    snake_x += x_velocity;
    snake_y += y_velocity;
    //update score/size
    SNAKE_SIZE.innerHTML = "Size: " + snake_tail;

    wrapScreen();
    drawBrackground();
    drawApple();
    drawSnake();
}

//screen wrap
function wrapScreen(){
    if(snake_x < 0) {
        snake_x = tile_count - 1;
    }
    if(snake_x > tile_count - 1) {
        snake_x = 0;
    }
    if(snake_y < 0) {
        snake_y = tile_count - 1;
    }
    if(snake_y > tile_count - 1) {
        snake_y = 0;
    }
}

//------------------------------------- DRAW ITEMS:
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
    for(let i = 0; i < snake_trail.length; i++) {
        CONTEXT.fillRect(
                snake_trail[i].x * grid_size,
                snake_trail[i].y * grid_size,
                grid_size - 2,
                grid_size - 2
        );
        
        //------------------ LOSE CONDITION:
        //eat own body
        if(snake_trail[i].x ==snake_x && snake_trail[i].y == snake_y) {
            //reset to initial settings
            snake_tail = snake_tail_initial;
            score = 0
            x_velocity = y_velocity = 0;
            //snake and apple start position
            snake_x = snake_y = 10;
            apple_x = apple_y = 15;
        }
    }

    snake_trail.push({x:snake_x, y:snake_y});

    while(snake_trail.length > snake_tail) {
        snake_trail.shift();
    }

    //eat apple
    if(apple_x == snake_x && apple_y == snake_y) {
        snake_tail++;
        score++;
        apple_x, apple_y = placeNewApple();
    }
}

//apple
function drawApple(){
    CONTEXT.fillStyle = "red";
    CONTEXT.fillRect(  //make this a circle later
        apple_x * grid_size,
        apple_y * grid_size,
        grid_size - 2,
        grid_size - 2
    );
}

//-------------------------------------------- PLACE NEW APPLE:
//prevents apple from spawning on snake body
function placeNewApple(){
    apple_x = Math.floor(Math.random() * tile_count);
    apple_y = Math.floor(Math.random() * tile_count);
    for(let i = 0; i <= snake_trail.length; i++){
        if(apple_x != snake_trail[i].x || apple_y != snake_trail[i].y){
            console.log('placed')
            return apple_x, apple_y;
        } 
        else {
            console.log('hit');
            placeNewApple(); 
        }
    }
}

//--------------------------------------------------MOVEMENT:
//keyboard move keys
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            if(x_velocity != 1){
                x_velocity = -1; y_velocity = 0;
            }
            break;
        case 38:
            if(y_velocity != 1){
            x_velocity = 0; y_velocity = -1;
            }
            break;
        case 39:
            if(x_velocity != -1){
                x_velocity = 1; y_velocity = 0;
            }
            break;
        case 40:
            if(y_velocity != -1){
            x_velocity = 0; y_velocity = 1;
            }
            break;
    }
}

//touch move keys
function l() {
    if(x_velocity != 1){
        x_velocity = -1; y_velocity = 0;
    }
}
function u() {
    if(y_velocity != 1){
        x_velocity = 0; y_velocity = -1;
        }
}
function r() {
    if(x_velocity != -1){
        x_velocity = 1; y_velocity = 0;
    }
}
function d() {
    if(y_velocity != -1){
        x_velocity = 0; y_velocity = 1;
        }
}
