const questionPool = {
    math: [
        { question: "What is 8 × 7?", options: ["58", "56", "64", "54"], correct: "56" },
        { question: "What is the square root of 144?", options: ["12", "14", "10", "16"], correct: "12" },
        { question: "What is 15% of 200?", options: ["35", "40", "30", "25"], correct: "30" },
        { question: "What is 9 × 8?", options: ["72", "70", "74", "68"], correct: "72" },
        { question: "What is 12 × 12?", options: ["128", "140", "144", "136"], correct: "144" },
        { question: "What is the square of 15?", options: ["225", "150", "180", "200"], correct: "225" },
        { question: "What is 100 ÷ 4?", options: ["30", "20", "15", "25"], correct: "25" },
        { question: "What is 3 × 5?", options: ["20", "10", "25", "15"], correct: "15" },
        { question: "What is 7 × 9?", options: ["81", "63", "72", "56"], correct: "63" },
        { question: "What is 2 × 6?", options: ["10", "8", "14", "12"], correct: "12" },
        { question: "What is 6 × 10?", options: ["55", "65", "75", "60"], correct: "60" },
        { question: "What is 25% of 200?", options: ["40", "50", "60", "70"], correct: "50" },
        { question: "What is 80 ÷ 8?", options: ["20", "12", "15", "10"], correct: "10" },
        { question: "What is 50 × 6?", options: ["300", "250", "350", "450"], correct: "300" },
        { question: "What is 9 × 9?", options: ["81", "90", "72", "60"], correct: "81" },
        { question: "What is 4 × 8?", options: ["36", "30", "34", "32"], correct: "32" },
        { question: "What is 14 × 6?", options: ["80", "92", "84", "88"], correct: "84" },
        { question: "What is the square of 20?", options: ["400", "350", "300", "250"], correct: "400" },
        { question: "What is 7 × 6?", options: ["42", "48", "44", "40"], correct: "42" },
        { question: "What is 6 ÷ 2?", options: ["3", "4", "5", "2"], correct: "3" },
        { question: "What is 18 ÷ 3?", options: ["6", "5", "4", "3"], correct: "6" },
        { question: "What is 5 × 10?", options: ["50", "55", "60", "45"], correct: "50" },
        { question: "What is 25 × 4?", options: ["100", "110", "105", "90"], correct: "100" },
        { question: "What is 5 + 15?", options: ["25", "30", "35", "20"], correct: "20" },
        { question: "What is 18 ÷ 2?", options: ["10", "8", "9", "7"], correct: "9" }
    ],
    science: [
        { question: "What is the chemical symbol for Gold?", options: ["Fe", "Cu", "Ag", "Au"], correct: "Au" },
        { question: "Which planet is closest to the Sun?", options: ["Mars", "Earth", "Venus", "Mercury"], correct: "Mercury" },
        { question: "What is the hardest natural substance?", options: ["Platinum", "Gold", "Diamond", "Iron"], correct: "Diamond" },
        { question: "What is the chemical symbol for Oxygen?", options: ["O", "O2", "Ox", "Oz"], correct: "O" },
        { question: "What is the atomic number of Carbon?", options: ["12", "8", "6", "14"], correct: "6" },
        { question: "Which gas do plants need for photosynthesis?", options: ["Hydrogen", "Carbon Dioxide", "Oxygen", "Nitrogen"], correct: "Carbon Dioxide" },
        { question: "What is the center of an atom called?", options: ["Neutron", "Electron", "Proton", "Nucleus"], correct: "Nucleus" },
        { question: "What is the chemical formula for water?", options: ["H2O", "O2", "CO2", "H2"], correct: "H2O" },
        { question: "How many bones are in the adult human body?", options: ["220", "205", "206", "210"], correct: "206" },
        { question: "What element does 'O' represent?", options: ["Osmium", "Ozone", "Oganesson", "Oxygen"], correct: "Oxygen" },
        { question: "Which planet is known as the Red Planet?", options: ["Jupiter", "Saturn", "Mars", "Venus"], correct: "Mars" },
        { question: "What is the boiling point of water in Celsius?", options: ["100°C", "120°C", "90°C", "150°C"], correct: "100°C" },
        { question: "What type of animal is a frog?", options: ["Amphibian", "Mammal", "Reptile", "Bird"], correct: "Amphibian" },
        { question: "What is the main source of energy for the Earth?", options: ["Wind", "The Moon", "The Sun", "Tides"], correct: "The Sun" },
        { question: "What is the chemical formula for salt?", options: ["NaOH", "NaCl", "CaCl2", "KCl"], correct: "NaCl" },
        { question: "How many planets are in our Solar System?", options: ["8", "9", "7", "6"], correct: "8" },
        { question: "What is the primary function of red blood cells?", options: ["Carrying oxygen", "Fighting disease", "Carrying carbon dioxide", "Producing energy"], correct: "Carrying oxygen" },
        { question: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Lungs"], correct: "Skin" },
        { question: "What is the main component of Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], correct: "Nitrogen" },
        { question: "What is the process by which plants make their own food?", options: ["Fermentation", "Respiration", "Digestion", "Photosynthesis"], correct: "Photosynthesis" },
        { question: "Which organ is responsible for pumping blood?", options: ["Brain", "Heart", "Lungs", "Liver"], correct: "Heart" },
        { question: "What is the chemical symbol for Silver?", options: ["Ag", "Au", "Fe", "Cu"], correct: "Ag" },
        { question: "What is the boiling point of water in Fahrenheit?", options: ["212°F", "200°F", "230°F", "220°F"], correct: "212°F" }
    ],
    history: [
        { question: "In which year did World War II end?", options: ["1944", "1946", "1945", "1943"], correct: "1945" },
        { question: "Who was the first President of the United States?", options: ["John Adams", "George Washington", "Thomas Jefferson", "Benjamin Franklin"], correct: "George Washington" },
        { question: "Which empire built the pyramids?", options: ["Greek", "Roman", "Persian", "Egyptian"], correct: "Egyptian" },
        { question: "Who was the first emperor of China?", options: ["Wu Zetian", "Tang Taizong", "Qin Shi Huang", "Kangxi"], correct: "Qin Shi Huang" },
        { question: "What year did the Titanic sink?", options: ["1912", "1905", "1898", "1920"], correct: "1912" },
        { question: "Who was the leader of the Soviet Union during WWII?", options: ["Mikhail Gorbachev", "Vladimir Lenin", "Leon Trotsky", "Joseph Stalin"], correct: "Joseph Stalin" },
        { question: "What ancient civilization built the Machu Picchu?", options: ["Maya", "Aztec", "Inca", "Olmec"], correct: "Inca" },
        { question: "Which war was fought between the North and South regions of the United States?", options: ["World War II", "The Revolutionary War", "The Civil War", "World War I"], correct: "The Civil War" },
        { question: "Who was the Queen of England for over 60 years?", options: ["Queen Victoria", "Queen Elizabeth II", "Queen Elizabeth I", "Mary I"], correct: "Queen Elizabeth II" },
        { question: "Who was the first man to walk on the moon?", options: ["Buzz Aldrin", "Michael Collins", "Neil Armstrong", "Yuri Gagarin"], correct: "Neil Armstrong" },
        { question: "In what year did the Berlin Wall fall?", options: ["1987", "1990", "1989", "1985"], correct: "1989" },
        { question: "Who was the first woman to fly solo across the Atlantic?", options: ["Amelia Earhart", "Bessie Coleman", "Eleanor Roosevelt", "Jacqueline Cochran"], correct: "Amelia Earhart" },
        { question: "Who was the leader of the Mongol Empire?", options: ["Attila the Hun", "Cyrus the Great", "Kublai Khan", "Genghis Khan"], correct: "Genghis Khan" },
        { question: "What was the name of the first artificial Earth satellite?", options: ["Sputnik 1", "Vanguard 1", "Explorer 1", "Apollo 11"], correct: "Sputnik 1" },
        { question: "Which ancient civilization is famous for its pyramids?", options: ["Chinese", "Roman", "Egyptian", "Greek"], correct: "Egyptian" },
        { question: "Who discovered America?", options: ["Vasco da Gama", "Christopher Columbus", "John Cabot", "Ferdinand Magellan"], correct: "Christopher Columbus" },
        { question: "When did World War I begin?", options: ["1912", "1914", "1916", "1915"], correct: "1914" },
        { question: "Which country was the first to grant women the right to vote?", options: ["USA", "France", "New Zealand", "UK"], correct: "New Zealand" },
        { question: "What year did the French Revolution start?", options: ["1790", "1776", "1800", "1789"], correct: "1789" },
        { question: "Who was the first person to circumnavigate the globe?", options: ["Marco Polo", "Sir Francis Drake", "Ferdinand Magellan", "Christopher Columbus"], correct: "Ferdinand Magellan" },
        { question: "Which empire was known for its gladiator games?", options: ["Roman Empire", "British Empire", "Mongol Empire", "Ottoman Empire"], correct: "Roman Empire" }
    ],
    geography: [
        { question: "What is the capital of Japan?", options: ["Seoul", "Tokyo", "Beijing", "Bangkok"], correct: "Tokyo" },
        { question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: "Pacific" },
        { question: "On which continent is the Sahara Desert?", options: ["Africa", "Asia", "South America", "Europe"], correct: "Africa" },
        { question: "What is the capital of Australia?", options: ["Canberra", "Sydney", "Melbourne", "Brisbane"], correct: "Canberra" },
        { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: "Nile" },
        { question: "Which country is known as the Land of the Rising Sun?", options: ["South Korea", "China", "Japan", "India"], correct: "Japan" },
        { question: "What is the tallest mountain in the world?", options: ["Kangchenjunga", "Mount Kilimanjaro", "Mount Everest", "Mount Fuji"], correct: "Mount Everest" },
        { question: "Which country has the most islands?", options: ["USA", "Sweden", "Finland", "Indonesia"], correct: "Sweden" },
        { question: "Which is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Nauru"], correct: "Vatican City" },
        { question: "Which continent has the most countries?", options: ["Africa", "Asia", "Europe", "North America"], correct: "Africa" },
        { question: "Which mountain range separates Europe and Asia?", options: ["Himalayas", "Andes", "Ural Mountains", "Rocky Mountains"], correct: "Ural Mountains" },
        { question: "Which country has the longest coastline?", options: ["Canada", "Russia", "Australia", "USA"], correct: "Canada" },
        { question: "What is the capital of Canada?", options: ["Ottawa", "Vancouver", "Toronto", "Montreal"], correct: "Ottawa" },
        { question: "Which is the biggest desert in the world?", options: ["Karakum Desert", "Atacama Desert", "Sahara Desert", "Antarctic Desert"], correct: "Antarctic Desert" },
        { question: "What is the largest island in the world?", options: ["Australia", "Greenland", "New Guinea", "Borneo"], correct: "Greenland" },
        { question: "What is the capital of France?", options: ["Madrid", "Berlin", "Rome", "Paris"], correct: "Paris" },
        { question: "Which country is known for its pyramids?", options: ["China", "Egypt", "India", "Mexico"], correct: "Egypt" },
        { question: "Which is the largest country by area?", options: ["USA", "China", "India", "Russia"], correct: "Russia" },
        { question: "Which country is home to the Great Barrier Reef?", options: ["New Zealand", "Australia", "Indonesia", "Fiji"], correct: "Australia" },
        { question: "What is the largest country in Africa?", options: ["Nigeria", "South Africa", "Sudan", "Algeria"], correct: "Algeria" },
        { question: "What is the largest city in the world by population?", options: ["Beijing", "New York", "Tokyo", "Mumbai"], correct: "Tokyo" }
    ]
};

// Get category from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Display category name
const categoryHeader = document.getElementById('category-header');
categoryHeader.textContent = `${category} Test`;

// Retrieve and display questions for the selected category
const questionsContainer = document.getElementById('questions-container');
const questions = questionPool[category] || [];

questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
        <p>${index + 1}. ${question.question}</p>
        ${question.options.map((option, i) => `
            <input type="radio" name="question${index}" value="${option}" id="question${index}_option${i}">
            <label for="question${index}_option${i}">${option}</label><br>
        `).join('')}
    `;
    questionsContainer.appendChild(questionElement);
});