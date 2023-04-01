import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response) => {
  res.status(404);
  res.json({
    error: "Endpoint not found",
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
