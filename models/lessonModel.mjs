import mongoose from 'mongoose';

const LessonModel = new mongoose.Schema({
  title: { type: String, required: true },
  lessonOrder: { type: Number, required: true },
  content: { type: String, required: true }, // Main lesson text
  quiz: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  fill_in_the_blank: [
    {
      sentence: String,
      answer: String,
    },
  ],
  vocabulary: [
    {
      word: String,
      definition: String,
    },
  ],
  lesson: { 
    type: String, 
    required: true },
});

module.exports = mongoose.model('Lesson', LessonModel);
