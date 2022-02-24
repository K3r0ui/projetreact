import express from "express";
import cors from "cors";
import home from "./routes/home";
import configDB from "./config/db";

const app = express();
app.use(cors());
app.use(express.json());

(async () => await configDB())();

// routes endpoints
app.use("/", home);

const port = process.env.PORT || 3000;
export const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
