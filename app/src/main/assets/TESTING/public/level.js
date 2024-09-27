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

            // Update profile picture if exists
            if (data.profilePicture) {
                document.getElementById('profile-pic').src = data.profilePicture;
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    }

    fetchUserData();
}

// Detect the page to adjust behavior
function updateUI() {
    if (window.location.pathname === '/homepage.html') {
        document.getElementById('level').textContent = `Level ${level}`;
        updateSVGProgress();
    } else if (window.location.pathname === '/profile.html') {
        document.getElementById('level-rectangle').textContent = `Level ${level}`;
        updateRectangleProgress();
    }
}

// Update the SVG progress bar based on the XP (for homepage)
function updateSVGProgress() {
    const progressCircle = document.querySelector('svg circle');
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (xp / xpPerLevel) * circumference;

    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = offset;
    console.log(`SVG Progress: ${(xp / xpPerLevel) * 100}%`);
}

// Update the rectangle progress bar (for profile)
function updateRectangleProgress() {
    const progressBar = document.querySelector('.xp-bar');
    const progressPercentage = (xp / xpPerLevel) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    console.log(`Rectangle Progress: ${progressPercentage}%`);
}

// Update the user's XP and save it to the database
async function updateXP(amount) {
    try {
        console.log('Updating XP...');
        xp += amount;

        if (xp >= xpPerLevel) {
            xp -= xpPerLevel;
            level += 1;
        }

        const response = await fetch(`/api/users/${userId}/xp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ xpChange: amount }), 
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
