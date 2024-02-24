const button = document.querySelectorAll('.buttonBox') ;
const resetGameBtn = document.querySelector('.resetGame') ;

let turnX = true ;

let winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
] ;

const resetGame = () => {
    turnX = true ;
    enableButton();
    document.querySelector('.winner').classList.add('hide') ;
}

button.forEach((value) => {
    value.addEventListener(('click'), () => {
        if (turnX) {
            value.innerHTML = 'X' ;
            value.style.color = 'red' ;
            turnX = false ;
        } else {
            value.innerHTML = 'O' ;
            value.style.color = 'dodgerblue' ;
            turnX = true ;
        }

        value.disabled = true ;

        winner();
    })
})

const afterWin = () => {
    button.forEach((value) => {
        value.disabled = true ;
    })
}

const enableButton = () => {
    button.forEach((value) => {
        value.disabled = false ;
        value.innerHTML = '';
    })
}


const showWinner = (winName) => {
    document.querySelector('.winner').classList.remove('hide') ;
    document.querySelector('.winner').innerHTML = `<h2>WINNER = ${winName}</h2><button onclick="resetGame()">NEW GAME</button>` ;
    afterWin();
}


const winner = () => {
    let winnerFound = false ;

    winPattern.forEach((pattern) => {

        let pos1 = button[pattern[0]].innerHTML ;
        let pos2 = button[pattern[1]].innerHTML ;
        let pos3 = button[pattern[2]].innerHTML ;

        if(pos1 != '' && pos2 != '' && pos3 != '') {
            if (pos1 == pos2 && pos2 == pos3) {
                showWinner(pos1) ;
                winnerFound = true ;
            }
        } 
    })

    if (!winnerFound && [...button].every(value => value.textContent)) {
        document.querySelector('.winner').classList.remove('hide') ;
        document.querySelector('.winner').innerHTML = `<h2>-- Its A Draw --</h2><button onclick="resetGame()">New Game</button>` ;
    }

}

resetGameBtn.addEventListener(('click'), () => {
    resetGame();
});