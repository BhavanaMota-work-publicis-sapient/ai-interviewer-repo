import { generateInterviewRubric, type InterviewRubric } from "./generateInterviewRubric.js";


const rubric: InterviewRubric = generateInterviewRubric({
  role: "Senior Frontend Engineer",
  level: "Senior",
  experience: "7+ Years",
  techStack: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Redux",
    "GraphQL",
  ],
});

export default rubric;