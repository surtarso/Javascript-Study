
document.addEventListener("keydown",keyPush);

CANVAS = document.getElementById("gameCanvas");
CONTEXT = CANVAS.getContext("2d");

//size relation
CANVAS.width = CANVAS.height = 400;
grid_size = tile_count = 20;

//snake and apple start position
snake_x = snake_y = 10;
apple_x = apple_y = 15;
//tail initial size
snake_tail_initial = 3
snake_tail = snake_tail_initial;
trail = [];
//move direction (stopped)
x_velocity = y_velocity = 0;
snake_speed = 4

setInterval(updateGame,1000/snake_speed);

function updateGame() {
    snake_x += x_velocity;
    snake_y += y_velocity;

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
//apple
function drawApple(){
    CONTEXT.fillStyle = "red";
    CONTEXT.fillRect(
        apple_x * grid_size,
        apple_y * grid_size,
        grid_size - 2,
        grid_size - 2
    );
}
//snake
function drawSnake(){
    CONTEXT.fillStyle = "lime";
    for(var i = 0; i < trail.length; i++) {
        CONTEXT.fillRect(
                trail[i].x * grid_size,
                trail[i].y * grid_size,
                grid_size - 2,
                grid_size - 2
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
        apple_x, apple_y = placeApple();
    }
}

//prevents apple from spawning on snake body
function placeApple(){
    apple_x = Math.floor(Math.random() * tile_count);
    apple_y = Math.floor(Math.random() * tile_count);
    for(let i = 0; i < trail.length; i++){
        if(apple_x == trail[i].x || apple_y == trail[i].y){
            placeApple()
        } else {
            return apple_x, apple_y
        }
    }
}


//move keys
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
