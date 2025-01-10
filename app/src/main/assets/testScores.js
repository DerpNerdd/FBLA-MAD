// Sample data for each subject (now without usernames)
const leaderboardData = {
    Math: [
        { date: "2025-01-01", score: 22 },
        { date: "2025-01-02", score: 18 },
        { date: "2025-01-03", score: 20 },
        { date: "2025-01-04", score: 24 },
        { date: "2025-01-05", score: 19 },
        { date: "2025-01-01", score: 22 },
        { date: "2025-01-02", score: 18 },
        { date: "2025-01-03", score: 20 },
        { date: "2025-01-04", score: 24 },
        { date: "2025-01-05", score: 19 },
    ],
    Science: [
        { date: "2025-01-01", score: 25 },
        { date: "2025-01-02", score: 23 },
        { date: "2025-01-03", score: 21 },
        { date: "2025-01-04", score: 20 },
        { date: "2025-01-05", score: 22 },
        { date: "2025-01-01", score: 25 },
        { date: "2025-01-02", score: 23 },
        { date: "2025-01-03", score: 21 },
        { date: "2025-01-04", score: 20 },
        { date: "2025-01-05", score: 22 },
    ],
    History: [
        { date: "2025-01-01", score: 19 },
        { date: "2025-01-02", score: 18 },
        { date: "2025-01-03", score: 17 },
        { date: "2025-01-04", score: 16 },
        { date: "2025-01-05", score: 15 },
        { date: "2025-01-01", score: 19 },
        { date: "2025-01-02", score: 18 },
        { date: "2025-01-03", score: 17 },
        { date: "2025-01-04", score: 16 },
        { date: "2025-01-05", score: 15 },
    ],
    Geography: [
        { date: "2025-01-01", score: 20 },
        { date: "2025-01-02", score: 22 },
        { date: "2025-01-03", score: 21 },
        { date: "2025-01-04", score: 23 },
        { date: "2025-01-05", score: 24 },
        { date: "2025-01-01", score: 20 },
        { date: "2025-01-02", score: 22 },
        { date: "2025-01-03", score: 21 },
        { date: "2025-01-04", score: 23 },
        { date: "2025-01-05", score: 24 },
    ]
};

let selectedSubject = "Math";

// Function to handle subject button click
function handleLevelClick(subject) {
    selectedSubject = subject;
    updateButtonSelection();
    renderLeaderboard(subject);
}

// Function to update button selection styling
function updateButtonSelection() {
    const subjects = ["Math", "Science", "History", "Geography"];
    subjects.forEach(subject => {
        const button = document.getElementById(`${subject.toLowerCase()}-button`);
        if (subject === selectedSubject) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
}

// Function to render leaderboard for the selected subject
function renderLeaderboard(subject) {
    const tableBody = document.getElementById("leaderboard-body");
    const data = leaderboardData[subject];
    tableBody.innerHTML = "";

    data.slice(0, 10).forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.score} / 25</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial render for Math
document.addEventListener("DOMContentLoaded", () => {
    renderLeaderboard("Math");
    updateButtonSelection();
});
