import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import buildInterviewEvaluatorPrompt from "../prompts/interviewEvaluatorPrompt.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

interface EvaluateInterviewInput {
  conversation: string;
  candidateName: string;
  role: string;
  experience: string;
  skills: string[];
}

export default async function evaluateInterview({
  conversation,
  candidateName,
  role,
  experience,
  skills,
}: EvaluateInterviewInput) {
  const prompt = buildInterviewEvaluatorPrompt({
    conversation,
    candidateName,
    role,
    experience,
    skills,
  });

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