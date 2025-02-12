import mongoose from "mongoose";


const UserProgressSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
        },
    lessonId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Lesson' 
    },
    completed: { 
        type: Boolean,
         default: false 
        }
  });
  

const UserProgress = mongoose.model('UserProgress', UserProgressSchema);

export default UserProgress;