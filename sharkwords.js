const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry', 'orange', 'apple', 'banana', 'pineapple', 'kiwi',
  'peach', 'pecan', 'eggplant', 'durian', 'peanut', 'chocolate'
];


let numWrong = 0;


/** Loop over the chars in `word` and create divs. */
const createDivsForChars = (word) => {
  const wordContainer = document.querySelector("#word-container");
  for (char of word){
    let letterDiv = document.createElement('div');
    letterDiv.classList.add("letter-box");
    letterDiv.setAttribute('id', char)
    wordContainer.append(letterDiv);
  }
};


/** Loop over each letter in `ALPHABET` and generate buttons. */
const generateLetterButtons = () => {
  const buttonContainer = document.querySelector("#letter-buttons");
  for (letter of ALPHABET) {
    let letterButton = document.createElement('button')
    letterButton.classList.add("letter-buttons");
    letterButton.innerHTML = letter;
    buttonContainer.append(letterButton);
  }
};


/** Set the `disabled` property of `buttonEl` to `true. */
const disableLetterButton = (buttonEl) => {
  buttonEl.attr('disabled', true)
};


/** Return `true` if `letter` is in the word. */
const isLetterInWord = (word, letter) => {
  return word.includes(letter);
};


/** Called when `letter` is in word. Update contents of divs with `letter`. */
const handleCorrectGuess = (letter) => {
  const correct = document.querySelectorAll('#' + letter);
  for (div of correct){
    div.innerHTML = letter;
  }
};


/** Called when `letter` is not in word.
 *
 * If the shark gets the person, disable all buttons and show the "play again"
 * message. Otherwise, increment `numWrong` and update the shark image.
 */
const handleWrongGuess = () => {
  numWrong += 1
  document.querySelector('img').setAttribute('src', `images/guess${numWrong}.png`)
  if (numWrong === 5){
    $('.letter-buttons').attr('disabled', true);
    $('#play-again').show();
  }
};


/** Reset game state. Called before restarting the game. */
const resetGame = () => {
  numWrong = 0
  $('#word-container').empty();
  $('#letter-buttons').empty();
  $('#play-again').hide();
  $('img').attr('src', 'images/guess0.png');
};


(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];

  createDivsForChars(word);
  generateLetterButtons();

  $('button').on('click', (evt) => {
    const clickedBtn = $(evt.target);
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();

    if (isLetterInWord(word, letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
    startGame();
  });
})();
