var bg , backgroundImg
var bird, birdImg

var obstacle1,obstacle2
var obstacleImg1,obstacleImg2

var coin,coinImg

var PLAY=1
var END=0
var gameState=PLAY

var score=0

var gameover,gameoverImage,restart,restartImage

function preload(){
 backgroundImg=loadImage("images/background.png")
 birdImg=loadAnimation("images/bird0.png","images/bird1.png","images/bird2.png","images/bird3.png")

 obstacleImg1=loadImage("images/red pipe.png")
 obstacleImg2=loadImage("images/tube.png")

 coinImg=loadAnimation("images/coin.png","images/coin1.png","images/coin2.png","images/coin3.png","images/coin4.png","images/coin5.png",
 "images/coin6.png","images/coin7.png","images/coin8.png","images/coin9.png","images/coin10.png","images/coin11.png","images/coin12.png",
 "images/coin13.png","images/coin14.png","images/coin15.png")

 gameoverImage = loadImage("images/gameOver.png")
 restartImage= loadImage("images/restart.png")
}


function setup() {
  createCanvas(2000,900)

  bg=createSprite(0,0,1500,800)
  bg.addImage("back", backgroundImg)
  bg.velocityX=-3
  bg.scale=8

  bird=createSprite(80,450,20,20)
  bird.addAnimation("bird",birdImg)
  bird.scale=0.5
  bird.setCollider("circle",0,0,80)


  gameOver=createSprite(1000,450,20,20)
  gameOver.addImage(gameoverImage)
  gameOver.scale=0.5
  gameOver.visible=false;
  
  restart=createSprite(1000,140,20,20)
  restart.addImage(restartImage)
  restart.scale=0.5
  restart.visible=false;


  obstaclesGroup1=new Group()

  obstaclesGroup2=new Group()

  coinsGroup = new Group()
}

function draw() {
  background(180);
  
 
if(gameState===PLAY){

  coinsGroup.depth=obstaclesGroup1.depth-1
  coinsGroup.depth=obstaclesGroup2.depth-1
  
if(bird.isTouching(coinsGroup)){
 score=score+1
 coinsGroup.destroyEach()
}
  
   if(bg.x<0){
    bg.x=bg.width/2
   }
  
if(keyDown(UP_ARROW)){
bird.y=bird.y-5

}
if(keyDown(DOWN_ARROW)){
  bird.y=bird.y+5
  
  }

  spawnObstacles1()
  spawnObstacles2()
   spawnCoin()



   if(bird.isTouching(obstaclesGroup1) || bird.isTouching(obstaclesGroup2)){
     gameState=END
   }
}

else if(gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
  //set velcity of each game object to 0
  bg.velocityX = 0;
  bird.velocityY = 0;
  obstaclesGroup1.setVelocityXEach(0);
  obstaclesGroup2.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
  
 
  
  //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup1.setLifetimeEach(-1);
  obstaclesGroup2.setLifetimeEach(-1);
  coinsGroup.setLifetimeEach(-1);
  
  
}

if(mousePressedOver(restart)) {
  reset();
}

//console.log(trex.y);

  drawSprites();
textSize(25)
fill(0)
  text("Score: "+ score, 500,50);
}



function spawnObstacles1() {
  if(frameCount % 120 === 0) {
    var obstacle1 = createSprite(2000,100,10,40);
    obstacle1.velocityX = -4;
    
    obstacle1.setCollider("rectangle",0,0,60,200)
    
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle1.addImage(obstacleImg1);
              break;
      case 2: obstacle1.addImage(obstacleImg2);
     break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
   
    obstacle1.lifetime = 600;
    //add each obstacle to the group
    obstaclesGroup1.add(obstacle1);
  }
}

function spawnObstacles2() {
  if(frameCount % 120=== 0) {
    var obstacle2 = createSprite(2000,865,10,40);
    obstacle2.velocityX = -4;
  
    obstacle2.setCollider("rectangle",0,0,60,200)
    
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle2.addImage(obstacleImg1);
              break;
      case 2: obstacle2.addImage(obstacleImg2);
     break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
  
    obstacle2.lifetime = 600;
    //add each obstacle to the group
    obstaclesGroup2.add(obstacle2);
  }
}
function spawnCoin(){
  if(frameCount % 200===0){
    var coin = createSprite(600,300,10,10)
    coin.x = Math.round(random(200,1500));
    coin.y = Math.round(random(100,800));
    coin.addAnimation("coin",coinImg)
    coin.scale=0.5
    coin.velocityX=-3
   
    coin.setCollider("circle",0,0,80)

    

  

    coin.lifetime = 600

    coinsGroup.add(coin)

 
  }

}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup1.destroyEach();
  obstaclesGroup2.destroyEach();
  coinsGroup.destroyEach();
  
 
  
  score = 0;
  
}