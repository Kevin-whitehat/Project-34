const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button, blower;
var bunny;
var blink, eat, sad;
var mute_btn;

var fr, rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('ball_hoop.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');


}

function setup() {
  createCanvas(500, 700);

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);


  rope = new Rope(7, { x: 245, y: 30 });
  ground = new Ground(200, 690, 600, 20);



  bunny = createSprite(230, 600, 100, 100);
  bunny.scale = 0.5;
  bunny.addImage(rabbit)
  bunny.VelocityX = 5;



  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  image(bg_img, 0, 0, 490, 690);

  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if (collide(fruit, bunny) == true) {

  }


  if (fruit != null && fruit.position.y >= 650) {

    fruit = null;

  }

}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}


function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}


