require("dotenv").config();

// const prompt = require("./prompts/mock.js");

const {GoogleGenAI} = require("@google/genai");
 const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const prompt =`
You are an expert technical interviewer.

Evaluate ONE interview answer.

Role:
Senior Frontend Engineer

Experience Level:
Senior

Interview Question:
Hi Pavna, it's great to meet you! Thank you for joining this interview. To start off, I’d like to ask you a foundational question about React. Can you explain the difference between class components and functional components in React? What are the advantages of using functional components with hooks?

Candidate Answer:
Yeah, sure. Class components are the legacy one, , which requires a lot of boilerplate code to write, whereas functional components are the new one which was introduced in React 16.18— 16.8. Functional components made our life easy, which left less boilerplate code. For state management in functional components, we used to use useState hook, whereas in class components we use this.state and this.setState. For lifecycle methods in functional components, we use useEffect.
`

// async function listModels() {
//   const models = await ai.models.list();

//   for await (const model of models) {
//     console.log(model.name);
//   }
// }

// listModels().catch(console.error);

async function test() {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt
  });

  console.log(response.text);
}

test();
