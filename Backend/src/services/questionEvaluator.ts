import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import  buildQuestionEvaluatorPrompt  from "../prompts/questionEvaluatorPrompt.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

interface EvaluateQuestionParams {
  role: string;
  level: string;
  rubric: unknown;
  question: string;
  answer: string;
}

async function evaluateQuestion({
  role,
  level,
  rubric,
  question,
  answer,
}: EvaluateQuestionParams): Promise<unknown> {
  const prompt = buildQuestionEvaluatorPrompt({
    role,
    level,
    rubric,
    question,
    answer,
  });

  console.log("Before Gemini");

  try {
    const responseAI = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    }) as any;

    console.log("After Gemini", responseAI.text);

    return JSON.parse(responseAI.text);
  } catch (error) {
    console.error("========== ERROR ==========");
    console.error(error);

    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }

    throw error;
  }
}

export default evaluateQuestion;