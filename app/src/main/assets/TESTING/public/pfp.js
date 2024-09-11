document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('uploadForm');
    const profilePicInput = document.getElementById('profilePicInput');
    const currentProfilePic = document.getElementById('currentProfilePic');

    // Get user ID from token
    const userId = getUserIdFromToken();
    if (!userId) {
        window.location.href = '/login.html';
        return;
    }

    // Fetch the current profile picture if it exists
    async function fetchUserProfilePic() {
        try {
            const response = await fetch(`/api/users/${userId}`);
            const userData = await response.json();
            if (userData.profilePicture) {
                currentProfilePic.src = userData.profilePicture;
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    }

    fetchUserProfilePic();

    // Handle form submission for profile picture upload
    uploadForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (profilePicInput.files.length === 0) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('profilePic', profilePicInput.files[0]);

        try {
            const response = await fetch(`/api/users/${userId}/profile-picture`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const updatedUser = await response.json();
                currentProfilePic.src = updatedUser.profilePicture;
                alert('Profile picture updated successfully!');
            } else {
                alert('Failed to upload profile picture.');
            }
        } catch (err) {
            console.error('Error uploading profile picture:', err);
        }
    });

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
});
