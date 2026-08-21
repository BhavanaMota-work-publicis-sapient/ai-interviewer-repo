import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import convertTranscriptToConversation from "../utils/convertTranscriptIntoConversation.js";
import evaluateInterview from "../services/questionEvaluator.js";

dotenv.config();

const router = express.Router();

router.get("/:sessionId", async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://api.liveavatar.com/v1/sessions/${req.params.sessionId}/transcript`,
      {
        headers: {
          "X-API-KEY": process.env.LIVEAVATAR_API_KEY!,
        },
      },
    );

    const data = await response.json();

    const transcriptData = data.data.transcript_data;

    const conversation = convertTranscriptToConversation(transcriptData);

    const interviewerEvaluation = await evaluateInterview({
      conversation,
      candidateName: "Manmeet Singh",
      role: "Senior Quality Engineer L1",
      experience: "7 years",
      skills: [
        "Java",
        "Selenium",
        "Rest Assured",
        "Playwright",
        "TestNG",
        "Jenkins",
        "Git",
        "API testing",
        "UI automation",
        "Basic database testing",
      ],
    });

    console.log(
      "Interviewer Evaluation:",
      JSON.stringify(interviewerEvaluation, null, 2),
    );

    res.json({
      report: interviewerEvaluation,
      transcriptData: conversation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

export default router;
