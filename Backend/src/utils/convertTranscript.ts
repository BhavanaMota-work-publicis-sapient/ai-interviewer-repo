interface TranscriptItem {
  role: "avatar" | "user";
  transcript: string;
}

interface QAPair {
  question: string;
  answer: string;
}

interface TranscriptQA {
  candidate: {
    name: string;
  };
  role: string;
  level: string;
  experience: number;
  techStack: string[];
  questions: QAPair[];
}

function cleanTranscript(text: string): string {
  const cleaned = text.replace(
    /\b(uh|um|umm|hmm|hmmm|ah|er|okay|ok|actually|basically|literally|you know|i mean|sort of|kind of)\b/gi,
    ""
  );

  return cleaned.replace(/\s+/g, " ").trim();
}

function convertTranscriptToQA(
  transcriptData: TranscriptItem[]
): TranscriptQA {
  console.log("transcriptData:", transcriptData);

  const qaPairs: QAPair[] = [];

  let currentQuestion: string | null = null;
  let currentAnswer: string[] = [];

  const feedbackPatterns: RegExp[] = [
    /^thank you/i,
    /^great/i,
    /^good/i,
    /^excellent/i,
    /^nice/i,
    /^well done/i,
    /^let'?s move/i,
    /^next question/i,
  ];

  function isFeedback(text: string): boolean {
    return feedbackPatterns.some((pattern) => pattern.test(text.trim()));
  }

  for (const item of transcriptData) {
    if (item.role === "avatar") {
      if (currentQuestion) {
        qaPairs.push({
          question: currentQuestion,
          answer: cleanTranscript(currentAnswer.join(" ").trim()),
        });
      }

      if (!isFeedback(item.transcript)) {
        currentQuestion = item.transcript.trim();
      } else {
        currentQuestion = null;
      }

      currentAnswer = [];
    } else if (item.role === "user") {
      if (currentQuestion) {
        const cleanedAnswer = cleanTranscript(item.transcript.trim());
        currentAnswer.push(cleanedAnswer);
      }
    }
  }

  if (currentQuestion) {
    const cleanedAnswer = cleanTranscript(currentAnswer.join(" ").trim());

    qaPairs.push({
      question: currentQuestion,
      answer: cleanedAnswer,
    });
  }

  return {
    candidate: {
      name: "John",
    },
    role: "Senior React Developer",
    level: "Senior",
    experience: 6,
    techStack: ["React", "Redux", "TypeScript"],
    questions: qaPairs,
  };
}

export default convertTranscriptToQA;