import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const SALT_ROUNDS = 10;

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
    nativeLanguage:{
        type: String,
        required: true
    },
    targetLanguage:{
        type: String,
        required: true
    },
    progress:[
        {
            lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
            completed: { type: Boolean, default: false },
          }
    ]

    


});

// Hash the password before saving the user
userModel.pre('save', async function (next) {
    // 'this' is the user doc - this will be set to the user doc that is being saved
    if(!this.isModified('password')) return next();
    // password has been changed - salt and hash it
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next()
});

export default mongoose.model("User", userModel);