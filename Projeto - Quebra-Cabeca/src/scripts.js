
let VIDEO = null;  //element created for inc video signal
let CANVAS = null;  //place where the video element is drawn
let CONTEXT = null;  //access camera methods
let SCALER = 0.8;  //how much screen space will be used by the video (0.8 = 80% == 20% margin)
let SIZE = {x:0, y:0, width:0, height:0, rows:3, columns:3};
let PIECES = [];  // array of jigsaw pieces
let SELECTED_PIECE = null;   // for mouse events
let START_TIME = null;
let END_TIME = null;


/*  placeholder to add option for image file later
function myFunction() {

    var file = document.getElementById('file').files[0];
    var reader  = new FileReader();
    // it's onload event and you forgot (parameters)
    reader.onload = function(e)  {
        var image = document.createElement("img");
        // the result image data
        image.src = e.target.result;
        document.body.appendChild(image);
     }
     // you have to declare the file loading
     reader.readAsDataURL(file);
 }
 */


//main function is called in html's <body> "onload"
function main(){

    //define canvas in html
    CANVAS = document.getElementById("myCanvas");
    // 2d method of the canvas
    CONTEXT = CANVAS.getContext("2d");

    //add event listeners for drag n drop operations
    addEventListeners();

    //acess the camera thru media devices
    let promise = navigator.mediaDevices.getUserMedia({video:true});
    //this will prompt the user to acess the camera, so after that:
    promise.then(function(signal){
        //create element
        VIDEO = document.createElement("video");
        VIDEO.srcObject = signal;
        //play
        VIDEO.play();

        //when video starts playing we update it in the canvas:
        VIDEO.onloadeddata = function(){
            //when metadata about he video is available we resize
            handleResize();
            //listen to resize events
            //window.addEventListener('resize', handleResize);   //only needed if user is going to keep refreshin the page
            initializePieces(SIZE.rows, SIZE.columns);
            updateGame();
        }
    //error handling for camera input
    }).catch(function(err){
        alert("Camera error: " + err);
    });
}


function setDifficulty(){
    let diff = document.getElementById("difficulty").value;

    switch(diff){
        case "easy":
            initializePieces(3, 3);  // 9
            break;
        case "medium":
            initializePieces(5, 5);  // 25
            break;
        case "hard":
            initializePieces(10, 10);  // 100
            break;
        case "insane":
            initializePieces(40, 25);  // 1000 pieces
            break;
    }
}


// start/restart the game
function restart(){
    START_TIME = new Date().getTime();
    END_TIME = null;
    randomizePieces();
    document.getElementById("menuItems").style.display = "none";
}


// update clock (playtime)
function updateTime(){
    let now = Date().getTime();
    if(START_TIME != null){
        if(END_TIME != null){
            document.getElementById("time").innerHTML = formatTime(END_TIME - START_TIME);
        } else {
            document.getElementById("time").innerHTML = formatTime(now - START_TIME);
        }
    }
}


// check win condition/
function isComplete(){
    for(let i = 0; i < PIECES.length; i++){
        if(PIECES[i].correct == false){
            return false;
        }
    }
    return true;
}


function formatTime(milliseconds){
    let seconds = Math.floor(milliseconds/1000);
    let s = Math.floor(seconds % 60);
    let m = Math.floor((seconds % (60 * 60)) / 60);
    let h = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));

    let formattedTime = h.toString().padStart(2, '0');
    formattedTime += ":";
    formattedTime += m.toString().padStart(2, '0');
    formattedTime += ":";
    formattedTime += s.toString().padStart(2, '0');

    return formattedTime;
}


// mouse and touch event listeners
function addEventListeners(){
    // mouse
    CANVAS.addEventListener("mousedown", onMouseDown);
    CANVAS.addEventListener("mousemove", onMouseMove);
    CANVAS.addEventListener("mouseup", onMouseUp);
    // touchscreen
    CANVAS.addEventListener("touchstart", onTouchStart);
    CANVAS.addEventListener("touchmove", onTouchMove);
    CANVAS.addEventListener("touchend", onTouchEnd);
}


function onTouchStart(evt){
    let loc = {x:evt.touches[0].clientX,
        y:evt.touches[0].clientY};
    onMouseDown(loc);
}
function onTouchMove(evt){
    let loc = {x:evt.touches[0].clientX,
        y:evt.touches[0].clientY};
    onMouseMove(loc);
}
function onTouchEnd(evt){
    let loc = {x:evt.touches[0].clientX,
        y:evt.touches[0].clientY};
    onMouseUp();
}


function onMouseDown(evt){
    SELECTED_PIECE = getPressedPiece(evt);
    if(SELECTED_PIECE != null){
        // make sure selected pieces can go over others
        const index = PIECES.indexOf(SELECTED_PIECE);
        if(index > -1){
            PIECES.splice(index, 1);
            PIECES.push(SELECTED_PIECE);
        }

        SELECTED_PIECE.offset = {
            x: evt.x - SELECTED_PIECE.x,
            y: evt.y - SELECTED_PIECE.y
        }

        SELECTED_PIECE.correct = false;
    }
}
function onMouseMove(evt){
    if(SELECTED_PIECE != null){
        SELECTED_PIECE.x = evt.x - SELECTED_PIECE.offset.x;
        SELECTED_PIECE.y = evt.y - SELECTED_PIECE.offset.y;
    }
}
function onMouseUp(){
    if(SELECTED_PIECE.isClose()){
        SELECTED_PIECE.snap();
        // check win condition
        if(isComplete() && END_TIME == null){
            let now = Date().getTime();
            END_TIME = now;
        }
    }

    SELECTED_PIECE = null;
}


function getPressedPiece(loc){
    for(let i = PIECES.length - 1; i >= 0; i--){
        // if click is within piece boundries
        if(loc.x > PIECES[i].x && loc.x < PIECES[i].x + PIECES[i].width &&
            loc.y > PIECES[i].y && loc.y < PIECES[i].y + PIECES[i].height){
                return PIECES[i];
            }
    }
    // if click point is not in card area:
    return null;
}


function handleResize(){

    // fill the windows with the canvas
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    let resizer = SCALER * 
    Math.min(
        window.innerWidth / VIDEO.videoWidth,
        window.innerHeight / VIDEO.videoHeight
    );
    // set size acordingly preserving aspect ratio
    SIZE.width = resizer * VIDEO.videoWidth;
    SIZE.height = resizer * VIDEO.videoHeight;
    // half width/height
    SIZE.x = window.innerWidth / 2 - SIZE.width / 2;
    SIZE.y = window.innerHeight / 2 - SIZE.height / 2;
}


function updateGame(){
    //clear the canvas before pieces are drawn
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);

    //make canvas semi visible (Easy mode - debug mode)
    CONTEXT.globalAlpha = 0.5;
    //update the image
    CONTEXT.drawImage(VIDEO,
        SIZE.x, SIZE.y,
        SIZE.width, SIZE.height);
    //reset transparency so only video has it, not pieces
    CONTEXT.globalAlpha = 1;
    
    //draw the pieces
    for(let i = 0; i < PIECES.length; i++){
        PIECES[i].draw(CONTEXT);
    }

    updateTime();
    //call the function recursevely many times to update video camera live
    window.requestAnimationFrame(updateGame);  //60fps if the user pc can handle
}


function initializePieces(rows, cols){
    SIZE.rows = rows;
    SIZE.columns = cols;

    PIECES = [];
    for(let i = 0; i < SIZE.rows; i++){
        for(let j = 0; j < SIZE.columns; j++){
            PIECES.push(new Piece(i,j));
        }
    }
}


function randomizePieces(){
    for(let i = 0; i < PIECES.length; i++){
        let loc = {
            // random location based on screen w/h and piece size so pieces dont go off screen
            x: Math.random() * (CANVAS.width - PIECES[i].width),
            y: Math.random() * (CANVAS.height - PIECES[i].height)
        }
        PIECES[i].x = loc.x;
        PIECES[i].y = loc.y;
        //set "piece is in correct location" to false
        PIECES[i].correct = false;
    }
}



class Piece{
    constructor(rowIndex, colIndex){
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        //each piece is at correct location at first:
        this.x = SIZE.x + SIZE.width * this.colIndex / SIZE.columns;
        this.y = SIZE.y + SIZE.height * this.rowIndex / SIZE.rows;
        //each piece is sized by the number of "squares" on grid
        this.width = SIZE.width / SIZE.columns;
        this.height = SIZE.height / SIZE.rows;
        //or:
        // this.x = SIZE.x + this.width * this.colIndex;
        // this.y = SIZE.y + this.height * this.rowIndex;
        //correct location of pieces:
        this.xCorrect = this.x; 
        this.yCorrect = this.y;
        //tell if piece is in correct location
        this.correct = true;
    }

    // draw the pieces (grid) to "cut" the input (Video)
    draw(context){
        context.beginPath();
        //each piece show the part of the video it is responsible for:
        context.drawImage(VIDEO,
            this.colIndex * VIDEO.videoWidth / SIZE.columns,
            this.rowIndex * VIDEO.videoHeight / SIZE.rows,
            VIDEO.videoWidth / SIZE.columns,
            VIDEO.videoHeight / SIZE.rows,
            this.x, this.y, this.width, this.height
            );

        context.rect(this.x, this.y, this.width, this.height);
        // strokes or nothing is drawn
        context.stroke();
    }
    
    // calculates if piece is close enough to snap()
    isClose(){
        if(distance({x:this.x, y:this.y},
            {x:this.xCorrect, y:this.yCorrect}) < this.width / 3){  // 3 = ~33% margin of error
                return true;
            }
        return false;
    }

    // snap pieces in the correct location (if isClose())
    snap(){
        this.x = this.xCorrect;
        this.y = this.yCorrect;
        //set "piece in correct place" to true
        this.correct = true;
    }
}

// calculates distance from piece location to correct location to see if isClose()
function distance(p1, p2){
    return Math.sqrt(
        (p1.x - p2.x) * (p1.x - p2.x) + 
        (p1.y - p2.y) * (p1.y - p2.y)
    );
}