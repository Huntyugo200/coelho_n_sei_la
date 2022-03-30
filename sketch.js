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
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;
var button2;

var corte;
var comendo;
var triste;
var somdefundo;
var fuh;
var novacorda;
var botao2;
var estrela;
var estrela2;
var estrela_Img;


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_1.png","eat_2.png","eat_3.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  estrela_Img = loadImage('star.png');

  corte = loadSound('rope_cut.mp3');
  comendo = loadSound('eating_sound.mp3');
  triste = loadSound('sad.wav');
  somdefundo = loadSound('sound1.mp3');
  fuh = loadSound('air.wav');
  

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;

}

function setup() 
{
    createCanvas(600,700);
    frameRate(80);

    somdefundo.play();
    somdefundo.setVolume(0.4);

    engine = Engine.create();
    world = engine.world;

    button = createImg('cut_btn.png');
    button.position(180,90);
    button.size(50,50);
    button.mouseClicked(drop);

    rope = new Rope(7,{x:200,y:90});
    novacorda = new Rope(7,{x:400,y:90});
    ground = new Ground(300,height,width,20);

    blink.frameDelay = 20;
    eat.frameDelay = 20;
    sad.frameDelay = 20;

    bunny = createSprite(230,height-80,100,100);
    bunny.scale = 0.2;
    
    bunny.addAnimation('blinking',blink);
    
    bunny.addAnimation('eating',eat);
    bunny.addAnimation('crying',sad);
    bunny.changeAnimation('blinking');

    fruit = Bodies.circle(300,300,20);
    Matter.Composite.add(rope.body,fruit);

    fuit_con = new Link(rope,fruit);
    fuit_con_2 = new Link(novacorda,fruit);

    button2 = createImg('baloon2.png');
    button2.position(260,370);
    button2.size(120,120);
    button2.mouseClicked(assoprar);

    botao2= createImg('cut_btn.png');
    botao2.position(380,90);
    botao2.size(50,50);
    botao2.mouseClicked(drop2);
    

    estrela = createSprite(320,50,20,20);
    estrela.addImage(estrela_Img);
    estrela.scale = 0.03;

    estrela2 = createSprite(50,370,20,20);
    estrela2.addImage(estrela_Img);
    estrela2.scale= 0.03;

    rectMode(CENTER);
    ellipseMode(RADIUS);
    imageMode(CENTER);

}

function draw()
{

    background(51);
    image(bg_img,0,0,1200,1400);

    if(fruit!=null){
      image(food,fruit.position.x,fruit.position.y,70,70);
    }

    rope.show();
    novacorda.show();
    Engine.update(engine);
    ground.show();

    if(collide(fruit,bunny,80)==true)
    {
      bunny.changeAnimation('eating');
    }

    if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }

   if(collide(fruit,estrela,20)==true){
     estrela.visible=false;
   }

   if(collide(fruit,estrela2,20)==true){
     estrela2.visible=false;
   }

    drawSprites();   

}

function drop()
{
    rope.break();
    fruit_con.dettach();
    fruit_con = null;
}

function drop2()
{
    novacorda.break();
    fruit_con_2.dettach();
    fruit_con_2 = null; 
}

function collide(body,sprite,x)
{
    if(body!=null)
    {
        var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
            if(d<=x)
                {
                  World.remove(engine.world,fruit);
                  fruit = null;
                  return true;
                }

            else
                {
                  return false;
                }
    }
}

function assoprar(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.05})
}