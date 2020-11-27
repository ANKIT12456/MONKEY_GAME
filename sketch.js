
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananagroup, obstaclegroup;
var score=0,gameState="play",ground,survivaltime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
    bananagroup=new Group();
    obstaclegroup=new Group();
    ground=createSprite(200,370,900,10);
    ground.velocityX=-4;
    ground.x=ground.width/2;
    

   monkey=createSprite(50,330);
   monkey.scale=0.1;
   monkey.addAnimation("monkey",monkey_running);

}

function draw() {
   background("white");
  if(gameState=="play"){
    monkey.collide(ground);
    ground.velocityX=-5;
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    console.log(monkey.y);
    bananas();
    obstacles();
    textSize(20);
    text("SCORE="+" "+score,250,50);
    survivaltime=Math.ceil(frameCount/frameRate());
    text("SURVIVAL TIME="+" "+survivaltime,20,50);
                              
    if(keyDown("space") && monkey.y>=250){
      monkey.velocityY=-10;
    }
    monkey.velocityY=monkey.velocityY+0.5;
    if(bananagroup.isTouching(monkey)){
      bananagroup.destroyEach();
      score=score+2;
    }
    if(obstaclegroup.isTouching(monkey)){
      gameState="end";
    }
  }
  if(gameState=="end"){
    textSize(15);
    text("PLEASE PRESS SPACEBAR TO CONTINUE",50,200);
    monkey.velocityY=0;
    ground.velocityX=0;
    score=0;
    obstaclegroup.destroyEach();
    bananagroup.destroyEach();
    obstaclegroup.setVelocityXEach(0);
    bananagroup.setVelocityXEach(0);
    if(keyDown("space")){
      gameState="play";
    }
  }
  drawSprites();
}
function bananas(){
   if(frameCount%80==0){
   banana=createSprite(200,Math.round(random(200,250)));
   banana.scale=0.1; 
   banana.addImage(bananaImage); 
   banana.velocityX  =-6;
   bananagroup.add(banana);
   }
}

function obstacles(){
  if(frameCount%150==0){
   obstacle=createSprite(Math.round(random(200,400)),350);
   obstacle.scale=0.1;
   obstacle.velocityX=-6;
   obstacle.addImage(obstacleImage);  
   obstaclegroup.add(obstacle);
  
  }
}