var back,backAnimation;
var runner,runnerAnimation,jumpAnimation;
var invisibleGround,invisibleGround1;
var heart,heartAnimation;
var one,ten,oneAnimation,tenAnimation,oneGroup,tenGroup;
var cones,coneAnimation,coneGroup;
var score = 0;
var gamestate;
var play = 1;
var end = 0;
var gameover,gameoverAnimation;



function preload(){
  backAnimation = loadAnimation("background.jpg");
  runnerAnimation = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png");
  jumpAnimation = loadAnimation("3.png");
  heartAnimation = loadAnimation("heart.jpg");
  oneAnimation = loadAnimation("1coin.png");
  tenAnimation = loadAnimation("10coin.jpg");
  coneAnimation = loadAnimation("cone.png");
  gameoverAnimation = loadAnimation("gameover.png");

}

function setup() {
  createCanvas(600,300);
 back = createSprite(300,150);
  back.addAnimation("background",backAnimation);
  back.scale = 1.5;
  back.velocityX = -(6+score/5);
  runner = createSprite(55,230);
  runner.addAnimation("runnerAnimation",runnerAnimation);
  runner.addAnimation("jumpAnimation",jumpAnimation);
  runner.scale = 0.7;
  invisibleGround = createSprite(55,runner.y+50,100,3);
    invisibleGround1 = createSprite(55,runner.y+48,100,3);
  heart = createSprite(30,25);
  heart.addAnimation("heartAnimation",heartAnimation);
  heart.scale = 0.3;
  
  gameover = createSprite(300,150);
  gameover.addAnimation("gameoverAnimation",gameoverAnimation);
  gameover.scale = 2;
  
  oneGroup = new Group();
  tenGroup = new Group();
  coneGroup = new Group();
  gamestate = play;
}

function draw() {
 background("black");
  
  drawSprites();
  if(gamestate === play){
    coins();
  ob();
    textStyle(BOLD);
  fill("darkgreen");
  textSize(15);
  text("Score = "+score,470,50);
  invisibleGround.visible = false;
  invisibleGround1.visible = false;
    gameover.visible = false;
  runner.collide(invisibleGround);
  if(back.x<120){
   back.x = width/2;
  }
  
  if(runner.isTouching(oneGroup)){
  console.log("hello");
  score = score+1;
  oneGroup.destroyEach();
  }
  if(runner.isTouching(tenGroup)){
  console.log("hello1");
  score = score+10;
  tenGroup.destroyEach();
  }
  if(runner.isTouching(coneGroup)){
    gamestate = end;
  }
  if(keyDown("space")&& runner.y > 230){
    runner.velocityY = -15;
  }
  if(runner.y<230){
   runner.changeAnimation("jumpAnimation",jumpAnimation);
  }
  else if(runner.isTouching(invisibleGround1)){
  runner.changeAnimation("runnerAnimation",runnerAnimation);
  }
  runner.velocityY = runner.velocityY+0.8;
}
else if(gamestate === end){
  gameover.visible = true;
  invisibleGround.visible = false;
  invisibleGround1.visible = false;
  runner.destroy();
  coneGroup.destroyEach();
  oneGroup.destroyEach();
  tenGroup.destroyEach();
  score = 0;
  back.velocityX = 0;
  heart.destroy();
  back.destroy();
  fill("white");
  textSize(20);
  text("PRESS R TO RESTART",gameover.x-100,gameover.y+60);
  if(keyDown("r")){
    gamestate = play;
    back = createSprite(300,150);
     back.addAnimation("background",backAnimation);
  back.scale = 1.5;
  back.velocityX = -6;
  runner = createSprite(55,230);
  runner.addAnimation("runnerAnimation",runnerAnimation);
  runner.addAnimation("jumpAnimation",jumpAnimation);
  runner.scale = 0.7;
    heart = createSprite(30,25);
    heart.addAnimation("heartAnimation",heartAnimation);
  heart.scale = 0.3;
  }
  
}
  }
  

function coins(){
  if(frameCount%100 ===0){
    one = createSprite(600,50);
    one.addAnimation("oneAnimation",oneAnimation);
    one.y = Math.round(random(150,250));
    one.scale = 0.15;
    one.velocityX = -(6+score/5);
    oneGroup.add(one);
    oneGroup.setLifetimeEach(100);
  }
  
  if(frameCount%345 === 0){
     ten = createSprite(600,50);
    ten.addAnimation("tenAnimation",tenAnimation);
    ten.y = Math.round(random(150,250));
    ten.scale = 0.15;
    ten.velocityX = -(6+score/5);
    tenGroup.add(ten);
    
  
    
  }
  
}
function ob(){
  if(frameCount%160 === 0){
  cones = createSprite(600,260);
  cones.addAnimation("coneAnimation",coneAnimation);
    cones.scale = 0.1;
    cones.velocityX = -(6+score/5);
    coneGroup.add(cones);
  }
}