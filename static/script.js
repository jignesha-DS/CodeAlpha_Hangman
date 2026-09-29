const words = [
    "python",
    "computer",
    "programming",
    "developer",
    "college"
];

let selectedWord;
let guessedLetters;
let wrongGuesses;

const wordDisplay = document.getElementById("word");
const lettersContainer = document.getElementById("letters");
const wrongCount = document.getElementById("wrong-count");
const message = document.getElementById("message");

const newGameButton = document.getElementById("new-game");

const bodyParts = [
    document.getElementById("head"),
    document.getElementById("body"),
    document.getElementById("left-arm"),
    document.getElementById("right-arm"),
    document.getElementById("left-leg"),
    document.getElementById("right-leg")
];


// Start a new game
function startGame() {

    selectedWord =
        words[Math.floor(Math.random() * words.length)];

    guessedLetters = [];

    wrongGuesses = 0;

    message.textContent =
        "Choose a letter to start!";

    lettersContainer.innerHTML = "";

    bodyParts.forEach(part => {
        part.style.display = "none";
    });

    createLetterButtons();

    updateWord();

    updateWrongCount();
}


// Create A-Z buttons
function createLetterButtons() {

    for (let i = 65; i <= 90; i++) {

        const letter =
            String.fromCharCode(i).toLowerCase();

        const button =
            document.createElement("button");

        button.textContent =
            letter.toUpperCase();

        button.classList.add("letter");

        button.addEventListener("click", function () {

            guessLetter(letter);

        });

        lettersContainer.appendChild(button);
    }
}


// Guess a letter
function guessLetter(letter) {

    guessedLetters.push(letter);

    const buttons =
        document.querySelectorAll(".letter");

    buttons.forEach(button => {

        if (button.textContent.toLowerCase() === letter) {
            button.disabled = true;
        }

    });


    if (selectedWord.includes(letter)) {

        message.textContent =
            "✅ Correct guess!";

        updateWord();

        checkWin();

    } else {

        wrongGuesses++;

        message.textContent =
            "❌ Wrong guess!";

        showBodyPart();

        updateWrongCount();

        checkLose();
    }
}


// Display guessed letters
function updateWord() {

    let display = "";

    for (let letter of selectedWord) {

        if (guessedLetters.includes(letter)) {

            display += letter.toUpperCase() + " ";

        } else {

            display += "_ ";

        }
    }

    wordDisplay.textContent = display;
}


// Update attempts
function updateWrongCount() {

    wrongCount.textContent =
        `${wrongGuesses} / 6`;
}


// Show hangman body part
function showBodyPart() {

    if (wrongGuesses <= 6) {

        bodyParts[wrongGuesses - 1].style.display =
            "block";
    }
}


// Check winning condition
function checkWin() {

    const won =
        selectedWord
            .split("")
            .every(letter =>
                guessedLetters.includes(letter)
            );

    if (won) {

        message.textContent =
            "🎉 Congratulations! You won!";

        disableButtons();
    }
}


// Check losing condition
function checkLose() {

    if (wrongGuesses >= 6) {

        message.textContent =
            `💀 Game Over! The word was "${selectedWord.toUpperCase()}"`;

        updateWord();

        disableButtons();
    }
}


// Disable all letter buttons
function disableButtons() {

    const buttons =
        document.querySelectorAll(".letter");

    buttons.forEach(button => {

        button.disabled = true;

    });
}


// New game button
newGameButton.addEventListener(
    "click",
    startGame
);


// Start game when page loads
startGame();
