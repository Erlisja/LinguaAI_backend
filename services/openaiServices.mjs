import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import json5 from 'json5';

import dotenv from 'dotenv';
dotenv.config();

// initialize the OpenAI service
const model = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.7,
    maxTokens: 1000,
});

// Function to generate the template dynamically
const lessonTemplates = {
    lesson: `
    You are an expert {language} tutor creating an {level}-level lesson for students in {language} language. 
The lessons focus on helping students speak {language}, communicate effectively, and understand the culture.

Provide a structured lesson in JSON format similar to the following:
{{
    "title": "Lesson Title",
    "lecture": "Introduction to the lesson's topic, explaining key points simply.",
    "content": "Detailed lesson content explaining the topic with examples.",
    "vocabulary": [
        {{
            "word": "example",
            "definition": "Meaning of the word",
            "translation": "Translation in {translate}"
}}
    ]
}}

Do not include any exercises or quizzes in this response.
Format the lesson in a clear and engaging way for {level} learners and the language you are teaching. The response should be formatted in JSON format with spaces and line breaks for readability.
`,
vocabulary: `
You are creating a vocabulary list for {level}-level students learning {language}.
Translate the words into {translate}.

Provide a structured JSON output with multiple words similar to the following:

{{
    "vocabulary": [
        {{ "word": "example", "definition": "Meaning of the word", "translation": "Translation in {translate}", "example": "Example sentence using the word" }},
        {{ "word": "word", "definition": "Meaning of the word", "translation": "Translation in {translate}", "example": "Example sentence using the word" }}
    ]
}}
    Create a list of 10 to 15  words from the dictionary and engaging for {level} learners. Include the meaning of each word, its translation in {translate}, and an example sentence using the word. The vocabulary list should be clear, concise, and easy to understand for {level}-level students learning {language} .
    The vocabulary words should cover a range of topics related to {language}, including common phrases, verbs, adjectives, and nouns. The words should be relevant to the lesson and help students improve their language skills.
`,
quiz: `
You are generating a multiple-choice quiz for {level}-level students in {language}, with answers translated into {translate}. 
Create diverse questions from different topics. The quiz should be engaging and interactive for students.
Provide a JSON output with multiple questions:

{{
    "quiz": [
        {{
            "question": "Here is a question in the selected language?",
            "options": ["Option 1", "Option 2", "Option 3", "Correct Option"],
            "correctAnswer": "Correct Option"
        }},
        {{
            "question": "Here is the second question in the selected language?",
            "options": ["Option A", "Option B", "Option C", "Correct Answer"],
            "correctAnswer": "Correct Answer"
        }}
    ]
}}

Create a quiz with 5 to 10 questions that test the students' knowledge of {language}. Include questions on vocabulary, grammar, sentence structure, and cultural aspects of the language. The quiz should be engaging and interactive for {level}-level students learning {language}.
         Notes:
         The answer should be provided in a numbered format at the end of the quiz.
         Do not provide an introduction or explanation for the quiz. The focus should be on the questions and answers.
         Do not provide explanations for the answers. 
         Do not provide any additional information or context for the quiz. The focus should be on the questions and answers.

         `,
    fill_in_the_blank: `
You are an expert {language} tutor creating an {level}-level fill-in-the-blanks exercise for students in {language} language. 

        **Exercise**: Create a fill-in-the-blank exercise with 10 sentences. The sentences should be in {language} and should test the learners' understanding of the vocabulary words, grammar, and sentence structure.
        For each sentence, provide a blank space where the learners need to fill in the missing word. Include a list of words as options for each blank space. Only one word from the list should fit in the blank space.

Provide a JSON output with multiple sentences following the format below:

{{
    "fill_in_the_blank": [
        {{ "sentence": "I ___ to the store every day.", "answer": "go" }},
        {{ "sentence": "She ___ very happy today.", "answer": "is" }},
        {{ "sentence": "Can you ___ me with this?", "answer": "help" }}
    ]
}}


        Formatting:
        - When creating the response:
        - Follow the Markdown format for each section.
        - Make the exercise engaging and interactive for {level} learners.
        - Include sentences that test the learners' understanding of the vocabulary words, grammar, and sentence structure.
        `,

};
const generateLesson = async (language, level, type, translate) => {
  try {
      const template = lessonTemplates[type];

      if (!template) {
          throw new Error(`Invalid lesson type: ${type}`);
      }

      // Create the prompt template
      const prompt = new PromptTemplate({
          template,
          inputVariables: ["language", "level", "type", "translate"],
      });

      // Create the lesson chain
      const lessonChain = RunnableSequence.from([prompt, model]);

      // Invoke the chain and get the response
      const response = await lessonChain.invoke({ language, level, type, translate });

      let parsedResponse;
      try {
          // First, attempt normal JSON parsing
          parsedResponse = JSON.parse(response);
      } catch (jsonError) {
          console.warn("Invalid JSON, attempting cleanup...");
          // Fallback: Try using `json5` for more flexible parsing
          parsedResponse = json5.parse(response.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]"));

      }

      return parsedResponse;
  } catch (error) {
      console.error("Error generating lesson:", error);
      return { error: "There was an error generating the lesson." };
  }
};

export { generateLesson };

