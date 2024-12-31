const questionPool = {
    Math: {
    100: [
        { q: "What is the square root of 144?", a: "12" },
        { q: "What is 7 x 8?", a: "56" },
        { q: "What is 25% of 80?", a: "20" }
    ],
    200: [
        { q: "What is 15% of 200?", a: "30" },
        { q: "What is the value of π rounded to 2 decimal places?", a: "3.14" },
        { q: "What is the sum of angles in a triangle?", a: "180" }
    ],
    300: [
        { q: "If a triangle has angles of 90° and 45°, what is the third angle?", a: "45" },
        { q: "What is the square root of 169?", a: "13" },
        { q: "What is 2 to the 6th power?", a: "64" }
    ],
    400: [
        { q: "What is 7 factorial (7!)?", a: "5040" },
        { q: "What is the area of a circle with radius 5? (Use 3.14 for π)", a: "78.5" },
        { q: "What is the cube root of 27?", a: "3" }
    ],
    500: [
        { q: "In a right triangle, if one angle is 30°, what is the ratio of the shortest side to the hypotenuse?", a: "1/2" },
        { q: "What is the sum of the first 10 prime numbers?", a: "129" },
        { q: "What is the value of e rounded to 2 decimal places?", a: "2.72" }
    ]
    },
    Science: {
    100: [
        { q: "What is the chemical symbol for gold?", a: "Au" },
        { q: "What is the most abundant gas in Earth's atmosphere?", a: "Nitrogen" },
        { q: "What is the chemical formula for water?", a: "H2O" }
    ],
    200: [
        { q: "Which planet is known as the Red Planet?", a: "Mars" },
        { q: "What is the largest organ in the human body?", a: "Skin" },
        { q: "What is the chemical symbol for silver?", a: "Ag" }
    ],
    300: [
        { q: "What is the hardest natural substance on Earth?", a: "Diamond" },
        { q: "Which gas do plants absorb from the air?", a: "Carbon Dioxide" },
        { q: "What is the closest star to Earth?", a: "Sun" }
    ],
    400: [
        { q: "What is the atomic number of carbon?", a: "6" },
        { q: "What is the powerhouse of the cell?", a: "Mitochondria" },
        { q: "What is the chemical symbol for lead?", a: "Pb" }
    ],
    500: [
        { q: "What is the speed of light in kilometers per second (rounded to nearest thousand)?", a: "300000" },
        { q: "What particle has a negative charge?", a: "Electron" },
        { q: "What is absolute zero in Celsius?", a: "-273" }
    ]
    },
    Geography: {
    100: [
        { q: "What is the capital of Japan?", a: "Tokyo" },
        { q: "What is the largest ocean on Earth?", a: "Pacific" },
        { q: "On which continent is Egypt located?", a: "Africa" }
    ],
    200: [
        { q: "Which continent is the largest by land area?", a: "Asia" },
        { q: "What is the capital of Brazil?", a: "Brasilia" },
        { q: "Which is the longest river in the world?", a: "Nile" }
    ],
    300: [
        { q: "Which country is known as the Land of Fire and Ice?", a: "Iceland" },
        { q: "What is the capital of Australia?", a: "Canberra" },
        { q: "Which is the smallest continent?", a: "Australia" }
    ],
    400: [
        { q: "Which desert is the largest cold desert in the world?", a: "Antarctica" },
        { q: "What is the deepest point on Earth?", a: "Mariana Trench" },
        { q: "What is the capital of South Africa?", a: "Pretoria" }
    ],
    500: [
        { q: "Through how many time zones does Russia span?", a: "11" },
        { q: "What is the highest waterfall in the world?", a: "Angel Falls" },
        { q: "Which country has the most islands in the world?", a: "Sweden" }
    ]
    },
    History: {
    100: [
        { q: "In which year did World War II end?", a: "1945" },
        { q: "Who wrote the Declaration of Independence?", a: "Thomas Jefferson" },
        { q: "What ancient wonder was located in Alexandria?", a: "Lighthouse" }
    ],
    200: [
        { q: "Who was the first President of the United States?", a: "George Washington" },
        { q: "In which year did Columbus reach America?", a: "1492" },
        { q: "Who was the first Emperor of China?", a: "Qin Shi Huang" }
    ],
    300: [
        { q: "Which civilization built the pyramids of Giza?", a: "Ancient Egyptians" },
        { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
        { q: "What was the capital of the Roman Empire?", a: "Rome" }
    ],
    400: [
        { q: "In which year did the Berlin Wall fall?", a: "1989" },
        { q: "Who was the first woman to win a Nobel Prize?", a: "Marie Curie" },
        { q: "Which empire was ruled by Genghis Khan?", a: "Mongol Empire" }
    ],
    500: [
        { q: "Who was the first European explorer to reach India by sea?", a: "Vasco da Gama" },
        { q: "In which year was the Magna Carta signed?", a: "1215" },
        { q: "Who was the longest-reigning British monarch?", a: "Elizabeth II" }
    ]
    }
};

let score = 0;
let lives = 3;
let answeredQuestions = new Set();
let currentQuestion = null;
let gameQuestions = {}; // Will store the randomly selected questions for the current game

function getRandomQuestion(category, points) {
const questions = questionPool[category][points];
return questions[Math.floor(Math.random() * questions.length)];
}

function initializeGameQuestions() {
gameQuestions = {};
Object.keys(questionPool).forEach(category => {
    gameQuestions[category] = [];
    Object.keys(questionPool[category]).forEach(points => {
    gameQuestions[category].push({
        points: parseInt(points),
        ...getRandomQuestion(category, points)
    });
    });
});
}

function initializeGame() {
initializeGameQuestions(); // Select random questions for this game
const gameBoard = document.getElementById('gameBoard');
gameBoard.innerHTML = '';

Object.entries(gameQuestions).forEach(([category, categoryQuestions]) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    
    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);
    
    categoryQuestions.forEach((question, index) => {
    const button = document.createElement('button');
    button.className = 'question-btn';
    button.textContent = question.points;
    button.id = `${category}-${index}`;
    button.onclick = () => selectQuestion(category, index);
    categoryDiv.appendChild(button);
    });
    
    gameBoard.appendChild(categoryDiv);
});

answeredQuestions.forEach(key => {
    const button = document.getElementById(key);
    if (button) {
    button.className = 'question-btn answered';
    }
});
}

// Other functions remain the same but use gameQuestions instead of questions
function selectQuestion(category, index) {
const key = `${category}-${index}`;
if (answeredQuestions.has(key)) return;

currentQuestion = { category, index };
const question = gameQuestions[category][index];

document.getElementById('gameBoard').style.display = 'none';
document.getElementById('questionScreen').style.display = 'block';
document.getElementById('questionText').textContent = question.q;
document.getElementById('answerInput').value = '';
document.getElementById('feedback').textContent = '';
document.getElementById('feedback').className = 'feedback';
document.getElementById('submitBtn').style.display = 'inline';
document.getElementById('continueBtn').style.display = 'none';
}

function submitAnswer() {
const userAnswer = document.getElementById('answerInput').value;
const question = gameQuestions[currentQuestion.category][currentQuestion.index];
const key = `${currentQuestion.category}-${currentQuestion.index}`;

if (userAnswer.toLowerCase() === question.a.toLowerCase()) {
    score += question.points;
    document.getElementById('score').textContent = score;
    document.getElementById('feedback').textContent = 'Correct!';
    document.getElementById('feedback').className = 'feedback correct';
} else {
    lives--;
    updateLives();
    document.getElementById('feedback').textContent = `Wrong! The correct answer was: ${question.a}`;
    document.getElementById('feedback').className = 'feedback incorrect';
}

answeredQuestions.add(key);
document.getElementById('submitBtn').style.display = 'none';
document.getElementById('continueBtn').style.display = 'inline';

if (lives === 0) {
    endGame();
}
}

// Rest of the functions remain exactly the same
function updateLives() {
document.getElementById('lives').textContent = '❤️'.repeat(lives);
}

function continueGame() {
document.getElementById('questionScreen').style.display = 'none';
document.getElementById('gameBoard').style.display = 'grid';

const key = `${currentQuestion.category}-${currentQuestion.index}`;
const button = document.getElementById(key);
if (button) {
    button.className = 'question-btn answered';
    }
}

    function endGame() {
    document.getElementById('questionScreen').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('finalScore').textContent = score;
    }

    function resetGame() {
    score = 0;
    lives = 3;
    answeredQuestions = new Set();
    currentQuestion = null;
    
    document.getElementById('score').textContent = '0';
    updateLives();
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'grid';
    
    initializeGame();
    }

    // Event Listeners
    document.getElementById('submitBtn').addEventListener('click', submitAnswer);
    document.getElementById('continueBtn').addEventListener('click', continueGame);
    document.getElementById('playAgainBtn').addEventListener('click', resetGame);
    document.getElementById('answerInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitAnswer();
    });

    // Initialize the game
    initializeGame();