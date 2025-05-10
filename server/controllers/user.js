const User = require('../models/user');
// const { v4: uuidv4 } = require('uuid');
const { setSessionUser } = require('../service/auth');
async function handleSignup(req,res){
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:'Please fill all fields'});
    }
    try{
        const user = await User.find({email});
        if(user.length > 0){
            return res.status(400).json({error:'User already exists'});
        }
        await User.create({name, email, password});
        return res.status(201).json({message:'Sign up was successful!'});
    }
    catch(err){
        return res.status(500).json({error:'Internal server error'});
    }
    // return res.redirect('/login');
}
async function handleLogin(req,res){
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({error:'Please fill all fields'});
    }
    try{
        const user = await User.findOne({email,password});

        if(!user){
            return res.status(400).json({error:'Invalid email or password'});
        }
        const token = setSessionUser(user);
        res.cookie('uid', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production',  // Ensures the cookie is sent over HTTPS only
            sameSite: 'lax', // Helps prevent CSRF attacks
        });
        return res.status(200).json({ message: 'Login successful', user });
    }catch(e){
        return res.status(500).json({error:'Internal server error'});
    }
    // req.session.user = user;
}
async function handleLogout(req,res){
    res.clearCookie('uid');
    return res.status(200).json({message:'Logout successful'});
}
module.exports={
    handleSignup,
    handleLogin,
    handleLogout
}