import express from "express";
import cors from "cors";
import home from "./routes/home";
import coach from "./routes/coach";
import competence from "./routes/competence";
import stat from "./routes/stat";
import inviter from "./routes/inviter";
import joueur from "./routes/joueur";
import defi from "./routes/defi";
import event from "./routes/event";
import lieu from "./routes/lieu";
import discipline from "./routes/discipline";
import program from "./routes/program";

import configDB from "./config/db";
//import { Discipline } from "./models/discipline";

const app = express();
app.use(cors());
app.use(express.json());

(async () => await configDB())();

// routes endpoints
app.use("/", home);
app.use("/coach", coach);
//CRUD Competence
app.use("/competence", competence);
app.use("/stat", stat);
//Inviter Joueur
app.use("/inviter", inviter);

app.use("/joueur", joueur);

app.use("/defi", defi);
app.use("/event", event);

app.use("/lieu", lieu);

app.use("/discipline", discipline);

app.use("/program", program);

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
