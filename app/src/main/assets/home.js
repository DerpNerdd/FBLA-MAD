// Select elements
const playButton = document.querySelector('.play-btn');
const modal = document.getElementById('modal');

// Show modal on Play button click
playButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Optional: Close the modal when clicking outside the content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

let level = document.getElementById("level");
let counter = 0;


setInterval(() => {
    if(counter == 65){
        clearInterval();
    }
    else{
        counter += 1;
        level.innerHTML = "Level " + counter 
    }

}, 30);
