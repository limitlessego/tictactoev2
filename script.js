

const game = () => {
  //game shared varibles
  var gameboard =    // logic gameboard 
 
  [
    "","",""
    ,"","",""
    ,"","",""
  ]
      
  let turnAi = false;
  var winnerResult = false;
  let avaliablePlaces = [];
  let noSpots = false;
  let vsPC = true;
  let currentPlayer = 0;
  

  //DOM objects
  var gameCells = document.getElementById("gameBoard");
  var resetBtn = document.getElementById("reset");
  var player1Name = document.getElementById("player1");
  var player2Name = document.getElementById("player2");
  var boardReset = document.getElementById("resetBoard");
  var table = document.getElementById("liveResults");
  var total1 = document.getElementById("totalPlayer1");
  var total2 = document.getElementById("totalPlayer2");
  var vsPCSelect = document.getElementById("AiMode");
  var playerTurn = document.getElementById("turn");

  

//game functions
  function start() {

    //set players names

    player1Name.innerHTML = players[0].name;
    player2Name.innerHTML = players[1].name;

    
    noSpots = false;                //reset noSpot status
    winnerResult = false; //reset winner status
    turnAi = false;

    for(let i = 0;i <= 8 ;i++){  // clean logic gameboard and screen
     
        gameboard[i] = "";
        document.getElementById(i).innerHTML = "";
       
      
    
    };

    
    // swap  to player1
      currentPlayer = 0;
    

    avaliablePlaces = [];  // reset the AI avaliablePlaces arry
    for (let j = 0; j <= 8; j++) { // fill AI possible moves arry
      
          avaliablePlaces.push(j);
          
    }     
    removeLines(); 
  }
  function setMarker(i){
   if(turnAi == false || vsPC == false){ //player
   
          if(gameboard[i] == "" && winnerResult == false){ //check if spot is not taken
            gameboard[i] = players[currentPlayer].marker;
            document.getElementById(i).innerHTML = players[currentPlayer].marker;

            turnAi = true;
            currentPlayer = (currentPlayer + 1) % players.length;
            avaliablePlaces.splice(avaliablePlaces.indexOf(i),1);

            let check = checkwiner();
            if( check == null && winnerResult == false){ //no winner next turn

              if(vsPC == true){
                aiMove();
                
                let check = checkwiner();
                if( check == null && winnerResult == false){
                playerTurn.innerHTML = players[currentPlayer].name + " turn!";
                }

              }else{
               playerTurn.innerHTML = "PC turn!";
              }

            }
     }
  }
} 
function aiMove() {
  
  let index = Math.floor(Math.random() * avaliablePlaces.length);
  let spot = avaliablePlaces.splice(index,1)[0];
  document.getElementById(spot).innerHTML = players[currentPlayer].marker;
  gameboard[spot] = players[currentPlayer].marker;
  turnAi = false;
  currentPlayer = (currentPlayer + 1)% players.length;
  
}
function equals3(a,b,c) {

        return a == b && b == c && a!="";
}
  function checkwiner() {
          let winner = null;
        
        //horizontal
        for(let i=0;i <= 6;i +=3){ ///i =0, i=3, i=6 
        if(equals3(gameboard[i],gameboard[i+1],gameboard[i+2])){
          winnerResult = true;
          updateScores(gameboard[i]);
          //draw line
          drawLine(i,i+1,i+2);
           return gameboard[i];
        }
        
      }
        //vertical
        for(let i =0;i <= 2;i++){ ///i =0, i=1, i=2 
          if(equals3(gameboard[i],gameboard[i+3],gameboard[i+6])){
            winnerResult = true;
            updateScores(gameboard[i]);
            //draw line
            drawLine(i,i+3,i+6);
             return gameboard[i];
          }
        }

        //diaagonal
        if(equals3(gameboard[0],gameboard[4],gameboard[8])){
          winnerResult = true;
          updateScores(gameboard[0]);
          //draw line
          drawLine(0,4,8);
          return gameboard[0];
        }
         //diaagonal2
         if(equals3(gameboard[6],gameboard[4],gameboard[2])){
         winnerResult = true;
         updateScores(gameboard[6]);
         //draw line
         drawLine(6,4,2);
         return gameboard[6];
                }

          if (winner == null && gameboard.indexOf("") == -1){ //tie
            winnerResult = true;
            updateScores("tie");
            for(let i =0;i <= 6;i+=3){
            drawLine(i,i+1,i+2);
            }
            return "tie";
        } 
        return winner;
  }
 
  function drawLine(a,b,c){
    document.getElementById(a).classList.add("winCell");
    document.getElementById(b).classList.add("winCell");
    document.getElementById(c).classList.add("winCell");
  }
  function removeLines(){
    for(let i=0;i <=8;i++){
    document.getElementById(i).classList.remove("winCell");
    }
  }

  function updateScores(winner){
  
    if(winner == "tie"){
      table.innerHTML += "<br>tie<br>";
    }else{
      if(players[0].marker == winner){
        table.innerHTML += players[0].name + " win! Marker:" + winner + "<br>";
        players[0].score += 1;
        total1.innerHTML = players[0].score;
      }else if(players[1].marker == winner){
        table.innerHTML += players[1].name + " win! Marker:" + winner + "<br>";
        players[1].score += 1;
        total2.innerHTML = players[1].score;
      }
    }
    
} 
  function player (name,marker) {
          const player = {name: name,score:0,marker:marker,ai:false}
          return player;
  } 
  function changeName(player){

      if(player == "player1"){

        var newName = prompt("Enter name: ");
        player1Name.innerHTML = newName;
        players[0].name = newName;
      }else{
        var newName = prompt("Enter name: ");
        player2Name.innerHTML = newName;
        players[1].name = newName;
      
      }
  }  
  //event listeners
    vsPCSelect.addEventListener("click",function(){   //choose vs Player or AI
      if(vsPCSelect.checked == true){
        vsPC = true;
        start();
      }else{
        vsPC = false;
        start();
        }
        
    }); 
    boardReset.addEventListener("click", function(){
        table.innerHTML = "No game has been played yet.";
        total1.innerHTML = 0;
        total2.innerHTML = 0;
    });
    player1Name.addEventListener("click", function(){
  
      changeName("player1");
    });
    player2Name.addEventListener("click", function(){
  
      changeName("player2");
    });
    resetBtn.addEventListener("click", function(){
      start();
    });
  gameCells.addEventListener("click", function(el){
      setMarker(+el.target.id);
    })

    return {player,start}
}

var Game = game();
let players = [];
players[0] = Game.player("Dawid","o");
players[1] = Game.player("Maria","x");
Game.start();

// compare with my thebook project. <-- done here I have factory functions there constructors
//https://en.wikipedia.org/wiki/Minimax <-- to be applied. 
//change gameboard to 1d. general optimalize the code
//drop canvas idea against divs + css round borders color bg
//objecl.classList.add(),object.classList.remove()
//current functions:
/*
  start()
  setMarker()
  checkWinner()
  player()
  updateScores()
  changeName()
  aiMove()

  code flow:

  event listener -> 
*/