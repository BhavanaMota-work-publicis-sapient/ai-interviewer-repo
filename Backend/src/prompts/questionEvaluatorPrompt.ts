interface BuildQuestionEvaluatorPromptParams {
  role: string;
  level: string;
  question: string;
  answer: string;
  rubric: unknown; // Replace with a more specific type if you know the rubric structure
}

function buildQuestionEvaluatorPrompt({
  role,
  level,
  question,
  answer,
  rubric,
}: BuildQuestionEvaluatorPromptParams): string {
  return `
You are an expert technical interviewer.

Evaluate ONE interview answer.

Role:
${role}

Experience Level:
${level}

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluation Rubric:
${JSON.stringify(rubric, null, 2)}

Instructions:

1. Score every rubric category from 1 to 5.
2. Base scores ONLY on the candidate's answer.
3. Do NOT assume knowledge that was not mentioned.
4. Quote evidence from the answer.
5. Mention missing concepts.
6. Give concise feedback.
7. Return ONLY valid JSON.

JSON Schema:

{
  "question": "",
  "scores": {
    "Technical Accuracy": {
      "score": 0,
      "feedback": "",
      "evidence": ""
    },
    "Depth of Knowledge": {
      "score": 0,
      "feedback": "",
      "evidence": ""
    },
    "Problem Solving": {
      "score": 0,
      "feedback": "",
      "evidence": ""
    },
    "Communication": {
      "score": 0,
      "feedback": "",
      "evidence": ""
    },
    "Best Practices": {
      "score": 0,
      "feedback": "",
      "evidence": ""
    },
    "Real-world Experience": {
      "score": 0,
      "feedback": "",
      "evidence": ""
    }
  },
  "strengths": [],
  "weaknesses": [],
  "missingTopics": [],
  "overallFeedback": ""
}
`;
}

export default buildQuestionEvaluatorPrompt;
