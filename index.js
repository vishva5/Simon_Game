var audio1 = new Audio();
var audio2 = new Audio();
var audio3 = new Audio();
var audio4 = new Audio();

const maxcount = document.querySelector('#count');

window.addEventListener('load', ()=>{
  audio1.src = "sound/simonSound1.mp3";
  audio1.preload = "auto";
  audio2.src = "sound/simonSound2.mp3";
  audio2.preload = "auto";
  audio3.src = "sound/simonSound3.mp3";
  audio3.preload = "auto";
  audio4.src = "sound/simonSound4.mp3";
  audio4.preload = "auto";
});




let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;

  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }

  compTurn = true;


  intervalId = setInterval(gameTurn, 800);
}


function gameTurn(){
   on = false;
  if(flash === turn){
      clearInterval(intervalId);
      compTurn = false;
      clearColor();
      on = true;
  }

  if(compTurn){
    clearColor();
    setTimeout(()=>{
          if(order[flash] == 1) one();
          if(order[flash] == 2) two();
          if(order[flash] == 3) three();
          if(order[flash] == 4) four();
          flash++;
    },200);
  }


}

function one(){
  if(noise){
    audio1.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "#00FF00";
}

function two(){
  if(noise){
    audio2.play();
  }
  noise = true;
  topRight.style.backgroundColor = "#EA2C62";
}

function three(){
  if(noise){
    audio3.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "#FFF600";
}

function four(){
  if(noise){
    audio4.play();
    noise = true;
    bottomRight.style.backgroundColor = "#04009A";
  }
}

function clearColor(){
  topLeft.style.backgroundColor = "#ACFFAD";
  topRight.style.backgroundColor = "#FF9A8C";
  bottomLeft.style.backgroundColor = "#FFF5B7";
  bottomRight.style.backgroundColor = "#B5EAEA";
}

function flashColor(){
  topLeft.style.backgroundColor = "#00FF00";
  topRight.style.backgroundColor = "#EA2C62";
  bottomLeft.style.backgroundColor = "#FFF600";
  bottomRight.style.backgroundColor = "#04009A";
}


topLeft.addEventListener('click',(event)=>{
  if(on){
    playerOrder.push(1);
    check();
    one();
    if(!win){
      setTimeout(()=>{
        clearColor();
      }, 300)
    }
  }
});


topRight.addEventListener('click',(event)=>{
  if(on){
    playerOrder.push(2);
    check();
    two();
    if(!win){
      setTimeout(()=>{
        clearColor();
      }, 300)
    }
  }
});


bottomLeft.addEventListener('click',(event)=>{
  if(on){
    playerOrder.push(3);
    check();
    three();
    if(!win){
      setTimeout(()=>{
        clearColor();
      }, 300)
    }
  }
});


bottomRight.addEventListener('click',(event)=>{
  if(on){
    playerOrder.push(4);
    check();
    four();
    if(!win){
      setTimeout(()=>{
        clearColor();
      }, 300)
    }
  }
});


function check(){
   if(playerOrder[playerOrder.length-1]!==order[playerOrder.length-1])
   good =  false;

   if(playerOrder.length == maxcount.value && good ){
     wingame();
   }

   if(good==false){
     flashColor();
     turnCounter.innerHTML = "NO!";
     setTimeout(()=>{
        turnCounter.innerHTML = turn;
        clearColor();

        if(strict){
           play();
        }else{
           compTurn = true;
           flash = 0;
           playerOrder = [];
           good = true;
           intervalId = setInterval(gameTurn, 800);
        }
     }, 800);
     noise = false;
   }

   if(turn==playerOrder.length&&good&&!win){
       turn++;
       playerOrder = [];
       compTurn -= true;
       flash = 0;
       turnCounter.innerHTML = turn;
       intervalId = setInterval(gameTurn, 800);
   }

}

function wingame(){
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on  = false;
  win  = true;
}
