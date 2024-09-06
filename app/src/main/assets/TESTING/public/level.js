let userId;
let xp = 0;
let level = 1;
const xpPerLevel = 100;

// Retrieve the user ID from the JWT token stored in localStorage
function getUserIdFromToken() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('User not authenticated');
        return null;
    }
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    } catch (err) {
        console.error('Error decoding token:', err);
        return null;
    }
}

userId = getUserIdFromToken();
console.log(`User ID: ${userId}`);

if (!userId) {
    console.error('No user ID found');
    // Redirect to login page if not authenticated
    window.location.href = '/login.html';
} else {
    async function fetchUserData() {
        try {
            console.log('Fetching user data...');
            const response = await fetch(`/api/users/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            xp = data.experience || 0;
            level = data.level || 1;
            console.log(`Fetched User Data: XP=${xp}, Level=${level}`);
            updateUI();
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    }

    fetchUserData();
}

function updateUI() {
    document.getElementById('level').innerText = `Level: ${level}`;
    document.getElementById('xp').innerText = `XP: ${xp}/${xpPerLevel}`;
}

async function updateXP(change) {
    try {
        console.log(`Updating XP by ${change} for user ID: ${userId}`);

        if (change < 0) {
            // Ensure XP doesn't go below 0
            if (xp + change < 0) {
                xp = 0;
            } else {
                xp += change;
            }
        } else {
            xp += change;
            // Check if the user should level up
            while (xp >= xpPerLevel) {
                level++;
                xp -= xpPerLevel;
            }
        }

        const response = await fetch(`/api/users/${userId}/xp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ xpChange: change })
        });
        if (!response.ok) {
            throw new Error('Failed to update XP');
        }
        const data = await response.json();
        xp = data.experience;
        level = data.level;
        updateUI();
    } catch (err) {
        console.error('Error updating XP:', err);
    }
}

// Event listeners
document.getElementById('add5xp').addEventListener('click', () => updateXP(5));
document.getElementById('add10xp').addEventListener('click', () => updateXP(10));
document.getElementById('add15xp').addEventListener('click', () => updateXP(15));
document.getElementById('add20xp').addEventListener('click', () => updateXP(20));
