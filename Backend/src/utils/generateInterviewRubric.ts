interface GenerateInterviewRubricParams {
  role: string;
  level: string;
  techStack?: string[];
  experience?: string | number;
}

interface ScoreGuide {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}

export interface RubricCategory {
  id: number;
  name: string;
  description: string;
  weight: number;
  scoreGuide: ScoreGuide;
}

export interface InterviewRubric {
  role: string;
  level: string;
  experience: string | number;
  techStack: string[];
  totalWeight: number;
  categories: RubricCategory[];
}

export function generateInterviewRubric({
  role,
  level,
  techStack = [],
  experience = "",
}: GenerateInterviewRubricParams): InterviewRubric {
  const categories: RubricCategory[] = [
    {
      id: 1,
      name: "Technical Accuracy",
      description:
        "Correctness of technical concepts and explanations.",
      weight: 30,
      scoreGuide: {
        1: "Incorrect or mostly incorrect.",
        2: "Several technical mistakes.",
        3: "Partially correct with gaps.",
        4: "Mostly correct with minor mistakes.",
        5: "Completely correct and accurate.",
      },
    },
    {
      id: 2,
      name: "Depth of Knowledge",
      description:
        "Understanding of underlying concepts and trade-offs.",
      weight: 20,
      scoreGuide: {
        1: "Very shallow understanding.",
        2: "Limited knowledge.",
        3: "Moderate understanding.",
        4: "Good conceptual depth.",
        5: "Expert-level understanding.",
      },
    },
    {
      id: 3,
      name: "Problem Solving",
      description:
        "Ability to analyze and solve technical problems.",
      weight: 15,
      scoreGuide: {
        1: "Unable to solve.",
        2: "Requires major guidance.",
        3: "Can solve basic problems.",
        4: "Solves independently.",
        5: "Excellent analytical thinking.",
      },
    },
    {
      id: 4,
      name: "Communication",
      description:
        "Ability to explain ideas clearly and logically.",
      weight: 10,
      scoreGuide: {
        1: "Very unclear.",
        2: "Difficult to understand.",
        3: "Reasonably clear.",
        4: "Clear and structured.",
        5: "Excellent communication.",
      },
    },
    {
      id: 5,
      name: "Best Practices",
      description:
        "Knowledge of coding standards and maintainability.",
      weight: 15,
      scoreGuide: {
        1: "Poor practices.",
        2: "Below average.",
        3: "Acceptable.",
        4: "Good engineering practices.",
        5: "Excellent best practices.",
      },
    },
    {
      id: 6,
      name: "Real-world Experience",
      description:
        "Ability to relate answers to practical experience.",
      weight: 10,
      scoreGuide: {
        1: "No examples.",
        2: "Weak examples.",
        3: "Some practical experience.",
        4: "Good practical examples.",
        5: "Strong industry experience.",
      },
    },
  ];

  return {
    role,
    level,
    experience,
    techStack,
    totalWeight: categories.reduce(
      (sum, category) => sum + category.weight,
      0
    ),
    categories,
  };
}

