import mongoose from "mongoose";

const lessonContentModel = new mongoose.Schema({
    lessonId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Lesson'
         },
  contentType: {
     type: String, 
     enum: ['quiz', 'fill_in_the_blank', 'vocabulary', 'lesson'],
     required: true 
    },
  content: { 
    type: String,
     required: true
     }
});

export default mongoose.model("LessonContent", lessonContentModel);

