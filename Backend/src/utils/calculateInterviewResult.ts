interface Score {
  score: number;
}

interface Evaluation {
  scores: Record<string, Score>;
  strengths: string[];
  weaknesses: string[];
}

interface RubricCategory {
  name: string;
  weight: number;
}

interface Rubric {
  categories: RubricCategory[];
}

interface InterviewResult {
  overallScore: number;
  recommendation: string;
  categoryScores: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  totalQuestions: number;
}

function calculateCategoryScores(
  evaluations: Evaluation[],
): Record<string, number> {
  const totals: Record<string, number> = {};
  const counts: Record<string, number> = {};

  for (const evaluation of evaluations) {
    for (const [category, value] of Object.entries(evaluation.scores)) {
      totals[category] = (totals[category] || 0) + value.score;
      counts[category] = (counts[category] || 0) + 1;
    }
  }

  const averages: Record<string, number> = {};
  if (totals) {
    for (const category in totals) {
       const total = totals[category] ?? 0;
       const count = counts[category] ?? 0;
      averages[category] = Number(
        (total / (count || 1)).toFixed(2),
      );
    }
  }

  return averages;
}

function calculateOverallScore(
  categoryScores: Record<string, number>,
  rubric: Rubric,
): number {
  let total = 0;

  rubric.categories.forEach((category) => {
    const avgScore = categoryScores[category.name] || 0;

    // Convert 1–5 score into percentage of category weight
    total += (avgScore / 5) * category.weight;
  });

  return Number(total.toFixed(2));
}

function getRecommendation(score: number): string {
  if (score >= 85) {
    return "Strong Hire";
  }

  if (score >= 70) {
    return "Hire";
  }

  if (score >= 55) {
    return "Borderline";
  }

  return "Reject";
}

function mergeInsights(evaluations: Evaluation[]): {
  strengths: string[];
  weaknesses: string[];
} {
  const strengths = [...new Set(evaluations.flatMap((e) => e.strengths))];

  const weaknesses = [...new Set(evaluations.flatMap((e) => e.weaknesses))];

  return {
    strengths,
    weaknesses,
  };
}

function calculateInterviewResult(
  evaluations: Evaluation[],
  rubric: Rubric,
): InterviewResult {
  const categoryScores = calculateCategoryScores(evaluations);

  const overallScore = calculateOverallScore(categoryScores, rubric);

  const insights = mergeInsights(evaluations);

  return {
    overallScore,
    recommendation: getRecommendation(overallScore),
    categoryScores,
    strengths: insights.strengths,
    weaknesses: insights.weaknesses,
    totalQuestions: evaluations.length,
  };
}

export default calculateInterviewResult;
