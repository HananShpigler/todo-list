import todos from "./routes/todos";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", todos);

dotenv.config();

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is listening on port ${process.env.SERVER_PORT} !`)
);
