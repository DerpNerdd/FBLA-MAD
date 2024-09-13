// profile.js (client-side)
document.addEventListener('DOMContentLoaded', function () {
    const userId = getUserIdFromToken();

    if (!userId) {
        console.error('User not authenticated');
        window.location.href = '/login.html';
        return;
    }

    loadProfilePic(userId);
    loadBannerPic(userId);

    // Profile picture edit button
    const editProfilePicBtn = document.getElementById('edit-button');
    if (editProfilePicBtn) {
        editProfilePicBtn.addEventListener('click', function () {
            document.getElementById('profilePicInput').click();
        });
    }

    // Banner edit button
    const editBannerBtn = document.getElementById('edit-banner');
    if (editBannerBtn) {
        editBannerBtn.addEventListener('click', function () {
            document.getElementById('banner-input').click();
        });
    }

    // Profile picture input change
    const profilePicInput = document.getElementById('profilePicInput');
    if (profilePicInput) {
        profilePicInput.addEventListener('change', function () {
            uploadProfilePic(userId);
        });
    }

    // Banner input change
    const bannerInput = document.getElementById('banner-input');
    if (bannerInput) {
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
    const input = document.getElementById('profilePicInput');
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
    const input = document.getElementById('banner-input');
    const formData = new FormData();
    formData.append('bannerPic', input.files[0]);

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
