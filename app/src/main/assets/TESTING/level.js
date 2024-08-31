let xp = 0;
let level = 1;
const xpPerLevel = 100;

function getUserIdFromToken() {
    const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
    if (!token) {
        console.error('User not authenticated');
        return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
    return payload.id; // Assuming the user ID is stored in the "id" field
}

const userId = getUserIdFromToken();

if (!userId) {
    console.error('No user ID found');
} else {
    // Fetch user data from the server
    async function fetchUserData() {
        try {
            const response = await fetch(`/api/users/${userId}`);
            const data = await response.json();
            xp = data.experience || 0;
            level = data.level || 1;
            updateDisplay();
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    // Update the display with current XP and level
    function updateDisplay() {
        document.getElementById('level').innerText = level;
        document.getElementById('xp').innerText = xp;
    }

    // Update user data on the server
    async function updateUserData() {
        try {
            await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ experience: xp, level }),
            });
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }

    // Add XP and handle level-up
    function addXP(amount) {
        xp += amount;
        if (xp >= xpPerLevel) {
            xp -= xpPerLevel;
            level++;
        }
        updateDisplay();
        updateUserData();
    }

    // Remove XP and handle level-down
    function removeXP(amount) {
        xp -= amount;
        if (xp < 0 && level > 1) {
            xp = xpPerLevel + xp; // Borrow XP from the previous level
            level--;
        } else if (xp < 0) {
            xp = 0;
        }
        updateDisplay();
        updateUserData();
    }

    // Initialize the display and fetch user data on page load
    fetchUserData();
}
