// Questions database
const QUESTIONS = [
    // Science Questions
    {
        category: 'Science',
        question: 'What is the chemical symbol for water?',
        options: ['CO2', 'H2O', 'O2', 'NaCl'],
        correctAnswer: 'H2O'
    },
    {
        category: 'Science',
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
        correctAnswer: 'Mars'
    },
    {
        category: 'Science',
        question: 'What is the largest organ in the human body?',
        options: ['Heart', 'Brain', 'Liver', 'Skin'],
        correctAnswer: 'Skin'
    },
    {
        category: 'Science',
        question: 'What is the hardest natural substance on Earth?',
        options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
        correctAnswer: 'Diamond'
    },
    
    // History Questions
    {
        category: 'History',
        question: 'In what year did World War II end?',
        options: ['1943', '1945', '1939', '1950'],
        correctAnswer: '1945'
    },
    {
        category: 'History',
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'],
        correctAnswer: 'George Washington'
    },
    {
        category: 'History',
        question: 'In which year did the Berlin Wall fall?',
        options: ['1987', '1989', '1991', '1985'],
        correctAnswer: '1989'
    },
    {
        category: 'History',
        question: 'Who was the first woman to win a Nobel Prize?',
        options: ['Mother Teresa', 'Marie Curie', 'Jane Addams', 'Pearl Buck'],
        correctAnswer: 'Marie Curie'
    },
    
    // Geography Questions
    {
        category: 'Geography',
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Rome'],
        correctAnswer: 'Paris'
    },
    {
        category: 'Geography',
        question: 'Which is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        correctAnswer: 'Pacific Ocean'
    },
    {
        category: 'Geography',
        question: 'On which continent is the Sahara Desert located?',
        options: ['Asia', 'Africa', 'South America', 'Australia'],
        correctAnswer: 'Africa'
    },
    {
        category: 'Geography',
        question: 'Which country has the longest coastline in the world?',
        options: ['Russia', 'Canada', 'United States', 'Indonesia'],
        correctAnswer: 'Canada'
    },
    
    // Math Questions
    {
        category: 'Math',
        question: 'What is 9 x 6?',
        options: ['54', '42', '36', '48'],
        correctAnswer: '54'
    },
    {
        category: 'Math',
        question: 'What is the square root of 144?',
        options: ['10', '12', '14', '16'],
        correctAnswer: '12'
    },
    {
        category: 'Math',
        question: 'What is the sum of angles in a triangle?',
        options: ['90°', '180°', '270°', '360°'],
        correctAnswer: '180°'
    },
    {
        category: 'Math',
        question: 'What is 25% of 80?',
        options: ['15', '20', '25', '30'],
        correctAnswer: '20'
    }
];

class TicTacToeGame {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.humanPlayer = 'X';
        this.computerPlayer = 'O';
        this.currentPlayer = this.humanPlayer;
        this.gameActive = true;
        this.xScore = 0;
        this.oScore = 0;
        this.selectedCellIndex = null;

        this.initializeBoard();
    }

    initializeBoard() {
        const restart = document.getElementById('restart-button');
        const cells = document.querySelectorAll('.board-cell');

        restart.addEventListener('click', () => {
            this.resetGame();
        });

        cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });

        document.getElementById('x-score').textContent = this.xScore;
        document.getElementById('o-score').textContent = this.oScore;
        document.getElementById('current-player').textContent = 'Your Turn (X)';
    }

    displayMessage(message, type = 'info') {
        const messageDisplay = document.getElementById('game-message');
        messageDisplay.textContent = message;
        messageDisplay.className = `message ${type}`;
        
        // Clear message after 3 seconds
        setTimeout(() => {
            messageDisplay.textContent = '';
            messageDisplay.className = 'message';
        }, 3000);
    }

    handleCellClick(cell) {
        // Prevent interaction during computer's turn
        if (this.currentPlayer !== this.humanPlayer) return;

        const index = cell.getAttribute('data-index');

        // Check if cell is already occupied
        if (this.board[index] !== '') return;

        // Show modal with a random question
        this.selectedCellIndex = index;
        this.showQuestionModal();
    }

    showQuestionModal() {
        const modal = document.getElementById('modal');
        const questionText = document.getElementById('question-text');
        const answerButtons = document.getElementById('answer-buttons');

        // Select a random question
        const question = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];

        // Set question text
        questionText.textContent = question.question;

        // Clear previous answer buttons
        answerButtons.innerHTML = '';

        // Create answer buttons
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option, question.correctAnswer));
            answerButtons.appendChild(button);
        });

        // Show modal
        modal.style.display = 'block';
    }

    checkAnswer(selectedAnswer, correctAnswer) {
        const modal = document.getElementById('modal');
        const answerButtons = document.getElementById('answer-buttons');
        const cells = document.querySelectorAll('.board-cell');

        // Check if answer is correct
        if (selectedAnswer === correctAnswer) {
            // Place the human player's symbol
            this.board[this.selectedCellIndex] = this.humanPlayer;
            cells[this.selectedCellIndex].textContent = this.humanPlayer;

            // Close modal
            modal.style.display = 'none';

            this.displayMessage('Correct! Nice Job.', 'success');

            // Check for win or draw
            if (this.checkWin()) {
                this.xScore++;
                document.getElementById('x-score').textContent = this.xScore;
                this.displayMessage('You win!', 'success');
                return;
            } else if (this.board.every(cell => cell !== '')) {
                this.displayMessage('Draw!', 'info');
                return;
            }

            // Computer's turn
            this.computerMove();
        } else {
            // Highlight wrong answers
            const buttons = answerButtons.querySelectorAll('button');
            buttons.forEach(button => {
                if (button.textContent === selectedAnswer) {
                    button.classList.add('wrong');
                }
            });

            // Close modal
            modal.style.display = 'none';

            // Display incorrect answer message
            this.displayMessage('Wrong answer! Skipping your turn.', 'error');

            // Skip human's turn and go directly to computer's move
            this.computerMove();
        }
    }

    computerMove() {
        // Prevent further human interaction during computer's turn
        this.currentPlayer = this.computerPlayer;
        document.getElementById('current-player').textContent = 'Computer\'s Turn (O)';

        // Simple AI strategy: 
        // 1. Try to win
        // 2. Block human's winning move
        // 3. Take center if available
        // 4. Take a random empty cell

        const winningMove = this.findWinningMove(this.computerPlayer);
        const blockingMove = this.findWinningMove(this.humanPlayer);
        const centerIndex = 4;

        let moveIndex;
        if (winningMove !== -1) {
            moveIndex = winningMove;
        } else if (blockingMove !== -1) {
            moveIndex = blockingMove;
        } else if (this.board[centerIndex] === '') {
            moveIndex = centerIndex;
        } else {
            // Find a random empty cell
            const emptyCells = this.board.reduce((acc, cell, index) => {
                if (cell === '') acc.push(index);
                return acc;
            }, []);
            moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        // Simulate a short delay to make computer move feel more natural
        setTimeout(() => {
            // Place the computer's symbol
            const cells = document.querySelectorAll('.board-cell');
            this.board[moveIndex] = this.computerPlayer;
            cells[moveIndex].textContent = this.computerPlayer;

            // Check for win or draw
            if (this.checkWin()) {
                this.oScore++;
                document.getElementById('o-score').textContent = this.oScore;
                this.displayMessage('Computer wins!', 'error');
                return;
            } else if (this.board.every(cell => cell !== '')) {
                this.displayMessage('Draw!', 'info');
                return;
            }

            // Switch back to human player
            this.currentPlayer = this.humanPlayer;
            document.getElementById('current-player').textContent = 'Your Turn (X)';
        }, 500);
    }

    findWinningMove(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            // Check if two cells are filled by the same player and third is empty
            if (
                this.board[a] === player && 
                this.board[b] === player && 
                this.board[c] === ''
            ) {
                return c;
            }
            if (
                this.board[a] === player && 
                this.board[c] === player && 
                this.board[b] === ''
            ) {
                return b;
            }
            if (
                this.board[b] === player && 
                this.board[c] === player && 
                this.board[a] === ''
            ) {
                return a;
            }
        }
        return -1;
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c];
        });
    }

    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        const cells = document.querySelectorAll('.board-cell');
        cells.forEach(cell => cell.textContent = '');
        this.gameActive = true;
        this.currentPlayer = this.humanPlayer;
        document.getElementById('current-player').textContent = 'Your Turn (X)';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeGame();

});