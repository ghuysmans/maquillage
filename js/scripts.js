/*
We store our game status element here to allow us to more easily 
use it later on 
*/
const statut = document.querySelector("h2")
/*
Here we declare some variables that we will use to track the 
game state throught the game. 
*/
/*
We will use jeuActif to pause the game in case of an end scenario
*/
let jeuActif = true
/*
We will store our current player here, so we know whos turn 
*/
let joueurActif = "X"
/*
We will store our current game state here, the form of empty strings in an array
 will allow us to easily track played cells and validate the game state later on
*/
let gameState = ["", "", "", "", "", "", "", "", ""]
/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with 
current data every time we need it.
*/
const winningMessage = () => `Player ${joueurActif} has won!`
const drawMessage = () => `Game ended in a draw!`
const currentPlayerTurn = () => `It's ${joueurActif}'s turn`
/*
We set the inital message to let the players know whose turn it is
*/
statut.innerHTML = currentPlayerTurn()
/*
And finally we add our event listeners to the actual game cells, as well as our 
restart button
*/
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", handleCellClick))
document.querySelector("#recommencer").addEventListener("click", handleRestartGame)

function handleCellClick(clickedCellEvent) {
    /*
    We will save the clicked html element in a variable for easier further use
    */    
        const clickedCell = clickedCellEvent.target
    /*
    Here we will grab the 'data-index' attribute from the clicked cell to identify where that cell is in our grid. 
    Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
    integer(number)
    */
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('data-index')
        )
    /* 
    Next up we need to check whether the call has already been played, 
    or if the game is paused. If either of those is true we will simply ignore the click.
    */
        if (gameState[clickedCellIndex] !== "" || !jeuActif) {
            return
        }
    /* 
    If everything if in order we will proceed with the game flow
    */    
        handleCellPlayed(clickedCell, clickedCellIndex)
        handleResultValidation()
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        /*
        We update our internal game state to reflect the played move, 
        as well as update the user interface to reflect the played move
        */
            gameState[clickedCellIndex] = joueurActif
            clickedCell.innerHTML = joueurActif
        }

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        function handleResultValidation() {
            let roundWon = false
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i]
                let a = gameState[winCondition[0]]
                let b = gameState[winCondition[1]]
                let c = gameState[winCondition[2]]
                if (a === '' || b === '' || c === '') {
                    continue
                }
                if (a === b && b === c) {
                    roundWon = true
                    break
                }
            }
        if (roundWon) {
                statut.innerHTML = winningMessage()
                jeuActif = false
                return
            }
        }

//         const winningConditions = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6]
//         ]
        function handleResultValidation() {
            let roundWon = false
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i]
                let a = gameState[winCondition[0]]
                let b = gameState[winCondition[1]]
                let c = gameState[winCondition[2]]
                if (a === '' || b === '' || c === '') {
                    continue
                }
                if (a === b && b === c) {
                    roundWon = true
                    break
                }
            }
        if (roundWon) {
                statut.innerHTML = winningMessage()
                jeuActif = false
                return
            }
        /* 
        We will check weather there are any values in our game state array 
        that are still not populated with a player sign
        */
            let roundDraw = !gameState.includes("")
            if (roundDraw) {
                statut.innerHTML = drawMessage()
                jeuActif = false
                return
            }
        /*
        If we get to here we know that the no one won the game yet, 
        and that there are still moves to be played, so we continue by changing the current player.
        */
            handlePlayerChange()
        }
        
        function handlePlayerChange() {
            joueurActif = joueurActif === "X" ? "O" : "X"
            statut.innerHTML = currentPlayerTurn()
        }

        function handleRestartGame() {
            jeuActif = true
            joueurActif = "X"
            gameState = ["", "", "", "", "", "", "", "", ""]
            statut.innerHTML = currentPlayerTurn()
            document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
        }

