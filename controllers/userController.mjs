import User from '../models/userModel.mjs';

// Create a new user
export const createUser = async (req,res) =>{
    const {email, username} = req.body;
    try{
        const user = await User.create({email, username});
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

// Get all users
export const getUsers = async (req,res) =>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(404).json({error: error.message});
    }
};

