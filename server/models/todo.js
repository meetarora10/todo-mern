const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo;