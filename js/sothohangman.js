var sotho_language = [ //arrays
    "hae",
    "hore",
    "bakeng sa",
    "chesang",
    "empa",
    "eng",
    "kapa",
    "tsoa",
    "nako",
    "haeba",
    "joang",
    "bolella",
    "etsang",
    "sete",
    "batla"
]

var guesshints = [
    "used to refer to a thing or things belonging to or associated with a person or animal previously mentioned.",
    "referring to a specific thing previously mentioned, known, or understood.",
    "used as a function word to indicate an intended goal",
    "having a relatively high temperature",
    "except for the fact",
    "used as an interrogative expressing inquiry about the identity, nature, or value of an object or matter",
    "used as a function word to indicate an alternative",
    "in a direction away from the inside or center",
    "the measured or measurable period during which an action, process, or condition exists or continues",
    " in the event that",
    "in what manner or way",
    "to relate in detail",
    "perform (an action, the precise nature of which is often unspecified).",
    "to place (oneself) in position to start running in a race",
    "to have or feel need"
]
var Translation = [
    "his",
    "that",
    "for",
    "hot",
    "but",
    "what",
    "or",
    "time",
    "if",
    "how",
    "tell",
    "do",
    "set",
    "want"
]

//var categories;
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;




function generateButtons() { //generating keyboard
    let buttonsHTML = 'qwertyuiopasdfghjklzxcvbnm'.split('').map(letter =>
        `
    <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
        >
        ` + letter + `
        </button>
    `).join(''); //making space between keyboard

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}
function CreateRandom() {
    answer = sotho_language[Math.floor(Math.random() * sotho_language.length)]; //making words random
}

function handleGuess(chosenLetter) { //making sure letter is disabled once typed
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) { //if letter does exist
        guessedWord();
        checkGame();
    } else if (answer.indexOf(chosenLetter) === -1) { //if letter doesnt exist
        mistakes++;
        updateMistakes();
        checkGame(); //make both if game won
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkGame() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'O HLOTSE!!!';
    } else if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'Karabo e bile: ' + answer; //game lost answer
        document.getElementById('keyboard').innerHTML = 'TAHLEHILE!!!';
    }
}


function updateMistakes() { //updating the mistake count
    document.getElementById('mistakes').innerHTML = mistakes;
}

function guessedWord() { //line thingy to guess words
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_")).join('');
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function Hint() {

    var hintIndex = sotho_language.indexOf(answer);
    document.getElementById("clue").innerHTML = 'Clue: ' + guesshints[hintIndex];

}

function Translate() {
    if (mistakes >= 3) {
        var TransINdex = sotho_language.indexOf(answer);
        document.getElementById("translate").innerHTML = "Translation: " + Translation[TransINdex];
    } else {
        alert("You first have to get 3 mistakes in order to get a translation");
    }

}

function reset() { //reset button shandis
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';
    document.getElementById("translate").innerHTML = "";
    document.getElementById("clue").innerHTML = "";

    CreateRandom();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong; //display max chances you have

CreateRandom();
generateButtons();
guessedWord();
//play();
//selectCat();