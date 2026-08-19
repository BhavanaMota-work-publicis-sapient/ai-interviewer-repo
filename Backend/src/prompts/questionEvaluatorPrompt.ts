
interface BuildQuestionEvaluatorPromptParams {
 
  question: string;
  answer: string;
}

function buildQuestionEvaluatorPrompt({
  question,
  answer,
}: BuildQuestionEvaluatorPromptParams):string {
  return `
You are an expert interviewer quality auditor evaluating the quality and professionalism of an AI/human technical interview.

Your task is to evaluate the INTERVIEWER based ONLY on the interview question and the candidate's answer provided below.

Do NOT evaluate the candidate's technical ability.
Do NOT assume anything that is not present in the provided conversation.
If there is insufficient evidence to evaluate a criterion, explicitly mention that evidence is unavailable.

INTERVIEW QUESTION:
${question}

CANDIDATE ANSWER:
${answer}

EVALUATION CRITERIA:

1. Question Preparation
Evaluate whether the question appears well-prepared, relevant to the candidate's role and experience level, technically appropriate, and clearly worded.

2. Interview Opening
Evaluate how professionally the interviewer introduced the interview and transitioned into the question.
Look for:
- Professional greeting
- Clear introduction
- Appropriate context
- Clear explanation of what is expected
- Professional and respectful tone

If the provided question does not contain the opening, mark this criterion as "Insufficient Evidence".

3. Probing and Evaluation
Evaluate whether the interviewer appears to probe the candidate appropriately based on the answer.
Look for:
- Relevant follow-up questions
- Clarification of incomplete answers
- Challenging the candidate appropriately
- Exploring depth of knowledge
- Avoiding leading or biased questions
- Evaluating the candidate fairly

Important:
A single question and answer may not provide enough evidence to evaluate probing. Do not assume probing occurred.

4. Proctoring and Integrity
Evaluate only if there is evidence related to interview integrity, suspicious behavior, cheating, external assistance, or proctoring.

Do NOT claim that cheating occurred simply because there is no proctoring information.

If there is no evidence, return "Insufficient Evidence".

5. Brand and Corporate Standards
Evaluate whether the interviewer demonstrates professional behavior consistent with a corporate technical interview.

Look for:
- Respectful communication
- Professional language
- Neutral and unbiased behavior
- Appropriate interaction with the candidate
- No discriminatory or inappropriate comments
- No unprofessional behavior

Do not claim that a specific company brand was represented unless there is explicit evidence.

6. Interview Closing
Evaluate whether the interviewer closed the interview professionally.

Look for:
- Thanking the candidate
- Explaining next steps
- Providing an opportunity for questions
- Professional closing

If closing information is not provided, return "Insufficient Evidence".

SCORING:

Score each criterion from 1 to 5.

1 = Very Poor
2 = Poor
3 = Acceptable
4 = Good
5 = Excellent

Use "Insufficient Evidence" when the provided question and answer do not contain enough information to make a fair evaluation.

IMPORTANT RULES:

- Base the evaluation ONLY on the supplied question and answer.
- Do not infer missing interviewer behavior.
- Do not evaluate the candidate's technical correctness.
- Do not penalize the interviewer for information that is simply unavailable.
- Quote specific evidence from the conversation whenever possible.
- Clearly identify missing information.
- Be objective and concise.

Return ONLY valid JSON using exactly this structure:

{
  "question": "${question.replace(/"/g, '\\"')}",
  "scores": {
    "Question Preparation": {
      "score": 0,
      "feedback": "",
      "evidence": "",
      "missingInformation": ""
    },
    "Interview Opening": {
      "score": 0,
      "feedback": "",
      "evidence": "",
      "missingInformation": ""
    },
    "Probing and Evaluation": {
      "score": 0,
      "feedback": "",
      "evidence": "",
      "missingInformation": ""
    },
    "Proctoring and Integrity": {
      "score": 0,
      "feedback": "",
      "evidence": "",
      "missingInformation": ""
    },
    "Brand and Corporate Standards": {
      "score": 0,
      "feedback": "",
      "evidence": "",
      "missingInformation": ""
    },
    "Interview Closing": {
      "score": 0,
      "feedback": "",
      "evidence": "",
      "missingInformation": ""
    }
  },
  "strengths": [],
  "weaknesses": [],
  "missingInformation": [],
  "overallFeedback": ""
}
`;
}

export default buildQuestionEvaluatorPrompt;
