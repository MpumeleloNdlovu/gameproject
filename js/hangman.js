var english_language = [ //arrays
    "set",
    "mouth",
    "lead",
    "radical",
    "copyright",
    "licence",
    "contempt",
    "lion",
    "variable",
    "question",
    "pest",
    "swipe",
    "technique",
    "spontaneous",
    "fat"
]
var guesshint = [
    "where actors go",
    "where food goes",
    "When you are number 1 in a race",
    "relating to or affecting the fundamental nature of something",
    "the exclusive and assignable legal right, given to the originator for a fixed number of years, to print, publish, perform, film, or record literary, artistic, or musical material.",
    "The card you get to confirm that you can drive",
    "the feeling that a person or a thing is worthless or beneath consideration.",
    "A cat that is one of the big 5",
    "not consistent or having a fixed pattern; liable to change.",
    "a sentence worded or expressed so as to elicit information.",
    "a destructive insect or other animal that attacks crops, food, livestock, etc.",
    "hit or try to hit with a swinging blow.",
    "a way of carrying out a particular task, especially the execution or performance of an artistic work or a scientific procedure.",
    "performed or occurring as a result of a sudden impulse or inclination and without premeditation or external stimulus.",
    "a natural oily substance occurring in animal bodies, especially when deposited as a layer under the skin or around certain organs."

];


//var categories;
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;


//var showCategory = document.getElementById("ShowCategory")

//var selectCat = function() {

//if (ChosenCategory === categories[0]) {
// CategoryName.innerHTML = "The chosen language is English";
//} else if (chosenCategory === categories[1]) {
//CategoryName.innerHTML = "The chosen Language is Zulu";
//} else if (chosenCategory === categories[2]) {
// CategoryName.innerHTML = "The chosen language is Sotho"
// }

//}

//function play() {
//categories = ["set", "mouth", "lead", "radical", "copyright", "licence", "contempt", "lion", "variable", "question", "pest", "swipe", "technique", "spontaneous", "fat"], ["njengoba", "wakhe", "ukuthi", "yena", "kwaba", "ngoba", "kukhona", "bona", "kube", "eyodwa", "kusuka", "esishisayo", " igama", "lokho"], ["hae", "hore", "bakeng sa", "chesang", "empa", "kapa", "tsoa", "etsa", "nako", "haeba", "tla", "joang", "bolella", "etsang", "sete"];
//}



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
    //answer = chosenCategory[Math.floor(Math.random() * chosenCategory.length)]
    answer = english_language[Math.floor(Math.random() * english_language.length)]; //making words random
    //chosenCategory = categories[Math.floor(Math.random() * chosenCategory.length)];
    //answer = chosenCategory[Math.floor(Math.random() * chosenCategory.length)]
}


function handleGuess(chosenLetter) { //making sure letter is disabled once typed
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) { //if letter does exist
        guessedWord();
        CheckGame();
    } else if (answer.indexOf(chosenLetter) === -1) { //if letter doesnt exist
        mistakes++;
        updateMistakes();
        CheckGame(); //make both if game won
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function CheckGame() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'YOU WIN!!!';
    } else if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was:' + answer; //game lost answer
        document.getElementById('keyboard').innerHTML = 'YOU Lost!!!';
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
    // var getHint = document.getElementById("hint");
    // var showClue = document.getElementbyId("clue");

    var hintIndex = english_language.indexOf(answer);
    //alert(hintIndex)
    document.getElementById("clue").innerHTML = 'Clue- ' + guesshint[hintIndex];
    //alert(hintIndex)

}

function reset() { //reset button shandis
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';
    document.getElementById("clue").innerHTML = ''
    CreateRandom();
    guessedWord();
    updateMistakes();
    generateButtons();

}

document.getElementById('maxWrong').innerHTML = maxWrong; //display max chances you have

CreateRandom();
generateButtons();
guessedWord();
//Hint();
//selectCat();