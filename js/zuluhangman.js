var zulu_language = [ //arrays
    "njengoba",
    "wakhe",
    "ukuthi",
    "yena",
    "kwaba",
    "ngoba",
    "kukhona",
    "bona",
    "kube",
    "eyodwa",
    "kusuka",
    "esishisayo",
    "igama",
    "lokho",
    "kwezinye"
]
var guesshints = [
    "used in comparisons to refer to the extent or degree of something.",
    "belonging to or associated with a person or animal previously mentioned or easily identified.",
    "referring to a specific thing previously mentioned, known, or understood.",
    "referring to a person",
    "past tense first- and third-person singular of be.",
    "conjuction, for the reason that; since.",
    "Saying that the thing is there",
    "used to refer to two or more people or things previously mentioned or easily identified.",
    "possibility that; no matter whether.",
    "A single thing",
    "indicating the point in space at which a journey, motion, or action starts",
    "indicating that an object is hot",
    "a word or set of words by which a person or thing is known, addressed, or referred to.",
    "referring to a specific thing previously mentioned, known, or understood.",
    "an unspecified number or amount of people or things."
]
var Translation = [
        "as",
        "his",
        "that",
        "he",
        "was",
        "for",
        "are",
        "they",
        "be",
        "one",
        "from",
        "hot",
        "word",
        "what",
        "some"
    ]
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

function randomWord() {
    //answer = chosenCategory[Math.floor(Math.random() * chosenCategory.length)]
    answer = zulu_language[Math.floor(Math.random() * zulu_language.length)]; //making words random
    //chosenCategory = categories[Math.floor(Math.random() * chosenCategory.length)];
    //answer = chosenCategory[Math.floor(Math.random() * chosenCategory.length)]
}

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
        document.getElementById('keyboard').innerHTML = 'UNQOBILE!!!';
    } else if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'IMPENDULO ITHI: ' + answer; //game lost answer
        document.getElementById('keyboard').innerHTML = 'USHAYIWE!!!';
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

    var hintIndex = zulu_language.indexOf(answer);
    document.getElementById("clue").innerHTML = 'Clue: ' + guesshints[hintIndex];

}

function Translate() {
    if (mistakes >= 3) {
        var TransINdex = zulu_language.indexOf(answer);
        document.getElementById("translate").innerHTML = "Translation: " + Translation[TransINdex];
    } else {
        alert("You first have to get 3 mistakes in order to get a translation");
    }

}

function reset() { //reset button shandis
    mistakes = 0;
    guessed = [];
    TransINdex = [];
    hintIndex = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';
    document.getElementById("translate").innerHTML = "";
    document.getElementById("clue").innerHTML = "";
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong; //display max chances you have

randomWord();
generateButtons();
guessedWord();
//play();
//selectCat();