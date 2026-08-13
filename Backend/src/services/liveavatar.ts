interface CreateSessionResponse {
  [key: string]: unknown;
}

export const createSession = async (): Promise<CreateSessionResponse> => {
  const response = await fetch("https://api.liveavatar.com/v1/sessions/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.LIVEAVATAR_API_KEY ?? "",
    },
    body: JSON.stringify({
      avatar_id: "dd73ea75-1218-4ef3-92ce-606d5f7fbc0a",
      mode: "FULL",
      is_sandbox: false,
      video_settings: {
        quality: "high",
        encoding: "H264",
      },
      avatar_persona: {
        // 28a5ee53-3093-4774-8428-d9f85a3d9460
        context_id: "28a5ee53-3093-4774-8428-d9f85a3d9460",
        language: "en",
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create session: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as CreateSessionResponse;
};