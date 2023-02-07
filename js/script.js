const guessLetters = document.querySelector('.guessed-letters');
const guessBtn = document.querySelector('.guess');
const userInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuesses = document.querySelector('.remaining');
const message = document.querySelector('.message');
const playAgainBtn = document.querySelector('.play-again');
const word = "magnolia";
const guessedLetters =[];
const lettersPlaceholder = function(word){
    let letters = word.split("");
    console.log(letters);
    wordInProgress.innerText = "●".repeat(letters.length);
    console.log(letters.join(""));
};

lettersPlaceholder(word);

guessBtn.addEventListener('click',function(e){
    e.preventDefault();
    let inputLetter = userInput.value;
    //console.log(inputLetter);
    message.innerText ="";
    validateLetters(inputLetter);
    userInput.value = "";
});

const validateLetters = function(inputLetter){
    const acceptedLetter = /[a-zA-Z]/;
    if (inputLetter ===""){
        message.innerText = `You haven't entered any letter!`
        return;
    } else if (inputLetter.length > 1){
        message.innerText = `Only 1 letter please!`
        return;
    } else if (!inputLetter.match(acceptedLetter) ){
        message.innerText = `Enter A-Z please!`
        return;
        
    }
    makeGuess(inputLetter);
    return inputLetter;
    
};
const makeGuess = function(inputLetter){
    let guessedLetter = inputLetter.toUpperCase();
    if ( guessedLetters.includes(guessedLetter) === true){
        message.innerText = `You have already entered this letter!`
        return;
    }else {
        guessedLetters.push(guessedLetter);
    } ;
    console.log(guessedLetters);
    console.log(guessedLetter);
};