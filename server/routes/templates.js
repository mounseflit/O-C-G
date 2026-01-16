import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Template from '../models/Template.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all templates for user
router.get('/', async (req, res) => {
    try {
        const templates = await Template.find({ userId: req.userId })
            .sort({ isPinned: -1, createdAt: -1 });

        res.json({ templates });
    } catch (error) {
        console.error('Get templates error:', error);
        res.status(500).json({ error: 'Failed to fetch templates.' });
    }
});

// Get single template
router.get('/:id', async (req, res) => {
    try {
        const template = await Template.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!template) {
            return res.status(404).json({ error: 'Template not found.' });
        }

        res.json({ template });
    } catch (error) {
        console.error('Get template error:', error);
        res.status(500).json({ error: 'Failed to fetch template.' });
    }
});

// Create template
router.post('/', async (req, res) => {
    try {
        const { title, description, category, content, placeholders, isPinned } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }

        const template = new Template({
            userId: req.userId,
            title,
            description: description || '',
            category: category || 'General',
            content,
            placeholders: placeholders || [],
            isPinned: isPinned || false
        });

        await template.save();
        res.status(201).json({ template });
    } catch (error) {
        console.error('Create template error:', error);
        res.status(500).json({ error: 'Failed to create template.' });
    }
});

// Update template
router.put('/:id', async (req, res) => {
    try {
        const { title, description, category, content, placeholders, isPinned } = req.body;

        const template = await Template.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!template) {
            return res.status(404).json({ error: 'Template not found.' });
        }

        if (title !== undefined) template.title = title;
        if (description !== undefined) template.description = description;
        if (category !== undefined) template.category = category;
        if (content !== undefined) template.content = content;
        if (placeholders !== undefined) template.placeholders = placeholders;
        if (isPinned !== undefined) template.isPinned = isPinned;

        await template.save();
        res.json({ template });
    } catch (error) {
        console.error('Update template error:', error);
        res.status(500).json({ error: 'Failed to update template.' });
    }
});

// Toggle pin
router.patch('/:id/pin', async (req, res) => {
    try {
        const template = await Template.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!template) {
            return res.status(404).json({ error: 'Template not found.' });
        }

        template.isPinned = !template.isPinned;
        await template.save();
        res.json({ template });
    } catch (error) {
        console.error('Toggle pin error:', error);
        res.status(500).json({ error: 'Failed to toggle pin.' });
    }
});

// Duplicate template
router.post('/:id/duplicate', async (req, res) => {
    try {
        const original = await Template.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!original) {
            return res.status(404).json({ error: 'Template not found.' });
        }

        const duplicate = new Template({
            userId: req.userId,
            title: `${original.title} - Copy`,
            description: original.description,
            category: original.category,
            content: original.content,
            placeholders: original.placeholders,
            isPinned: false,
            isDefault: false
        });

        await duplicate.save();
        res.status(201).json({ template: duplicate });
    } catch (error) {
        console.error('Duplicate template error:', error);
        res.status(500).json({ error: 'Failed to duplicate template.' });
    }
});

// Delete template
router.delete('/:id', async (req, res) => {
    try {
        const template = await Template.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!template) {
            return res.status(404).json({ error: 'Template not found.' });
        }

        res.json({ message: 'Template deleted successfully.' });
    } catch (error) {
        console.error('Delete template error:', error);
        res.status(500).json({ error: 'Failed to delete template.' });
    }
});

export default router;
