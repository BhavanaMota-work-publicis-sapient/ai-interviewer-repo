interface RoleLevelConfig {
  competencies: string[];
  expectedDepth: "basic" | "intermediate" | "advanced";
}

type Level = "Junior" | "Mid" | "Senior";

type RoleRubrics = Record<
  string,
  Record<Level, RoleLevelConfig>
>;

interface Rubric {
  role: string;
  level: Level;
  competencies: string[];
  expectedDepth: "basic" | "intermediate" | "advanced";
  scoring: {
    technicalAccuracy: number;
    completeness: number;
    communication: number;
    problemSolving: number;
    examples: number;
  };
}

const roleRubrics: RoleRubrics = {
  React: {
    Junior: {
      competencies: [
        "React Fundamentals",
        "JSX",
        "Props",
        "State",
        "Hooks Basics",
      ],
      expectedDepth: "basic",
    },

    Mid: {
      competencies: [
        "React Fundamentals",
        "Hooks",
        "Lifecycle",
        "Performance",
        "Context API",
        "State Management",
      ],
      expectedDepth: "intermediate",
    },

    Senior: {
      competencies: [
        "React Architecture",
        "Performance Optimization",
        "Rendering",
        "Design Patterns",
        "Testing",
        "Scalability",
      ],
      expectedDepth: "advanced",
    },
  },
};

function buildRubric(role: string, level: Level): Rubric {
  const config = roleRubrics[role]?.[level];

  if (!config) {
    throw new Error(
      `No rubric found for role "${role}" and level "${level}".`
    );
  }

  return {
    role,
    level,
    competencies: config.competencies,
    expectedDepth: config.expectedDepth,
    scoring: {
      technicalAccuracy: 40,
      completeness: 20,
      communication: 15,
      problemSolving: 15,
      examples: 10,
    },
  };
}

export default buildRubric;