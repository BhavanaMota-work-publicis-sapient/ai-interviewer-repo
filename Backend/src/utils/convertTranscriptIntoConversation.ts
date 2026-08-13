interface TranscriptItem {
  role: "user" | "avatar";
  transcript: string;
  absolute_timestamp: number;
  relative_timestamp: number;
}

export function convertTranscriptToConversation(
  transcriptData: TranscriptItem[]
): string {
  if (!transcriptData.length) {
    return "";
  }

  const conversation: string[] = [];
  let currentRole: TranscriptItem["role"] = transcriptData[0].role;
  let currentText = "";

  for (const item of transcriptData) {
    if (item.role === currentRole) {
      currentText += `${currentText ? " " : ""}${item.transcript.trim()}`;
    } else {
      conversation.push(
        `${currentRole === "user" ? "User" : "Avatar"}: ${currentText}`
      );

      currentRole = item.role;
      currentText = item.transcript.trim();
    }
  }

  // Add the last conversation block
  conversation.push(
    `${currentRole === "user" ? "User" : "Avatar"}: ${currentText}`
  );

  return conversation.join("\n\n");
}

export default convertTranscriptToConversation;