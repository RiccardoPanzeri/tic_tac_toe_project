




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

    function getTileList(){
        return gameboardTiles;
    }

    return {resetTiles, markTile, getTile, showTiles, getTileList};





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
        
        p2Score.textContent = `${player2.getName()} : ${player2.getScore()} `;
        p1Score.textContent = `${player1.getName()} : ${player1.getScore()} `;
        gameboard.resetTiles();
        turn = "p1";
        const markers = document.querySelectorAll(".tempImg");
        for (let element of markers){
            element.remove();
        }
        const tiles = document.querySelectorAll(".mark");
        tiles.forEach(element => element.style.backgroundColor = "rgb(20, 20, 20)");
        
           
        

        
        

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
        game.player1.modifyScore(1);
        DisplayHandler.setResultText (`${game.player1.getName()} wins!`);
        DisplayHandler.setResultBorder(game.player1.getColor());
        DisplayHandler.setRestartButtonColor(game.player1.getColor());
        resultDialog.showModal();
           
        }else if((gameboard.getTile("t0") === "p2" && gameboard.getTile("t1") === "p2" && gameboard.getTile("t2") ==="p2")||
        (gameboard.getTile("t0") === "p2" && gameboard.getTile("t3") === "p2" && gameboard.getTile("t6") ==="p2")
            ||(gameboard.getTile("t0") === "p2" && gameboard.getTile("t4") === "p2" && gameboard.getTile("t8") ==="p2")||
            (gameboard.getTile("t1") === "p2" && gameboard.getTile("t4") === "p2" && gameboard.getTile("t7") ==="p2")||
        (gameboard.getTile("t2") === "p2" && gameboard.getTile("t5") === "p2" && gameboard.getTile("t8") ==="p2") 
        || (gameboard.getTile("t2") === "p2" && gameboard.getTile("t4")=== "p2" && gameboard.getTile("t6") ==="p2")||
        (gameboard.getTile("t3") === "p2" && gameboard.getTile("t4") === "p2" && gameboard.getTile("t5") ==="p2") || 
        (gameboard.getTile("t6") === "p2" && gameboard.getTile("t7") === "p2" && gameboard.getTile("t8") ==="p2") ){
            
            game.player2.modifyScore(1);
            DisplayHandler.setResultText(`${game.player2.getName()} wins!`);
            DisplayHandler.setResultBorder(game.player2.getColor());
            DisplayHandler.setRestartButtonColor(game.player2.getColor());
            resultDialog.showModal();
            
            console.log("p2 vince");
            
        }else{
        const values = Object.values(gameboard.getTileList());
        if(!values.includes("")){
            DisplayHandler.setResultText(`It's a Draw!`);
            DisplayHandler.setResultBorder("#FFD700");
            DisplayHandler.setRestartButtonColor("#FFD700");
            resultDialog.showModal();
        }
    }

        
    }
    
    const player1 = createPlayer("player 1", "p1", "#0c66f0");
    const player2 = createPlayer("Player 2", "p2", "#fd0432"); 
    startGame();

    return{changeTurn, startGame, getCurrentTurn, checkWinner, player1, player2};


})();



//modulo gestione erendering e manipolazione DOM
const DisplayHandler = (function(){

//Ricerca elementi nel Dom:
    //elementi generici:
    const startButton = document.querySelector("#startButton");
    const gameBoardDiv = document.querySelector("#gameBoard");
    const resultDialog = document.querySelector("#resultDialog");
    const resultText = document.querySelector("#resultHeader");
    const restartButton = document.querySelector("#restartButton");
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
    game.player1.setImg("./icons/close.png");
    game.player2.setImg("./icons/rec.png");
    p2Dialog.style.borderColor = game.player2.getColor();
    p1Dialog.style.borderColor = game.player1.getColor();
    p1Score.style.borderColor = game.player1.getColor();
    p2Score.style.borderColor = game.player2.getColor();
    p1CloseButton.style.borderColor = game.player1.getColor();
    editPlayer1.style.borderColor = game.player1.getColor();
    p2CloseButton.style.borderColor = game.player2.getColor();
    editPlayer2.style.borderColor = game.player2.getColor();
    
    
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
            if(p1NameInput.value !== ""){
                game.player1.setName(p1NameInput.value);
                }
            game.player1.setColor(p1ColorInput.value);
            p1Score.textContent = `${game.player1.getName()} : ${game.player1.getScore()} `;
            p1Score.style.color = game.player1.getColor();
            p1Score.style.borderColor = game.player1.getColor();
            editPlayer1.style.borderColor = game.player1.getColor();    
             p1Dialog.close();
           
        }
    });

    p2CloseButton.addEventListener("click", (e)=>{
        e.preventDefault();
        if(!p2Form.checkValidity()){
            p2Form.reportValidity();
        }else{
            if(p2NameInput.value !== ""){
            game.player2.setName(p2NameInput.value);
            }
            game.player2.setColor(p2ColorInput.value);
            p2Score.textContent = `${game.player2.getName()} : ${game.player2.getScore()} `;
            p2Score.style.color = game.player2.getColor();
            p2Score.style.borderColor = game.player2.getColor();
            editPlayer2.style.borderColor = game.player2.getColor();
            p2Dialog.close();
           
        }
    });

    //selettore colore:
    p1ColorInput.addEventListener("input", ()=>{
        game.player1.setColor(p1ColorInput.value);
        p1Dialog.style.borderColor = game.player1.getColor();
        p1CloseButton.style.borderColor = game.player1.getColor();
        
        

    });
    p2ColorInput.addEventListener("input", ()=>{
        game.player2.setColor(p2ColorInput.value);
        p2CloseButton.style.borderColor = game.player2.getColor();
        p2Dialog.style.borderColor = game.player2.getColor();
        

    });

    //selettori marker giocatori:
    p1FormContainer.addEventListener("click", (e)=>{
        let target = e.target;
        switch(target.id){
            case "p1Mark1Img":
                document.querySelectorAll(".markImg").forEach(element =>{
                    element.style.backgroundColor = "rgb(192, 184, 184)";
    
                });
                target.style.backgroundColor = game.player1.getColor();
                game.player1.setImg("./icons/close.png");
                console.log("click");
                break;
            case "p1Mark2Img":
                document.querySelectorAll(".markImg").forEach(element =>{
                    element.style.backgroundColor = "rgb(192, 184, 184)";
    
                });
                target.style.backgroundColor = game.player1.getColor();
                game.player1.setImg("./icons/delete-cross.png");
                console.log("click");
                break;
            case  "p1Mark3Img":   
            document.querySelectorAll(".markImg").forEach(element =>{
                element.style.backgroundColor = "rgb(192, 184, 184)";

            });
            target.style.backgroundColor = game.player1.getColor();
            game.player1.setImg("./icons/bones.png");

            console.log("click");
            break;

        }
    });

    p2FormContainer.addEventListener("click", (e)=>{
        let target = e.target;
        switch(target.id){
            case "p2Mark1Img":
                document.querySelectorAll(".markImg").forEach(element =>{
                    element.style.backgroundColor = "rgb(192, 184, 184)";
    
                });
                target.style.backgroundColor = game.player2.getColor();
                game.player2.setImg("./icons/rec.png");
                console.log("click");
                break;
            case "p2Mark2Img":
                document.querySelectorAll(".markImg").forEach(element =>{
                    element.style.backgroundColor = "rgb(192, 184, 184)";
                });
                target.style.backgroundColor = game.player2.getColor();
                game.player2.setImg("./icons/star-inside-circle.png");
                console.log("click");
                break;
            case  "p2Mark3Img":   
            document.querySelectorAll(".markImg").forEach(element =>{
                element.style.backgroundColor = "rgb(192, 184, 184)";
            });
            target.style.backgroundColor = game.player2.getColor();
            game.player2.setImg("./icons/target.png");
            console.log("click");
            break;

        }
    });


    //tasto start:
    startButton.addEventListener("click", ()=>{
        game.player1.resetScore();
        game.player2.resetScore();
        game.startGame();

    });

    //gameboard:
    gameBoardDiv.addEventListener("click", (e)=>{
        let target = e.target;
        switch(target.id){
            case "t0":
                
                if(gameboard.getTile("t0") === ""){
                    gameboard.markTile("t0");
                   
                    if(checkCasella("t0") === "p2"){
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player2.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                        target.style.backgroundColor = game.player2.getColor();
                    }else if(checkCasella("t0") === "p1"){
                        
                        target.style.backgroundColor = game.player1.getColor();
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player1.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                    }
                } 
                break;
                case "t1":
                
                if(gameboard.getTile("t1") === ""){
                    gameboard.markTile("t1");
                   
                    if(checkCasella("t1") === "p2"){
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player2.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                        target.style.backgroundColor = game.player2.getColor();
                    }else if(checkCasella("t1") === "p1"){
                        
                        target.style.backgroundColor = game.player1.getColor();
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player1.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                    }
                } 
                break;
                case "t2":
                
                if(gameboard.getTile("t2") === ""){
                    gameboard.markTile("t2");
                   
                    if(checkCasella("t2") === "p2"){
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player2.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                        target.style.backgroundColor = game.player2.getColor();
                    }else if(checkCasella("t2") === "p1"){
                        
                        target.style.backgroundColor = game.player1.getColor();
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player1.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                    }
                } 
                break;
                case "t3":
                
                if(gameboard.getTile("t3") === ""){
                    gameboard.markTile("t3");
                   
                    if(checkCasella("t3") === "p2"){
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player2.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                        target.style.backgroundColor = game.player2.getColor();
                    }else if(checkCasella("t3") === "p1"){
                        
                        target.style.backgroundColor = game.player1.getColor();
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player1.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                    }
                } 
                break;
                case "t4":
                
                if(gameboard.getTile("t4") === ""){
                    gameboard.markTile("t4");
                   
                    if(checkCasella("t4") === "p2"){
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player2.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                        target.style.backgroundColor = game.player2.getColor();
                    }else if(checkCasella("t4") === "p1"){
                        
                        target.style.backgroundColor = game.player1.getColor();
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player1.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                    }
                } 
                break;
                case "t5":
                
                if(gameboard.getTile("t5") === ""){
                    gameboard.markTile("t5");
                   
                    if(checkCasella("t5") === "p2"){
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player2.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                        target.style.backgroundColor = game.player2.getColor();
                    }else if(checkCasella("t5") === "p1"){
                        
                        target.style.backgroundColor = game.player1.getColor();
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player1.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                    }
                } 
                break;
                case "t6":
                
                if(gameboard.getTile("t6") === ""){
                    gameboard.markTile("t6");
                   
                    if(checkCasella("t6") === "p2"){
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player2.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                        target.style.backgroundColor = game.player2.getColor();
                    }else if(checkCasella("t6") === "p1"){
                        
                        target.style.backgroundColor = game.player1.getColor();
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player1.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                    }
                } 
                break;
                case "t7":
                
                if(gameboard.getTile("t7") === ""){
                    gameboard.markTile("t7");
                   
                    if(checkCasella("t7") === "p2"){
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player2.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                        target.style.backgroundColor = game.player2.getColor();
                    }else if(checkCasella("t7") === "p1"){
                        
                        target.style.backgroundColor = game.player1.getColor();
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player1.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                    }
                } 
                break;
                case "t8":
                
                if(gameboard.getTile("t8") === ""){
                    gameboard.markTile("t8");
                   
                    if(checkCasella("t8") === "p2"){
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player2.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                        target.style.backgroundColor = game.player2.getColor();
                    }else if(checkCasella("t8") === "p1"){
                        
                        target.style.backgroundColor = game.player1.getColor();
                        let img = document.createElement("img");
                        img.setAttribute("src", game.player1.getImg());
                        img.classList.add("tempImg");
                        target.appendChild(img);
                    }
                } 
                break;
        }



    });


    //pulsante restart:
    restartButton.addEventListener("click", ()=>{
        resultDialog.close();
        game.startGame();
    });

   
    //metodi:

    //funzione check mark casella:
    const checkCasella = function(casella){
        if(gameboard.getTile(casella) === "p1"){
            
            
            return "p1"
            
        }else if(gameboard.getTile(casella) === "p2"){
            
            return "p2"
            
        }else{
            return null;
        }
    }
    

    //funzioni setter e getter 
    const getResultText = function(){
        return ResulText.textContent;
    }

    const setResultText = function(text){
        resultText.textContent = text;
    }

    const setResultBorder = function(color){
        resultDialog.style.borderColor = color;
    }

    const setRestartButtonColor = function(color){
        restartButton.style.borderColor = color;
    }

    return{setResultText, getResultText, setResultBorder, setRestartButtonColor};


})();