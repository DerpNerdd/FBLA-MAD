document.addEventListener('DOMContentLoaded', function () {
    const userId = getUserIdFromToken();

    if (!userId) {
        console.error('User not authenticated');
        window.location.href = '/login.html';
        return;
    }

    loadProfilePic(userId);
    loadBannerPic(userId);

    // Click on profile picture to upload
    const profilePicDiv = document.getElementById('profile-pic');
    const profilePicInput = document.getElementById('profile-upload');
    
    if (profilePicDiv && profilePicInput) {
        profilePicDiv.addEventListener('click', function() {
            profilePicInput.click();  // Simulate click on hidden input
        });

        // Handle profile picture upload
        profilePicInput.addEventListener('change', function () {
            uploadProfilePic(userId);
        });
    }

    // Click on banner to upload
    const bannerDiv = document.getElementById('banner');
    const bannerInput = document.getElementById('banner-upload');

    if (bannerDiv && bannerInput) {
        bannerDiv.addEventListener('click', function() {
            bannerInput.click();  // Simulate click on hidden input
        });

        // Handle banner picture upload
        bannerInput.addEventListener('change', function () {
            uploadBanner(userId);
        });
    }
});

function getUserIdFromToken() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    } catch (e) {
        console.error('Invalid token:', e);
        return null;
    }
}

function loadProfilePic(userId) {
    fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            if (user.profilePicture) {
                document.getElementById('profile-pic').style.backgroundImage = `url(${user.profilePicture})`;
            }
        })
        .catch(err => console.error('Error loading profile picture:', err));
}

function loadBannerPic(userId) {
    fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            if (user.bannerPicture) {
                document.getElementById('banner').style.backgroundImage = `url(${user.bannerPicture})`;
            }
        })
        .catch(err => console.error('Error loading banner picture:', err));
}

function uploadProfilePic(userId) {
    const input = document.getElementById('profile-upload');
    if (!input.files.length) {
        console.error('No profile picture selected.');
        return;
    }

    const formData = new FormData();
    formData.append('profilePic', input.files[0]);

    fetch(`/api/users/${userId}/profile-picture`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.profilePicture) {
            document.getElementById('profile-pic').style.backgroundImage = `url(${data.profilePicture})`;
        }
    })
    .catch(err => console.error('Error uploading profile picture:', err));
}

function uploadBanner(userId) {
    const bannerInput = document.getElementById('banner-upload');
    if (!bannerInput.files.length) {
        console.error('No banner selected.');
        return;
    }

    const formData = new FormData();
    formData.append('bannerPic', bannerInput.files[0]);

    fetch(`/api/users/${userId}/banner-picture`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.bannerPicture) {
            document.getElementById('banner').style.backgroundImage = `url(${data.bannerPicture})`;
        }
    })
    .catch(err => console.error('Error uploading banner picture:', err));
}
