document.getElementById('add5xp').addEventListener('click', () => updateXP(5));
document.getElementById('add10xp').addEventListener('click', () => updateXP(10));
document.getElementById('add15xp').addEventListener('click', () => updateXP(15));
document.getElementById('add20xp').addEventListener('click', () => updateXP(20));

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

// Update UI
function updateUI() {
    document.getElementById('level').innerText = `Level: ${level}`;
    updateSVGProgress(xp);
}

// Update SVG progress
function updateSVGProgress(currentXP) {
    const circle = document.querySelector('circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    
    // Calculate the offset based on the current XP
    const offset = circumference - (currentXP / xpPerLevel) * circumference;
    
    // Apply the offset and rotate to start from the bottom
    circle.style.strokeDashoffset = offset;
    circle.style.transform = 'rotate(225deg)'; // Adjust this rotation to match the starting point
    circle.style.transformOrigin = 'center';
}

// Update XP
async function updateXP(amount) {
    const newXP = Math.max(0, xp + amount); // Prevent XP from going below 0
    try {
        console.log(`Updating XP for user ${userId}: ${newXP}`);
        const response = await fetch(`/api/users/${userId}/xp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ experience: newXP }),
        });
        if (!response.ok) {
            throw new Error('Failed to update XP');
        }
        xp = newXP;
        if (xp >= xpPerLevel) {
            level++;
            xp = xp % xpPerLevel; // Carry over remaining XP
        }
        updateUI();
    } catch (err) {
        console.error('Error updating XP:', err);
    }
}