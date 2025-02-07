import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body,validationResult } from 'express-validator';
import User from '../models/userModel.mjs';

// Generate JWT Token
const generateToken = (userID) =>{
    return jwt.sign({id: userID}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
export const createUser = async(req,res) =>{
    const errors = validationResult(req);  // Finds the validation errors in this request and wraps them in an object with handy functions
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {username,email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }
        user = new User({
            username,
            email,
            password
        });
        await user.save();
        const token = generateToken(user._id);
        res.status(201).json({message: 'User created successfully', token});
    }catch(error){
        res.status(500).json({error: error.message});
    }

}

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async(req,res) =>{
    const errors = validationResult(req);  // Finds the validation errors in this request and wraps them in an
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: 'You entered an incorrect password'});
        }
        const token = generateToken(user._id);
        res.status(200).json({message: 'Login successful', token});

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//@route GET /api/users/guest
// this is a route for guest users
export const guestUser = async(req,res) =>{
    try{
        const guestToken = jwt.sign(
            {role: 'guest'},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.json({
            message: 'Guest access granted',
            guest: true,
            token: guestToken
        });
    }
    catch(error){
        res.status(500).json({error: error.message});
    }   
}