import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

import dotenv from 'dotenv';
dotenv.config();

// initialize the OpenAI service
const model = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.7,
    maxTokens: 700,
});

// Function to generate the template dynamically
const lessonTemplates = {
    lesson: `
    You are a language tutor. Generate a {level}-friendly {type} for learning {language}.
     The {type} should include the following elements: 

      - **Introduction**: A short paragraph introducing the topic in a clear, engaging way.
      - **Vocabulary**: A bullet-point list of key vocabulary words, with their translations in {language}.
      - **Examples**: A numbered list of example sentences using the vocabulary words.
      - **Exercise**: A fill-in-the-blank or multiple-choice exercise with the answers after the exercise.
      - **Answers**: The answers to the exercise.
      Formatting:
          When creating the response:
        - Follow the Markdown format for each section.
        - Provide practical examples for each vocabulary word.
        - Make the exercise engaging and interactive for {level} learners.
        
    `,
    vocabulary: `
 You are a language tutor. Generate a {level}-friendly {type} for learning {language}.
      **Introduction**: A fun quiz designed to test {level} learners' understanding of {language}.
      **Vocabulary**: List key words with the translation in {translation} in parenthesis.
      **Quiz Questions**: Include 5 multiple-choice questions (with 4 options each), with only one correct answer. The quiz should be only in {language}. It should test the learners' understanding of the vocabulary words explained in the lesson.
      **Answers**: Provide answers in a numbered format with an explanation of why each answer is correct.
        Formatting:
        -When creating the response:
        - Follow the Markdown format for each section.
        - Make the quiz engaging and interactive for {level} learners.
        - Include questions that test the learners' understanding of the vocabulary words.
    `,
    quiz: `
You are a language tutor. Generate a {level}-friendly {type} for learning {language}.
        **Quiz Questions**: Include 5 multiple-choice questions (with 4 options each), with only one correct answer. The quiz should be only in {language}.
         It should test the learners' understanding of the vocabulary words, grammar, and sentence structure. It should be engaging and interactive for {level} learners.
         The quiz should be challenging but not too difficult for {level} learners. The questions should be clear and concise, and the options should be relevant and plausible.
         The quiz should cover a range of topics related to {language}, including vocabulary, grammar,prepositions, and sentence structure.

         Notes:
         The answer shoud be provided in a numbered format at the end of the quiz.
         Do not provide an introduction or explanation for the quiz. The focus should be on the questions and answers.
         Do not provide explanations for the answers. 
         Do not provide any additional information or context for the quiz. The focus should be on the questions and answers.

         `,
    fill_in_the_blank: `
You are a language tutor. Generate a {level}-friendly {type} for learning {language}.
        **Exercise**: Create a fill-in-the-blank exercise with 5 sentences. The sentences should be in {language} and should test the learners' understanding of the vocabulary words, grammar, and sentence structure.
        For each sentence, provide a blank space where the learners need to fill in the missing word. Include a list of words as options for each blank space. Only one word from the list should fit in the blank space.
        **Answers**: Provide the answers to the exercise in a numbered format.
        Formatting:
        - When creating the response:
        - Follow the Markdown format for each section.
        - Make the exercise engaging and interactive for {level} learners.
        - Include sentences that test the learners' understanding of the vocabulary words, grammar, and sentence structure.
        `,

};
// Function to generate the prompt dynamically
const generateLesson = async (language, level, type, translation) => {
    try {
        const template = lessonTemplates[type];

        if (!template) {
            throw new Error(`Invalid lesson type: ${type}`);
        }

        // Create the prompt template
        const prompt = new PromptTemplate({
            template,
            inputVariables: ["language", "level", "type", "translation"],
        });

        // Create the lesson chain
        const lessonChain = RunnableSequence.from([prompt, model]);

        // Invoke the chain and get the response
        const response = await lessonChain.invoke({ language, level, type, translation });
        return response;
    } catch (error) {
        console.error("Error generating lesson:", error);
        return "There was an error generating the lesson.";
    }
};

export { generateLesson };
