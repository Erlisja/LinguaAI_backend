import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
        
    },
    password:{
        type: String,
        required: true
    },
    lessonsCompleted:{
        type:[String],
        default: [] // default value is an empty array meaning no lessons have been completed
    },
    quizzesCompleted:{
        type:[String],
        default: [] // default value is an empty array meaning no quizzes have been completed
    }
});

export default mongoose.model("User", userModel);