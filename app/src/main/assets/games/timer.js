const questions = {
    math: [
        {
            question: "What is 8 × 7?",
            options: ["54", "56", "64", "58"],
            correct: "56"
        },
        {
            question: "What is the square root of 144?",
            options: ["12", "14", "16", "10"],
            correct: "12"
        },
        {
            question: "What is 15% of 200?",
            options: ["30", "25", "35", "40"],
            correct: "30"
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for Gold?",
            options: ["Ag", "Au", "Fe", "Cu"],
            correct: "Au"
        },
        {
            question: "Which planet is closest to the Sun?",
            options: ["Venus", "Mars", "Mercury", "Earth"],
            correct: "Mercury"
        },
        {
            question: "What is the hardest natural substance?",
            options: ["Gold", "Iron", "Diamond", "Platinum"],
            correct: "Diamond"
        }
    ],
    history: [
        {
            question: "In which year did World War II end?",
            options: ["1945", "1944", "1946", "1943"],
            correct: "1945"
        },
        {
            question: "Who was the first President of the United States?",
            options: ["John Adams", "Thomas Jefferson", "George Washington", "Benjamin Franklin"],
            correct: "George Washington"
        },
        {
            question: "Which empire built the pyramids?",
            options: ["Roman", "Greek", "Egyptian", "Persian"],
            correct: "Egyptian"
        }
    ],
    geography: [
        {
            question: "What is the capital of Japan?",
            options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
            correct: "Tokyo"
        },
        {
            question: "Which is the largest ocean?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correct: "Pacific"
        },
        {
            question: "On which continent is the Sahara Desert?",
            options: ["Asia", "Africa", "South America", "Europe"],
            correct: "Africa"
        }
    ]
};

let timer;
let timeLeft;
let timeTrack;
let bestTime = 0;
let currentQuestion;

function startGame() {
    timeLeft = 30;
    timeTrack = 0;
    updateTimer();
    document.querySelector('.game-over').style.display = 'none';
    document.querySelector('.question-container').style.display = 'block';
    document.querySelector('.feedback').textContent = '';
    timer = setInterval(updateTimer, 100);
    askQuestion();
}

function updateTimer() {
    timeLeft = Math.max(0, timeLeft - 0.1);
    document.querySelector('.timer').textContent = timeLeft.toFixed(1);
    
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    const finalTime = 30 + timeTrack;
    if (finalTime > bestTime) {
        bestTime = finalTime;
        document.querySelector('.score').textContent = `Best Time: ${bestTime} seconds`;
    }
    document.querySelector('.game-over').style.display = 'block';
    document.querySelector('.question-container').style.display = 'none';
    document.querySelector('.final-time').textContent = finalTime;
}

function askQuestion() {
    const categories = Object.keys(questions);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const categoryQuestions = questions[category];
    currentQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];

    document.querySelector('.question').textContent = currentQuestion.question;
    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(answer) {
    const feedback = document.querySelector('.feedback');
    if (answer === currentQuestion.correct) {
        timeLeft += 3;
        timeTrack += 3;
        feedback.textContent = '✅ Correct! +3 seconds';
        feedback.style.color = '#4ecca3';
    } else {
        feedback.textContent = '❌ Incorrect! The correct answer was: ' + currentQuestion.correct;
        feedback.style.color = '#ff6b6b';
    }

    setTimeout(() => {
        feedback.textContent = '';
        askQuestion();
    }, 1000);
}

startGame();