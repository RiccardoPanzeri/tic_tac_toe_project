




//modulo Gameboard
const gameboard = (function (){
    const gameboardTiles = {
        t0:"",
        t1:"",
        t2:"",
        t3:"",
        t4:"",
        t5:"",
        t6:"",
        t7:"",
        t8:""
    };
    
    function resetTiles(){
        for(let element in gameboardTiles){
            gameboardTiles[element] = "";
        }
    }
    
    function markTile(tileNumber){
        if(gameboardTiles[tileNumber] === ""){
        gameboardTiles[tileNumber] = game.getCurrentTurn();
        game.changeTurn();
        console.log(`cambio turno: ${game.getCurrentTurn()}`);
        game.checkWinner();
        }else{
            console.log("casella occupata");
        }
       
    }

    function getTile(name){
        return gameboardTiles[name];
    }

    function showTiles(){
        console.table(gameboardTiles);
    }

    return {resetTiles, markTile, getTile, showTiles};





})();


//modulo per la gestione della logica di gioco
const game = (function (){
    let turn;
    let gameOver = false;
    //factory function per la creazione dei giocatori
    function createPlayer(name, mark){
        let score = 0;
        

        const getName = function(){
            return name;
        }
        const setName = function(newName){
            name = newName;
        }
        const getMark = function (){
            return mark;
        }
        const setMark = function(newMark){
            mark = newMark;
        }

        const modifyScore = function(points){
            score += points;
        }
        const resetScore = function(){
            score = 0;
        }
        const getScore = function(){
            return score;
        }


        return {getName, setName, setMark, getMark, modifyScore, resetScore, getScore};
    }

    //funzione che avvia la partita
    const startGame = function(){
        console.log("Start");
        gameOver = false;
        gameboard.resetTiles();
        turn = "p1";
        
           
        

        
        

    }

    //funzione per il cambioTurno
    const changeTurn = function(){
        if(turn === "p2"){
            turn = "p1";
            console.log(`turno ${turn}`);
        }else if(turn === "p1"){
            turn = "p2";
            console.log(`turno ${turn}`)
        }
    }

    const getCurrentTurn = function(){
        return turn;
    }


    //funzione che effettua il check per verificare se c'è un vincitore:
    const checkWinner = function(){
        if((gameboard.getTile("t0") === "p1" && gameboard.getTile("t1") === "p1" && gameboard.getTile("t2") ==="p1")||
        (gameboard.getTile("t0") === "p1" && gameboard.getTile("t3") === "p1" && gameboard.getTile("t6") ==="p1")
            ||(gameboard.getTile("t0") === "p1" && gameboard.getTile("t4") === "p1" && gameboard.getTile("t8") ==="p1")||
            (gameboard.getTile("t1") === "p1" && gameboard.getTile("t4") === "p1" && gameboard.getTile("t7") ==="p1")||
        (gameboard.getTile("t2") === "p1" && gameboard.getTile("t5") === "p1" && gameboard.getTile("t8") ==="p1") 
        || (gameboard.getTile("t2") === "p1" && gameboard.getTile("t4")=== "p1" && gameboard.getTile("t6") ==="p1")||
        (gameboard.getTile("t3") === "p1" && gameboard.getTile("t4") === "p1" && gameboard.getTile("t5") ==="p1") || 
        (gameboard.getTile("t6") === "p1" && gameboard.getTile("t7") === "p1" && gameboard.getTile("t8") ==="p1") ){
            gameOver = true;
            console.log("p1 vince");
           
        }
        if((gameboard.getTile("t0") === "p2" && gameboard.getTile("t1") === "p2" && gameboard.getTile("t2") ==="p2")||
        (gameboard.getTile("t0") === "p2" && gameboard.getTile("t3") === "p2" && gameboard.getTile("t6") ==="p2")
            ||(gameboard.getTile("t0") === "p2" && gameboard.getTile("t4") === "p2" && gameboard.getTile("t8") ==="p2")||
            (gameboard.getTile("t1") === "p2" && gameboard.getTile("t4") === "p2" && gameboard.getTile("t7") ==="p2")||
        (gameboard.getTile("t2") === "p2" && gameboard.getTile("t5") === "p2" && gameboard.getTile("t8") ==="p2") 
        || (gameboard.getTile("t2") === "p2" && gameboard.getTile("t4")=== "p2" && gameboard.getTile("t6") ==="p2")||
        (gameboard.getTile("t3") === "p2" && gameboard.getTile("t4") === "p2" && gameboard.getTile("t5") ==="p2") || 
        (gameboard.getTile("t6") === "p2" && gameboard.getTile("t7") === "p2" && gameboard.getTile("t8") ==="p2") ){
            gameOver = true;
            console.log("p2 vince");
            
        }

        if(gameOver){
            startGame();
        }
    }
    
    const player1 = createPlayer("player1", "p1");
    const player2= createPlayer("Player2", "p2"); 
    startGame();

    return{changeTurn, startGame, getCurrentTurn, checkWinner, player1, player2};


})();



//modulo gestione erendering e manipolazione DOM
const DisplayHandler = (function(){








})();