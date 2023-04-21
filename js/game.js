const playRound = document.querySelector(".play-round");
const playerScoreEl = document.querySelector(".player-score");
const botScoreEl = document.querySelector(".bot-score");
const resultEl = document.querySelector(".result");

let playerScore = 0;
let botScore = 0;

const rollDie = () => {
    return Math.floor(Math.random() * 6) + 1;
};

const resetGame = () => {
    playerScore = 0;
    botScore = 0;

    playerScoreEl.innerHTML = playerScore;
    botScoreEl.innerHTML = botScore;
    document.querySelector(".player-die").style.backgroundImage = "";
    document.querySelector(".bot-die").style.backgroundImage = "";
};

playRound.onclick = () => {
    const playerRoll = rollDie();
    const botRoll = rollDie();

    document.querySelector(".player-die").style.backgroundImage = "url('img/dice-" + playerRoll + ".png')";
    document.querySelector(".bot-die").style.backgroundImage = "url('img/dice-" + botRoll + ".png')";

    let resultText = '';

    if (playerRoll > botRoll) {
        playerScore++;
        resultText = `<h2>Вы выиграли этот Раунд!</h2><h3>Вы кинули ${playerRoll} Бот кинул ${botRoll}</h3>`;
    } else if (botRoll > playerRoll) {
        botScore++;
        resultText = `<h2>Бот выиграл этот Раунд!</h2><h3>Вы кинули ${playerRoll} Бот кинул ${botRoll}</h3>`;
    } else {
        resultText = `<h2>Этот Раунд закончился вничью.</h2><h3>Вы кинули ${playerRoll} Бот кинул ${botRoll}</h3>`;
    }

    if (playerScore == 3) {
        resultEl.innerHTML = `<h2>Вы Выиграли эту игру 🥳 </h2></br><h2>Cо счётом</h><h1>${playerScore} : ${botScore}</h1>`;
        resetGame();
    } else if (botScore == 3) {
        resultEl.innerHTML = `<h2>Вы Проиграли эту игру 🥺 </h2></br><h2>Cо счётом</h2><h1>${playerScore} : ${botScore}</h1>`;
        resetGame();
    } else {
        resultEl.innerHTML = resultText;
        playerScoreEl.innerHTML = playerScore;
        botScoreEl.innerHTML = botScore;
    }
};