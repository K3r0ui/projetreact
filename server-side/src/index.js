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
import alert from "./routes/alert";
import program from "./routes/program";
import seance from "./routes/seance";
import './cronJobs';

import configDB from "./config/db";
// import { Alert } from "./models/alert";

const app = express();
module.exports = { app }
app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV !== "test") {
  console.log("tqdvlkw");
  (async () => await configDB())();
}


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
app.use("/alert", alert);
app.use("/program", program);
app.use("/coach/seance", seance);

// const discipline = new Discipline({
//   description: "football",
// });

// (async () => await discipline.save())();

//   const alert2 = new Alert({
//     name: "incorrect",
//     type: "error"
//   });

//  (async () => await alert2.save())();

//  const alert3 = new Alert({
//   name: "utile",
//   type: "info"
// });

// (async () => await alert3.save())();
// const alert4 = new Alert({
//   name: "pas utile",
//   type: "warning"
// });

//(async () => await alert4.save())();

const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server