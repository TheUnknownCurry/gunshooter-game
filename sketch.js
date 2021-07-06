var gun, blueBubble, redBubble
var bullet,bulletImage
var score = 0
var life = 3 
var gameState = 1
 

function preload() {
  gunImage = loadImage("gun1.png")
  blastImage = loadImage("blast.png")
  bulletImage = loadImage("bullet1.png")
  redBubbleImage = loadImage("redbubble.png")
  blueBubbleImage = loadImage("waterBubble.png")
  backBoardImage = loadImage("back.jpg")
}

function setup() {
createCanvas(800, 800);
backBoard = createSprite(50,width/2,100,height)
backBoard.addImage(backBoardImage)
gun = createSprite(100,height/2,50,50)
gun.addImage(gunImage)
gun.scale = 0.2
bulletGroup = createGroup()
blueBubbleGroup = createGroup()
redBubbleGroup = createGroup()
heading = createElement("h1")
scoreBoard = createElement("h1")
}

function draw() {
background(180);
heading.html("life-"+life)
heading.style('color:lightblue')
heading.position(150,20)
scoreBoard.html("score-"+score)
scoreBoard.style('color:red')
scoreBoard.position(width-200,20)
if(gameState === 1){
  gun.y = mouseY
  if(frameCount%80 === 0){
    drawblueBubble()
  }
  if(frameCount%100 === 0){
    drawredBubble()
  }
  if(keyDown("space")){
    shootBullet()
  }
  if(blueBubbleGroup.collide(backBoard)){
    handleGameOver(blueBubbleGroup)
  }
  if(redBubbleGroup.collide(backBoard)){
    handleGameOver(redBubbleGroup)
  }
  if(blueBubbleGroup.collide(bulletGroup)){
    handleBubbleCollison(blueBubbleGroup) 
  }
  if(redBubbleGroup.collide(bulletGroup)){
    handleBubbleCollison(redBubbleGroup)

  

}
drawSprites();
}
}
function drawblueBubble(){
  blueBubble = createSprite(800,random(20,780),40,40)
  blueBubble.addImage(blueBubbleImage)
  blueBubble.scale = 0.1
  blueBubble.velocityX = -8
  blueBubble.lifetime = 400
  blueBubbleGroup.add(blueBubble)
}
function drawredBubble(){
  redBubble = createSprite(800,random(20,780),40,40)
  redBubble.addImage(redBubbleImage)
  redBubble.scale = 0.1
  redBubble.velocityX = -8
  redBubble.lifetime = 400
  redBubbleGroup.add(redBubble)
}
function shootBullet(){
  bullet = createSprite(150,width/2,50,20)
  bullet.y = gun.y - 20
  bullet.addImage(bulletImage)
  bullet.scale = 0.12
  bullet.velocityX = 7
  bulletGroup.add(bullet)
}
function handleBubbleCollison(){
  if(life>0){
    score = score+1
  }
  blast = createSprite(bullet.x+60,bullet.y,50,50)
  blast.addImage(blastImage)
  blast.scale = 0.3
  blast.life = 20
  bulletGroup.destroyEach()
  blueBubbleGroup.destroyEach()
  redBubbleGroup.destroyEach()
}
function handleGameOver(bubbleGroup){
  life = life-1
  blueBubbleGroup.destroyEach()
  redBubbleGroup.destroyEach()
  if(life === 0){
  gameState = 2
  swal({
    title:'Game Over',
    text: 'You have lost the game',
    text:'Your score is'+ score,
    imageUrl:'https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png',
    imageSize: '100x100',
    confirmButtonText:'Thanks For Playing'
  })
  }

}