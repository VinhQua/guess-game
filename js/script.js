const guessLetters = document.querySelector('.guessed-letters');
const guessBtn = document.querySelector('.guess');
const userInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuesses = document.querySelector('.remaining');
const message = document.querySelector('.message');
const playAgainBtn = document.querySelector('.play-again');
const word = "magnolia";

const lettersPlaceholder = function(word){
    let letters = word.split("");
    console.log(letters);
    wordInProgress.innerText = "●".repeat(letters.length);
    console.log(letters.join(""));
};

lettersPlaceholder(word);

guessBtn.addEventListener('click',function(e){
    e.preventDefault();
    inputLetter = userInput.value;
    console.log(inputLetter);
});