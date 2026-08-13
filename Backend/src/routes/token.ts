import express from "express";
import type { Request, Response } from "express";
import { createSession } from "../services/liveavatar.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const session = await createSession();

    res.json(session);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

export default router;