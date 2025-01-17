const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true }, // New field
    last_name: { type: String, required: true },  // New field
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bannerPicture: { type: String },
    level: { type: Number, default: 1 },
    experience: { type: Number, default: 0 },
    quizzesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }]
});


// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);

// Set up multer for file uploads
const profileStorage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, `${req.params.userId}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const bannerStorage = multer.diskStorage({
    destination: './public/uploads/banners/',
    filename: (req, file, cb) => {
        cb(null, `${req.params.userId}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadProfile = multer({ storage: profileStorage });
const uploadBanner = multer({ storage: bannerStorage });


// Register
router.post('/register', async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            first_name, // Save first_name
            last_name,  // Save last_name
            username,
            email,
            password
        });

        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, 'jwtSecret', { expiresIn: 3600 });
        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch User Data
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/:userId/xp', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Calculate new experience
        let newXP = user.experience + req.body.xpChange;
        
        // Level up if XP exceeds 100
        while (newXP >= 100) {
            newXP -= 100;
            user.level += 1;
        }
        
        // Ensure XP doesn't drop below 0
        while (newXP < 0) {
            if (user.level > 1) {
                newXP += 100;
                user.level -= 1;
            } else {
                newXP = 0;
                break;
            }
        }

        user.experience = newXP;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/:userId/profile-picture', uploadProfile.single('profilePic'), async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Delete old profile picture if it exists
        if (user.profilePicture) {
            const oldPicPath = path.join(__dirname, '../public', user.profilePicture);
            fs.unlink(oldPicPath, (err) => {
                if (err) console.error('Error deleting old profile picture:', err);
            });
        }

        // Save new profile picture path
        user.profilePicture = `/uploads/${req.file.filename}`;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload banner route
router.post('/:userId/banner-picture', uploadBanner.single('bannerPic'), async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Delete the old banner if it exists
        if (user.bannerPicture) {
            const oldBannerPath = path.join(__dirname, '../public', user.bannerPicture);
            fs.unlink(oldBannerPath, (err) => {
                if (err) console.error('Error deleting old banner:', err);
            });
        }

        // Save new banner path
        user.bannerPicture = `/uploads/banners/${req.file.filename}`;
        await user.save();
        res.json({ bannerPicture: user.bannerPicture });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
