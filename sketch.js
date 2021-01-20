var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var score
var PLAY = 1
var END = 0
var gameState = PLAY

var ground
var score

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(600, 600)

  score = 0;

  monkey = createSprite(100, 450, 50, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1

  ground = createSprite(400, 480, 1200, 5)

  bananaGroup = new Group();
  rockGroup = new Group();

}


function draw() {
  background("white");
  textSize(25)
  text("Score : " + score, 400, 100)
  if (gameState === PLAY) {


    spawnBanana()
    spawnRocks();

    ground.velocityX = -(4 + 3 * score / 100)

    if (ground.x < 0) {
      ground.x = 400;
    }

    score = score + Math.round(getFrameRate() / 60);






    //jump when the space key is pressed
    if (keyDown("SPACE") && monkey.y>450) {
      monkey.velocityY = monkey.velocityY - 10;

    }
    monkey.velocityY = monkey.velocityY + 0.8
    //add gravity


    if (rockGroup.isTouching(monkey)) {
      gameState = END;

    }
    monkey.collide(ground);



    drawSprites();
  }
  if (gameState === END) {


    textSize(30)
    fill("red");
    text("Monkey Lost", 300, 300)

  }

}

function spawnRocks() {

  if (frameCount % 100 === 0) {
    obstacle = createSprite(650, 441, 50, 50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2
    obstacle.velocityX = -9
    obstacle.lifetime = 600
    rockGroup.add(obstacle)
  }
  console.log("SpawnRock funcions")
}


function spawnBanana() {

  if (frameCount % 80 === 0) {
    banana = createSprite(650, 341, 50, 50);
    banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.velocityX = -9
    banana.y = Math.round(random(220, 341))
    banana.lifetime = 600
    bananaGroup.add(banana)

  }
}