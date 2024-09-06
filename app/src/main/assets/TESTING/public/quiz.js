const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    title: { type: String, required: true },
    questions: [{
        questionText: { type: String, required: true },
        choices: [{ text: String, isCorrect: Boolean }],
    }],
    expValue: { type: Number, default: 10 },
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
