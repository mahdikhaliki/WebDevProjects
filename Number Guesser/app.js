// Game vars
let min = 1,
    max = 10,
    numGuesses = 3,
    guessesLeft = 3,
    winningNum = getRandomNum(min, max);

// UI elements
const game = document.querySelector('#game'),
      minText = document.querySelector('.min-num'),
      maxText = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minText.textContent = min;
maxText.textContent = max;

game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

guessBtn.addEventListener('click', function(e){
  const guess = parseInt(guessInput.value);

  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'green');
  }
  else if(guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  }
  else {
    guessesLeft--;

    if(guessesLeft === 0) {
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    }
    else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';

      setMessage(`${guess} is incorrect, ${guessesLeft} guesses left`, 'red');
    }
  }

  e.preventDefault();
});

function gameOver(won, msg) {
  let color = won ? 'green' : 'red';

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  guessInput.value.color = color;
  setMessage(msg, color);

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
