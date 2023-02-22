// unordered list where the player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
// Guess! button 
const guessButton = document.querySelector(".guess");
// Text input where player will guess the letter
const letterInput = document.querySelector(".letter");
// Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining span");
// Span inside the paragraph where the remanining guesses will display
const remainingGuessesSpan = document.querySelector("span");
// Empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// Hidden button that will appear prompting the player to play again
const playAgain = document.querySelector(".play-again");
// Word the player needs to guess

const word = "magnolia"; // starter word


// Show a "●" to represet each letter of the word the player has to guess
const placeholder = function (word) {
    const placeholderLetters = [];

    for (let letter of word) {
        // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const getInput = letterInput.value;
    console.log(getInput); 
    letterInput.value = "";
});

