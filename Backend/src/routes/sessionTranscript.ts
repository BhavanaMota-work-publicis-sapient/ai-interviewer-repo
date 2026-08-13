import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import convertTranscriptToQA from "../utils/convertTranscript.js";
import evaluateQuestion from "../services/questionEvaluator.js";
import rubric from "../utils/rubric.js";
import calculateInterviewResult from "../utils/calculateInterviewResult.js";
import convertTranscriptToConversation from "../utils/convertTranscriptIntoConversation.js";


dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const router = express.Router();

// const FILE = path.join(__dirname, "../transcripts/candidate.json");

router.get("/:sessionId", async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://api.liveavatar.com/v1/sessions/${req.params.sessionId}/transcript`,
      {
        headers: {
          "X-API-KEY": process.env.LIVEAVATAR_API_KEY!,
        },
      }
    );

    const data = await response.json();

    const transcriptData = data.data.transcript_data;

    const qaData = convertTranscriptToQA(transcriptData);

    // fs.writeFileSync(FILE, JSON.stringify(qaData, null, 2));

    const evaluationResults: any[] = [];

    for (const questionAndAnswer of qaData.questions) {
      const evaluation = await evaluateQuestion({
        role: "Senior Frontend Engineer",
        level: "Senior",
        rubric,
        question: questionAndAnswer.question,
        answer: questionAndAnswer.answer,
      });

      console.log("Evaluation for question and answer:", questionAndAnswer);
      evaluationResults.push(evaluation);
    }

    console.log(
      "All Evaluations:",
      JSON.stringify(evaluationResults, null, 2)
    );

    const report = calculateInterviewResult(evaluationResults, rubric);

    console.log("FINAL Report", JSON.stringify(report, null, 2));

    res.json({
      report,
      transcriptData: convertTranscriptToConversation(transcriptData),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

export default router;