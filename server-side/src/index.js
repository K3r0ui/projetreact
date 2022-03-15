import express from "express";
import cors from "cors";
import home from "./routes/home";
import coach from "./routes/coach";
import competence from "./routes/competence";
import inviter from "./routes/inviter"
import configDB from "./config/db";
import { Discipline } from "./models/discipline";

const app = express();
app.use(cors());
app.use(express.json());

(async () => await configDB())();

// routes endpoints
app.use("/", home);
app.use("/coach", coach);
//CRUD Competence 
app.use('/', competence)
//Inviter Joueur
app.use('/inviter', inviter)

// const discipline = new Discipline({
//   description: "football",
// });

// (async () => await discipline.save())();

// const discipline2 = new Discipline({
//   description: "handball",
// });

// (async () => await discipline2.save())();

const port = process.env.PORT || 3000;
export const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});