import express from 'express';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get current user profile
router.get('/me', async (req, res) => {
    res.json({ user: req.user.toJSON() });
});

// Update user profile
router.put('/me', async (req, res) => {
    try {
        const { name, company, preferences } = req.body;

        const updates = {};
        if (name) updates.name = name;
        if (company !== undefined) updates.company = company;
        if (preferences) {
            if (preferences.theme) updates['preferences.theme'] = preferences.theme;
            if (preferences.language) updates['preferences.language'] = preferences.language;
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: updates },
            { new: true }
        );

        res.json({ user: user.toJSON() });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile.' });
    }
});

// Change password
router.put('/password', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current and new password are required.' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters.' });
        }

        const user = await User.findById(req.userId);
        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(401).json({ error: 'Current password is incorrect.' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Failed to change password.' });
    }
});

export default router;
