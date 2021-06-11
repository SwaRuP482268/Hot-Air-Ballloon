var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database;
var position;
var balloonpos;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
 
  createCanvas(1500,700);
  database=firebase.database();
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  balloonpos=database.ref('balloon/height');
  balloonpos.on('value',readHeight,showerror);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        updateHeight(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updateHeight(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updateHeight(0,-1);
        balloon.addAnimation("hotAirBalloon",balloonImage1);
        balloon.scale=balloon.scale +0.01;
    }
    else if(keyDown(DOWN_ARROW)){
        updateHeight(0,+1);
    }}
 
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
     'x':position.x + x,
     'y':position.y + y
  })
 
}

function readHeight(data){

      position=data.val();
      balloon.x=position.x;
      balloon.y=position.y;
}

function showerror(){
  console.log("Error In WRITIN IN DATABASE");
}
