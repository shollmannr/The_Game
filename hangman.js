// The word bank/answers.
var programming_languages = [
	"python",
	"javascript",
	"java",
  "c",
  "go",
  "r",
  "swift",
  "php",
  "html",
  "kotlin",
  "css"
]
// Sets the max mistakes to 6, which is how many images I have.
let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
// Selects a word randomly from the programming languages array
function randomWord() {
  answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}
// Generates the buttons/letters to click on to guess the answer.
function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz".split("").map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join("");

  document.getElementById("keyboard").innerHTML = buttonsHTML;
}
// Function that pushes the selected letter through.
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute("disabled", true);
// Checks whether the choosen letter is correct or incorect.
  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}
// Function that checks for incorrect answers and corrasponds with the images.
function updateHangmanPicture() {
  document.getElementById("hangmanPic").src = "./images/" + mistakes + ".png";
}
// Function that checks if the game is won.
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById("keyboard").innerHTML = "You Won!";
  }
}
// Function that checks if the game is lost.
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById("wordSpotlight").innerHTML = "The answer was: " + answer;
    document.getElementById("keyboard").innerHTML = "You Lost!";
  }
}

function guessedWord() {
  wordStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");

  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}
// Function for mistakes/incorrect letters
function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}
// This is the reset button. To restart the game once it's won or loss.
function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById("hangmanPic").src = "./images/0.jpg";

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById("maxWrong").innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
  