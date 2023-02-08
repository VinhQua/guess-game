let word = "";
const wordInProgress = document.querySelector('.word-in-progress');
const guessBtn = document.querySelector('.guess');
const message = document.querySelector('.message');
const userInputLetter = document.querySelector('.letter');
const guessedLetters = document.querySelector('.guessed-letters');
const remainingGuessNum = document.querySelector(".remaining-guess-num");
let guessedLettersArray = [];
const playAgainBtn = document.querySelector('.play-again');

const getRandomWord = async function(){
    const request = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await request.json();
    let randomWord = data[0];
    console.log(randomWord);
    wordPlaceHolder(randomWord);
    word = randomWord.toUpperCase();
};

//Get a random word from API
getRandomWord();
const wordPlaceHolder = function(word){
    wordInProgress.innerText = "⦿".repeat(word.length);
    let randomIndex = Math.floor(Math.random()*word.length);
    //console.log(randomIndex);
    let wordArray = word.split("");
    let updatedWordInprogress = wordInProgress.innerText;
    updatedWordInprogress = updatedWordInprogress.split("");
    updatedWordInprogress[randomIndex] = wordArray[randomIndex].toUpperCase();
    updatedWordInprogress = updatedWordInprogress.join("");
    wordInProgress.innerText = updatedWordInprogress;
    
}

guessBtn.addEventListener('click',function(e){
    e.preventDefault();
    let userInput = userInputLetter.value;
    validateUserInput(userInput)

    userInputLetter.value = "";
});

const validateUserInput = function(userInput){
    message.innerText ="";
    //console.log(userInput.length);
    const acceptLetters = /[a-zA-Z]/;
    if (userInput === ""){
        message.innerText = `Please enter a letter!`;
        return;
    }else if (userInput.length >1 ){
        message.innerText = `Ony one letter please!`;
        return;
    }else if (!userInput.match(acceptLetters) ){
        message.innerText = `Letters A-Z please!`;
        return;
    }
    showGuessedLetters(userInput);
};

const showGuessedLetters = function(userInput){
    userInput = userInput.toUpperCase();
    if (guessedLettersArray.includes(userInput)===true){
        message.innerText = `You have already entered this letter!`;
        return;
    } else if (guessedLettersArray.includes(userInput)!==true){
        guessedLettersArray.push(userInput);
        guessedLetters.innerHTML = "";
        guessedLettersArray.forEach(function(letter){
        const li = document.createElement("li");
            li.innerText = letter;
            guessedLetters.append(li);
        });
        checkForUserInput(userInput);
        
    }
};
const checkForUserInput = function(userInput){
    let wordUpper = word.toUpperCase();
    let UpperArray = wordUpper.split("");
    let updatedWordInprogress = wordInProgress.innerText;
    if (UpperArray.includes(userInput)===true){
        message.innerText = `Yeah we have letter ${userInput}!`;
        //console.log(updatedWordInprogress);
        UpperArray.forEach(function(letter,index){
            if (guessedLettersArray.includes(letter)===true){
                updatedWordInprogress = updatedWordInprogress.split("");
                updatedWordInprogress[index] = UpperArray[index];
                updatedWordInprogress = updatedWordInprogress.join("");
                wordInProgress.innerText = updatedWordInprogress;
            }
        });
        checkForWinning();
    } else {
        message.innerText = `Sorry we don't have letter ${userInput}!`;
        let num = Number(remainingGuessNum.innerText) - 1;
        remainingGuessNum.innerText = num;
        checkForWinning();
        return;
    }
};
const checkForWinning = function(){
    checkingWord = wordInProgress.innerText
    let num = Number(remainingGuessNum.innerText);
    //console.log(checkingWord);
    if (checkingWord.includes("⦿")!==true && num>0){
        message.classList.add('win');
        message.innerHTML = `<p class="message highlight">You guessed the corrected word! Congrats!</p>`;
        guessBtn.classList.add('hide');
        playAgainBtn.classList.remove('hide');
        userInputLetter.disabled = true;
    } else if (checkingWord.includes("⦿")===true && num===0){
        message.innerHTML = `<p class="message win">You Lost Man!</p>`;
        message.classList.add('highlight');
        wordInProgress.innerText = word;
        guessBtn.classList.add('hide');
        playAgainBtn.classList.remove('hide');
        userInputLetter.disabled = true;
    }
    

};

playAgainBtn.addEventListener('click',function(){
    guessBtn.classList.remove('hide');
    playAgainBtn.classList.add('hide');
    guessedLetters.innerHTML="";
    wordPlaceHolder(word);
    message.innerHTML ="";
    if (message.classList.contains('win')){message.classList.remove('win')}
    if (message.classList.contains('highlight')){message.classList.remove('highlight')}
    remainingGuessNum.innerText = 8;
    guessedLettersArray =[];
    getRandomWord();
    
    userInputLetter.disabled = false;
});
