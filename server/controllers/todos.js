const Todo = require('../models/todo');
exports.getTodos = async (req, res) => {
    try {
        if(!req.user){
            console.log('User not found in request');
            return res.status(401).json({ message: 'Unauthorized' });
        } 
        console.log("Fetching todos for:", req?.user._id);
        const todos = await Todo.find({createdBy: req.user._id });
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.createTodo = async (req, res) => {
    const body = req.body;
    if (!body.title ) {
        return res.status(400).json({ message: 'Title is required.' });
    }

    try {
        console.log("req.user:",req.user);
        console.log("todo data:",{
            title:req.body.title,
            completed:req.body.completed,
            createdBy:req.user._id
        })
        console.log("Creating for", req.user?._id);
        const todo = await Todo.create({
            title: req.body.title,
            completed: req.body.completed,
            createdBy: req.user._id
        });
        return res.status(201).json({
            message: 'Todo created successfully',
            todo
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.getTodo = async(req,res) =>{
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        return res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.updateTodo = async(req,res)=> {
    const updates = {};
    if (req.body.title !== undefined ) updates.title = req.body.title;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;
    try {
        const todo = await Todo.findByIdAndUpdate(
            {_id: req.params.id, createdBy: req.user._id }, updates , { new: true });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        return res.json({message: 'Todo updated successfully', todo});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.deleteTodo = async(req,res)=>{
    try {
        const todo = await Todo.findByIdAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        return res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}