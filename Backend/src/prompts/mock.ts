const prompt=`You are an expert technical interviewer.

Evaluate ONE interview answer.

Role:
Senior Frontend Engineer

Experience Level:
Senior

Interview Question:
Hi Pamela, it's great to meet you! Let's dive into the interview. To start off, can you explain what the Virtual DOM is in React and how it differs from the real DOM?

Candidate Answer:
Yeah. Virtual DOM is a concept— there is a concept called reconciliation in React. It helps in performance optimization and make the element to appear faster and reduce the rendering process. What does it do is it creates a copy of the actual DOM. And whenever any— we do any changes, it compares the previous virtual DOM with the with a saved virtual DOM and finds the differences. Later, it, it does— instead of updating the whole tree, it only updates the nodes which are changed. So, ,

Evaluation Rubric:
{
  "role": "Senior Frontend Engineer",
  "level": "Senior",
  "experience": "7+ Years",
  "techStack": [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Redux",
    "GraphQL"
  ],
  "totalWeight": 100,
  "categories": [
    {
      "id": 1,
      "name": "Technical Accuracy",
      "description": "Correctness of technical concepts and explanations.",
      "weight": 30,
      "scoreGuide": {
        "1": "Incorrect or mostly incorrect.",
        "2": "Several technical mistakes.",
        "3": "Partially correct with gaps.",
        "4": "Mostly correct with minor mistakes.",
        "5": "Completely correct and accurate."
      }
    },
    {
      "id": 2,
      "name": "Depth of Knowledge",
      "description": "Understanding of underlying concepts and trade-offs.",
      "weight": 20,
      "scoreGuide": {
        "1": "Very shallow understanding.",
        "2": "Limited knowledge.",
        "3": "Moderate understanding.",
        "4": "Good conceptual depth.",
        "5": "Expert-level understanding."
      }
    },
    {
      "id": 3,
      "name": "Problem Solving",
      "description": "Ability to analyze and solve technical problems.",
      "weight": 15,
      "scoreGuide": {
        "1": "Unable to solve.",
        "2": "Requires major guidance.",
        "3": "Can solve basic problems.",
        "4": "Solves independently.",
        "5": "Excellent analytical thinking."
      }
    },
    {
      "id": 4,
      "name": "Communication",
      "description": "Ability to explain ideas clearly and logically.",
      "weight": 10,
      "scoreGuide": {
        "1": "Very unclear.",
        "2": "Difficult to understand.",
        "3": "Reasonably clear.",
        "4": "Clear and structured.",
        "5": "Excellent communication."
      }
    },
    {
      "id": 5,
      "name": "Best Practices",
      "description": "Knowledge of coding standards and maintainability.",
      "weight": 15,
      "scoreGuide": {
        "1": "Poor practices.",
        "2": "Below average.",
        "3": "Acceptable.",
        "4": "Good engineering practices.",
        "5": "Excellent best practices."
      }
    },
    {
      "id": 6,
      "name": "Real-world Experience",
      "description": "Ability to relate answers to practical experience.",
      "weight": 10,
      "scoreGuide": {
        "1": "No examples.",
        "2": "Weak examples.",
        "3": "Some practical experience.",
        "4": "Good practical examples.",
        "5": "Strong industry experience."
      }
    }
  ]
}

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
`
module.exports = prompt;