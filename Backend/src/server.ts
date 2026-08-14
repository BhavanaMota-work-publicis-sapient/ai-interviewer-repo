import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";

import transcriptSession from "./routes/sessionTranscript.js";
import tokenRoute from "./routes/token.js";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/session-transcript", transcriptSession);
app.use("/token", tokenRoute);

app.get("/health", (req, res) => {
  res.json({
    status: "OK"
  });
});
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server Running on port backend !!!!! ${PORT}`);
});