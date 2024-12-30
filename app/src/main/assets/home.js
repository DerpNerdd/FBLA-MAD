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
