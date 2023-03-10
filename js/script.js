// unordered list where the player's guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");
// Guess! button 
const guessButton = document.querySelector(".guess");
// Text input where player will guess the letter
const letterInput = document.querySelector(".letter");
// Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
// Span inside the paragraph where the remanining guesses will display
const remainingGuessesSpan = document.querySelector("span");
// Empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// Hidden button that will appear prompting the player to play again
const playAgain = document.querySelector(".play-again");

// Word the player needs to guess
let word = "magnolia"; // starter word
// Array that shows the letters the player has guessed 
let guessedLettersArray = [];

let remainingGuesses = 8;


const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    // console.log(data);
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    console.log(word);
    placeholder(word);
};

getWord();

// Show a "●" to represet each letter of the word the player has to guess
const placeholder = function (word) {
    const placeholderLetters = [];

    for (let letter of word) {
        // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

// placeholder(word);

// Takes the letter the player inputs everytime they press the "guess" button
// and cleans the input value so user can input a new letter
guessButton.addEventListener("click", function(e) {
    e.preventDefault(); // Stops the page from loading after the user presses the guess button 
    message.innerText = ""; // Cleans out the message 

    const letterGuess = letterInput.value;
    console.log(letterGuess); 
    letterInput.value = "";
    
    const messageOutput = validateInput(letterGuess);

    if (messageOutput) {
        return makeGuess(letterGuess);
    }
    letterInput.value = "";
});
 
// Checks the user's input and validates it
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        // Is the input empty?
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        // Did the user input more than one letter?
        message.innerText = "Please enter only one letter at a time";
    } else if (!input.match(acceptedLetter)) {
        // Did the user enter a character that is not a letter
        message.innerText = "Please enter a letter from A to Z";
    } else {
        // The input is a single letter
        return input
    }
};


// Capitalizes the letter input, and checks if the user has input this letter yet or not
const makeGuess = function(letterGuess) {
    letterGuess = letterGuess.toUpperCase();
   
    if (guessedLettersArray.includes(letterGuess)) {
        message.innerHTML = "You already guessed that letter, silly. Try again!"
    } else {
        guessedLettersArray.push(letterGuess);
        console.log(guessedLettersArray);
        countRemaningGuesses(letterGuess);
        showGuessedLetters();
        updateWordInProgress(guessedLettersArray);
    }
};

// Shows the guessed letters
const showGuessedLetters = function () {
    // cleans out the list first
    guessedLettersList.innerHTML = "";

    for (const letter of guessedLettersArray) {
    const newLetter = document.createElement("li");
    newLetter.innerText = letter;
    guessedLettersList.append(newLetter);
    }
};

// Updates the word in progress
const updateWordInProgress = function(guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLettersArray.includes(letter)) {
        revealWord.push(letter.toUpperCase());     
        } else {
            revealWord.push("●")
        }
    };
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

// Check if the player won the game
const checkIfWin = function() {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrat!</p>`
    
    startOver();
    };
};

// Count guesses remaning
const countRemaningGuesses = function(letterGuess) {
    const upperWord = word.toUpperCase();
   
    if (!upperWord.includes(letterGuess)) {
        message.innerText = `Sorry, the word has no ${letterGuess}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${letterGuess}`;
    };

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${upperWord}</span>`;
        startOver();
        // remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    };
};

// Displays the play again button once the game is over
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgain.classList.remove("hide");
}

// Resets the game
playAgain.addEventListener("click", function() {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersList.innerHTML = "";
    guessedLettersArray = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} remaining`;
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
});