let jugador;
let BadFoodGame;
let GoodFoodGame;
let bad;
let good;
let stopGame;
let points;
let level;
let pointMaxLevel;
let speedBad;
let speedGood;
let moduloFrameBad;
let moduloFrameGood;
let lvlOneShow;
let lvlTwoShow;
let lvlThreeShow;
let TrumpAudio = new Audio('audio/Yourefired.mp3');
let GoodAudio = new Audio('audio/gooditem.wav');
let BadAudio = new Audio('audio/baditem.wav');
let levelUpAudio= new Audio('audio/shineappears.wav');
let winAudio=new Audio('audio/WinMariachi.mp3');


//function that shows progression bar and score
function barre (){
  document.getElementById("health").value = points;
  document.getElementById("health").max=pointMaxLevel;
  document.getElementById("numberLevel").innerHTML=`Level ${level}`;
  document.getElementById("points").innerHTML=`${points} sur ${pointMaxLevel}`;
}

// restart function when we want to play again
function init (){
  BadFoodGame=[];
  GoodFoodGame=[];
 
  level=0;
  points=0;
  level=0;
  pointMaxLevel=3
  speedBad=5;
  speedGood=3;
  moduloFrameBad=200;
  moduloFrameGood=300;
  lvlOneShow=false;
  lvlTwoShow=false;
  lvlThreeShow=false;
  stopGame = false;
  document.querySelector(".canva").style.background="rgb(30, 17, 87)";
  barre()
}

//start canvas
const ctx = document.querySelector('canvas').getContext('2d');
const W = ctx.canvas.width;
const H = ctx.canvas.height;



//drawing elements
function draw() {
  ctx.clearRect(0,0,W,H);
  jugador.draw();

    
  if (frames % moduloFrameBad === 0) {
    bad = new Food(BadFood,50);
    BadFoodGame.push(bad);
  }

  BadFoodGame.forEach(function (bad) {
    bad.y += speedBad;
    bad.draw();
  });

  if (frames % moduloFrameGood === 0) {
    good = new Food(GoodFood,50);
    GoodFoodGame.push(good);
  }

  GoodFoodGame.forEach(function (good) {
    good.y += speedGood;
    good.draw();
  });

  
  
  for (good of GoodFoodGame) {
    if (good.catch(jugador)) {
      GoodAudio.play();
      GoodFoodGame.splice(GoodFoodGame.indexOf(good),1);
      points +=1;
      barre();
          
    }
  }

  for (bad of BadFoodGame) {
    if (bad.catch(jugador)) {
      BadAudio.play();
      points -=2;
      BadFoodGame.splice(BadFoodGame.indexOf(bad),1);
      barre();
        
    }
  }

  



  
  

  //level // change back to 3
  if (level===0 && points===1 && lvlOneShow===false){

    levelUpAudio.play();
    document.querySelector(".levelOne").classList.remove("dontDisplay");
    document.querySelector(".logo").classList.add("dontDisplay");
  
    setTimeout(function(){ 
      document.querySelector(".levelOne").classList.add("dontDisplay");
      document.querySelector(".logo").classList.remove("dontDisplay"); 
    },3000); 

    lvlOneShow=true;
    level=1;
    points=0;
      
  }

  if (level===1) {
    pointMaxLevel=4;
    barre();
    speedBad=6;
    speedGood=5;
    moduloFrameBad=100;
    moduloFrameGood=250;
  }

  //level2 //change back to 4
  if (level===1 && points===1 && lvlTwoShow===false){
    document.querySelector(".levelTwo").classList.remove("dontDisplay");
    document.querySelector(".logo").classList.add("dontDisplay");
  
    setTimeout(function(){ 
      document.querySelector(".levelTwo").classList.add("dontDisplay");
      document.querySelector(".logo").classList.remove("dontDisplay"); 
    },3000); 
    levelUpAudio.play();
    lvlTwoShow=true;
    level=2;
    points=0;
  }    
  

  if (level===2) {
    pointMaxLevel=5;
    barre();
    speedBad=9;
    speedGood=7;
    moduloFrameBad===50;
    moduloFrameGood===100;
  }

  //level3 // change back to 5
  if (level===2 && points===1 && lvlThreeShow===false){
    document.querySelector(".levelThree").classList.remove("dontDisplay");
    document.querySelector(".logo").classList.add("dontDisplay");

    setTimeout(function(){ 
      document.querySelector(".levelThree").classList.add("dontDisplay");
      document.querySelector(".logo").classList.remove("dontDisplay"); 
    },3000); 
    levelUpAudio.play();
    lvlThreeShow=true;
    level=3;
    points=0;

  }

  if (level===3) {
    pointMaxLevel=6;
    barre();
    speedBad=12;
    speedGood=9;
    moduloFrameBad===50;
    moduloFrameGood===50;
  }

  // show skull to make 3rd level harder
  if(level===3){
    let finalSkullImg=new Image();
    finalSkullImg.src="Mexico Project/Pictures/Good ingredients/diademuertoslastlvl2.png";
    ctx.drawImage(finalSkullImg, 250,5);
  }

  //Game Over
  if (points<0) {
   stopGame=true;
   lvlThreeShow=false;
   var player = document.querySelector('#' + 'audioPlayer');
   if (player.play) {
    player.pause();
    this.textContent = 'Pause';
    }
   document.querySelector(".gameOver").classList.remove("dontDisplay");
   document.querySelector(".game-board").classList.add("dontDisplay");
   document.querySelector(".healthMeter").classList.add("dontDisplay");
   document.querySelector(".canva").classList.add("dontDisplay");
   TrumpAudio.play();
  } 

  //Win //change back to 6
  if (level===3 && points>=1) {
    stopGame=true;
    lvlThreeShow=false;
    var player = document.querySelector('#' + 'audioPlayer');
    if (player.play) {
      player.pause();
      this.textContent = 'Pause';
    }
    document.querySelector(".win").classList.remove("dontDisplay");
    document.querySelector(".game-board").classList.add("dontDisplay");
    document.querySelector(".healthMeter").classList.add("dontDisplay");
    document.querySelector(".canva").classList.add("dontDisplay");
    winAudio.play();


  } 

}
//onkey//


document.onkeydown = function (e) {
  if (!jugador) return;

  if (e.keyCode===37) {
    jugador.moveLeft();}
  
  if (e.keyCode===39) {
    jugador.moveRight();
  }
}

// animation loop

let frames = 0;
function animLoop() {
  frames++;
  draw()
  
  if (!stopGame) {
    requestAnimationFrame(animLoop);
  }
}


function startGame() {
  init()
  play('audioPlayer', this)
  jugador = new Jugador();
  points=0;
  draw();
  requestAnimationFrame(animLoop);
}

//buttons//

document.getElementById("start-button").onclick = function() {
  document.querySelector("header").classList.add("dontDisplay");
  document.querySelector(".game-board").classList.remove("dontDisplay");
  document.querySelector(".canva").classList.remove("dontDisplay");
  document.querySelector(".healthMeter").classList.remove("dontDisplay");
  document.querySelector(".scoreBottom").classList.remove("dontDisplay");
  document.querySelector(".logo").classList.remove("dontDisplay");
  startGame();
};

document.getElementById("learn-button").onclick = function() {
  document.querySelector("header").classList.add("dontDisplay");
  document.querySelector(".moreInfo").classList.remove("dontDisplay");
};

document.getElementById("start-button2").onclick = function() {
  document.querySelector(".moreInfo").classList.add("dontDisplay");
  document.querySelector(".game-board").classList.remove("dontDisplay");
  document.querySelector(".canva").classList.remove("dontDisplay");
  document.querySelector(".healthMeter").classList.remove("dontDisplay");
  document.querySelector(".scoreBottom").classList.remove("dontDisplay");
  document.querySelector(".gameOver").classList.add("dontDisplay");
  document.querySelector(".logo").classList.remove("dontDisplay");
  startGame();
  
};


document.getElementById("restart-button").onclick = function() {
  document.querySelector(".game-board").classList.remove("dontDisplay");
  document.querySelector(".canva").classList.remove("dontDisplay");
  document.querySelector(".healthMeter").classList.remove("dontDisplay");
  document.querySelector(".scoreBottom").classList.remove("dontDisplay");
  document.querySelector(".gameOver").classList.add("dontDisplay");
  document.querySelector(".logo").classList.remove("dontDisplay");
  startGame();
  
};

document.getElementById("restart-button2").onclick = function() {
  document.querySelector(".game-board").classList.remove("dontDisplay");
  document.querySelector(".canva").classList.remove("dontDisplay");
  document.querySelector(".healthMeter").classList.remove("dontDisplay");
  document.querySelector(".scoreBottom").classList.remove("dontDisplay");
  document.querySelector(".logo").classList.remove("dontDisplay");
  document.querySelector(".win").classList.add("dontDisplay");
  startGame();
  
};

//Audio
function play(idPlayer, control) {
  var player = document.querySelector('#' + idPlayer);
  var img = document. getElementById("btplaypause")
  if (player.paused) {
      player.play();
      control.textContent = 'Pause';
      img.src = "Mexico Project/Pictures/Good ingredients/soundOn.png";
  } else {
      player.pause();	
      control.textContent = 'Play';
      img.src = "Mexico Project/Pictures/Good ingredients/soundOff.png";
  }
}
