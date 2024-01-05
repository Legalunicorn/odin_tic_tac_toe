const gameBoard = (()=>{

    let board = ['','','','','','','','',''];
    const setBox = (sign,index) =>{
        board[index] = sign;
    }

    const resetBoard = () =>{
         //clear data
         for (let i=0;i<board.length;i++){
            board[i] = '';
         }
    }
    const updateBoard = () =>{
        //update the DOM, not needed for console game i guess ?
    }
    //for testing
    const displayBoard = () =>{
        console.log('DISPLAYING BOARD');
        console.log(board[0],board[1],board[2]);
        console.log(board[3],board[4],board[5]);
        console.log(board[6],board[7],board[8]);
    }
    return {board,setBox,resetBoard,updateBoard,displayBoard}
    
})();

const player = (sign,icon_name) =>{
    const getSign = ()=> {
        return sign;
    }

    const iconURL = `assets/${icon_name}.svg`;

    return {getSign,iconURL};
}

const displayController = (()=>{
    const gameBoxes = document.querySelectorAll('.playable_box'),
          clearBtn = document.querySelector('.controls button');

    clearBtn.addEventListener('click',()=>{
        gameBoard.resetBoard(); //reset board data

        //reset dom data as well
        gameBoxes.forEach((box)=>{
            box.innerHTML = '';
            box.dataset.state = '';

        })

        // reset the game data
        gameController.resetGame();

    })

    gameBoxes.forEach((box)=>{
        box.addEventListener('click',(e)=>{
            let boxState = e.target.dataset.state;
            console.log(boxState,"huh",e.target.dataset.id)

            if (boxState=="x" || boxState=="o" || gameController.isOver){
                console.log('nah uh')
                return;
            }
            else {
                console.log('yay')
                let boxId = e.target.dataset.id;
                gameController.playRound(boxId);

            }

        })
    })

})();

const gameController = (()=>{
    /*
    Holds game data, whose turn.. players.. play rounds etc
    */
    let player1 = player('x','cross');
    let player2 = player('o','circle');
    let round=0;
    let currentPlayer,gameStatus,isOver;

    

    const playRound = (boxId) =>{
        if (isOver){return};
        //maybe add the stopping logic here instead?

        //end of stopping logic

        if (round%2==0){
            currentPlayer = player1;
        }
        else {
            currentPlayer = player2;
        }
        let icon = document.createElement('img');
        icon.classList.add('move_svg');
        icon.src = currentPlayer.iconURL;

        //get the box and add the icon lmao

        let box = document.querySelector(`[data-id="${boxId}"]`);
        box.appendChild(icon);
        box.dataset.state=currentPlayer.getSign();

        gameBoard.setBox(currentPlayer.getSign(),boxId);
        round++;

        updateStatus();
        if (isOver){
            showResults();
        }
    }

    const resetGame = () =>{
        document.querySelector('.results h1').innerHTML =' ';
        round = 0;
        isOver=false;
        gameStatus='';

    }

    const updateStatus = () =>{

        const winCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        //check 
        const allX = (item) => gameBoard.board[item]=='x';
        const allO = (item) => gameBoard.board[item]=='o';

        winCombinations.forEach((combi)=>{

            if (combi.every(allX)){
                gameStatus='x';
                isOver=true;
                console.log('hey')
            }
            else if (combi.every(allO)){
                gameStatus ='o';
                isOver=true;
            }
        })
        if (round==9 && gameStatus==''){
            gameStatus = 'tie';
            isOver=true;
            return;
        }

    }

    const showResults = () =>{
        let results = document.querySelector('.results h1');
        let text;
        if (gameStatus =='x'){
            text ='Player X has won!'
        }
        else if (gameStatus =='o'){
            text = 'Player O has won!'
        }
        else if (gameStatus=='tie'){
            text = 'TIE!'
        }
        results.innerHTML=text;
    }

    return {isOver,playRound,currentPlayer,resetGame,updateStatus,gameStatus}
})();

;

