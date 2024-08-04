




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
    function createPlayer(name, mark, color, markerImg){
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

        const setColor = function(newColor){
            color = newColor;
        }

        const getColor = function(){
            return color;
        }

        const setImg = function(newImg){
            markerImg = newImg;
        }

        const getImg = function(){
            return markerImg;
        }



        return {getName, setName, setMark, getMark, modifyScore, resetScore, getScore, getColor,
             setColor, setImg, getImg};
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
    
    const player1 = createPlayer("player1", "p1", "#0c66f0");
    const player2 = createPlayer("Player2", "p2", "#fd0432"); 
    startGame();

    return{changeTurn, startGame, getCurrentTurn, checkWinner, player1, player2};


})();



//modulo gestione erendering e manipolazione DOM
const DisplayHandler = (function(){

//Ricerca elementi nel Dom:
    //elementi generici:
    const startButton = document.querySelector("#startButton");
    const gameBoardDiv = document.querySelector("#gameBoard");
    //elementi player1
    const editPlayer1 = document.querySelector("#p1Button");
    const p1Dialog = document.querySelector("#p1Dialog");
    const p1CloseButton = document.querySelector("#p1CloseButton");
    const p1Form = document.querySelector("#p1Form")
    const p1NameInput = document.querySelector("#player1NameInput");
    const p1ColorInput = document.querySelector("#p1ColorInput");
    const p1Score = document.querySelector("#p1Score")
    const p1FormContainer = document.querySelector("#p1FormContainer");
    //elementi player2
    const p2CloseButton = document.querySelector("#p2CloseButton");
    const p2Dialog = document.querySelector("#p2Dialog");
    const editPlayer2 = document.querySelector("#p2Button");
    const p2Score = document.querySelector("#p2Score");
    const p2NameInput = document.querySelector("#player2NameInput");
    const p2ColorInput = document.querySelector("#p2ColorInput");
    const p2Form = document.querySelector("#p2Form");
    const p2FormContainer = document.querySelector("#p2FormContainer");
    
    //settaggi iniziali:
    p1Score.style.color =game.player1.getColor();
    p2Score.style.color =game.player2.getColor();
    game.player1.setMark("url(./icons/close.png)");
    game.player2.setMark("url(./icons/rec.png)")
    
    
    //eventListeners
    
    //finestre modali:
    editPlayer1.addEventListener("click", () => p1Dialog.showModal());
    editPlayer2.addEventListener("click", ()=> p2Dialog.showModal());
    //close buttons:
    p1CloseButton.addEventListener("click", (e)=>{
        e.preventDefault();
        if(!p1Form.checkValidity()){
            p1Form.reportValidity();
        }else{
            game.player1.setName(p1NameInput.value);
            game.player1.setColor(p1ColorInput.value);
            p1Score.textContent = `${game.player1.getName()}: ${game.player1.getScore()} `;
            p1Score.style.color = game.player1.getColor();

            p1Dialog.close();
           
        }
    });

    p2CloseButton.addEventListener("click", (e)=>{
        e.preventDefault();
        if(!p2Form.checkValidity()){
            p2Form.reportValidity();
        }else{
            game.player2.setName(p2NameInput.value);
            game.player2.setColor(p2ColorInput.value);
            p2Score.textContent = `${game.player2.getName()}: ${game.player2.getScore()} `;
            p2Score.style.color = game.player2.getColor();

            p2Dialog.close();
           
        }
    });

    //selettore colore:
    p1ColorInput.addEventListener("input", ()=>{
        game.player1.setColor(p1ColorInput.value);
        console.log(`cambioColore ${game.player1.getColor()}`);

    });
    p2ColorInput.addEventListener("input", ()=>{
        game.player2.setColor(p2ColorInput.value);
        console.log(`cambioColore ${game.player2.getColor()}`);

    });

    //selettori marker giocatori:
    p1FormContainer.addEventListener("click", (e)=>{
        let target = e.target;
        switch(target.id){
            case "p1Mark1Img":
                document.querySelectorAll(".markImg").forEach(element =>{
                    element.style.backgroundColor = "#ffffff";
                });
                target.style.backgroundColor = game.player1.getColor();
                console.log("click");
                break;
            case "p1Mark2Img":
                document.querySelectorAll(".markImg").forEach(element =>{
                    element.style.backgroundColor = "#ffffff";
                });
                target.style.backgroundColor = game.player1.getColor();
                console.log("click");
                break;
            case  "p1Mark3Img":   
            document.querySelectorAll(".markImg").forEach(element =>{
                element.style.backgroundColor = "#ffffff";
            });
            target.style.backgroundColor = game.player1.getColor();
            console.log("click");
            break;

        }
    });

    p2FormContainer.addEventListener("click", (e)=>{
        let target = e.target;
        switch(target.id){
            case "p2Mark1Img":
                document.querySelectorAll(".markImg").forEach(element =>{
                    element.style.backgroundColor = "#ffffff";
                });
                target.style.backgroundColor = game.player2.getColor();
                console.log("click");
                break;
            case "p2Mark2Img":
                document.querySelectorAll(".markImg").forEach(element =>{
                    element.style.backgroundColor = "#ffffff";
                });
                target.style.backgroundColor = game.player2.getColor();
                console.log("click");
                break;
            case  "p2Mark3Img":   
            document.querySelectorAll(".markImg").forEach(element =>{
                element.style.backgroundColor = "#ffffff";
            });
            target.style.backgroundColor = game.player2.getColor();
            console.log("click");
            break;

        }
    });







})();