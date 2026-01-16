import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: 'General'
    },
    content: {
        type: String,
        required: true
    },
    placeholders: [{
        type: String
    }],
    isPinned: {
        type: Boolean,
        default: false
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
templateSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Index for faster queries
templateSchema.index({ userId: 1, isPinned: -1, createdAt: -1 });

export default mongoose.model('Template', templateSchema);
