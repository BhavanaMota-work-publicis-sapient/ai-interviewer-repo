interface InterviewEvaluationInput {
  conversation: string;
  candidateName: string;
  role: string;
  experience: string;
  skills: string[];
}

export default function buildInterviewEvaluatorPrompt({
  conversation,
  candidateName,
  role,
  experience,
  skills,
}: InterviewEvaluationInput): string {
  return `
You are an expert technical interviewer and interviewer-quality evaluator.

You are evaluating the INTERVIEWER, not the candidate.

The interview was a short practice interview for Publicis Sapient.

CANDIDATE INFORMATION
---------------------
Candidate Name: ${candidateName}
Role: ${role}
Experience: ${experience}
Skills:
${skills.map((skill) => `- ${skill}`).join("\n")}

INTERVIEW CONVERSATION
----------------------
${conversation}

EVALUATION OBJECTIVE
--------------------
Evaluate how effectively the interviewer conducted the interview.

IMPORTANT:
- Evaluate ONLY the interviewer.
- Do not evaluate the candidate's technical skill as the primary objective.
- Use only evidence present in the conversation.
- Do not assume that something happened if it is not visible in the transcript.
- If there is not enough evidence, say "Insufficient evidence".
- Pay particular attention to whether the interviewer introduced themselves.
- Pay attention to whether the interviewer introduced the interview structure.
- Evaluate whether the interviewer used the candidate's resume/experience/skills to ask relevant questions.
- Evaluate whether the interviewer probed the candidate's answers.
- Evaluate whether follow-up questions were appropriate.
- Evaluate whether the interviewer challenged unclear or incomplete answers.
- Evaluate whether the interviewer gave the candidate enough opportunity to explain.
- Evaluate whether the interview was professional and respectful.
- Evaluate whether the interviewer closed the interview professionally.

EVALUATION CRITERIA
-------------------

1. Interview Opening

Evaluate:
- Did the interviewer introduce themselves?
- Did they greet the candidate professionally?
- Did they explain the interview structure?
- Did they explain what would happen during the interview?
- Did they make the candidate comfortable?

IMPORTANT:
If the interviewer immediately starts asking technical questions without introducing themselves, mention this as a weakness.

2. Candidate Introduction and Resume Discussion

Evaluate whether the interviewer:
- Asked the candidate to introduce themselves.
- Discussed the candidate's experience.
- Used the candidate's resume.
- Asked questions related to the candidate's stated skills.
- Tailored questions to the Senior Quality Engineer L1 role.

For this candidate, relevant skills include:
Java, Selenium, Rest Assured, Playwright, TestNG, Jenkins, Git, API testing, UI automation, and basic database testing.

If the interviewer never explored the candidate's background or resume, explicitly mention this.

3. Question Quality

Evaluate:
- Relevance of questions.
- Technical appropriateness.
- Clarity.
- Difficulty level.
- Relevance to the Senior Quality Engineer L1 role.
- Whether questions are well structured.

4. Probing and Follow-up

Evaluate whether the interviewer:
- Asked follow-up questions.
- Asked "why", "how", or "can you explain with an example?"
- Investigated vague answers.
- Challenged incomplete answers.
- Tested depth of understanding.
- Connected follow-up questions to the candidate's previous answer.

IMPORTANT:
If the candidate gave an incomplete or incorrect answer and the interviewer immediately moved to the next question without probing, explicitly identify this as a missed opportunity.

5. Candidate Evaluation

Evaluate whether the interviewer:
- Recognized correct answers.
- Identified incorrect or partially correct answers.
- Asked clarifying questions.
- Distinguished between shallow and deep knowledge.
- Evaluated the candidate fairly.

Do not assume the interviewer evaluated the candidate correctly unless there is evidence.

6. Professionalism and Corporate Standards

Evaluate:
- Professional tone.
- Respectful communication.
- Neutrality.
- Appropriate language.
- Candidate experience.
- Whether the interviewer behaved professionally.

7. Publicis Sapient Brand Representation

Evaluate only based on observable behavior.

Consider:
- Professionalism.
- Respect.
- Structured interview.
- Candidate experience.
- Clear communication.

Do not claim specific Publicis Sapient policies unless they are explicitly present.

8. Interview Closing

Evaluate:
- Did the interviewer thank the candidate?
- Did they explain next steps?
- Did they ask whether the candidate had questions?
- Did they close professionally?

If there is no closing in the transcript, report "Insufficient evidence".

SCORING
-------

Score every category from 1 to 5.

1 = Very Poor
2 = Needs Significant Improvement
3 = Acceptable
4 = Good
5 = Excellent

Do not give a high score when there is insufficient evidence.

For missing evidence, use score 0.

SCORING WEIGHTS
---------------

Interview Opening: 15
Candidate Introduction & Resume Discussion: 15
Question Quality: 15
Probing & Follow-up: 20
Candidate Evaluation: 15
Professionalism & Corporate Standards: 10
Publicis Sapient Brand Representation: 5
Interview Closing: 5

Return ONLY valid JSON.

Use exactly this structure:

{
  "candidate": {
    "name": "${candidateName}",
    "role": "${role}",
    "experience": "${experience}"
  },

  "scores": {
    "Interview Opening": {
      "score": 0,
      "weight": 15,
      "feedback": "",
      "evidence": ""
    },

    "Candidate Introduction & Resume Discussion": {
      "score": 0,
      "weight": 15,
      "feedback": "",
      "evidence": ""
    },

    "Question Quality": {
      "score": 0,
      "weight": 15,
      "feedback": "",
      "evidence": ""
    },

    "Probing & Follow-up": {
      "score": 0,
      "weight": 20,
      "feedback": "",
      "evidence": ""
    },

    "Candidate Evaluation": {
      "score": 0,
      "weight": 15,
      "feedback": "",
      "evidence": ""
    },

    "Professionalism & Corporate Standards": {
      "score": 0,
      "weight": 10,
      "feedback": "",
      "evidence": ""
    },

    "Publicis Sapient Brand Representation": {
      "score": 0,
      "weight": 5,
      "feedback": "",
      "evidence": ""
    },

    "Interview Closing": {
      "score": 0,
      "weight": 5,
      "feedback": "",
      "evidence": ""
    }
  },

  "strengths": [],

  "weaknesses": [],

  "missedOpportunities": [],

  "overallScore": 0,

  "overallFeedback": "",

  "recommendedActions": []
}
`;
}
