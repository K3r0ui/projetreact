import express from "express";
import verifyCoach from "../middlewares/verifyCoach";
import verifyToken from "../middlewares/verifyToken";
import { Program } from "../models/program";
import { Seance } from "../models/seance";

const route = express.Router();

// get all programs
route.get("/:id", verifyToken, async (req, res) => {
  try {
    const prog = await Seance.findById(req.params.id)
      .populate("competences")
      .populate("statistiques")
      .populate("lieu")
      .populate("program");
    res.send(prog);
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});

route.post("/", verifyCoach, async (req, res) => {
  let seance;
  try {
    seance = new Seance({
      titre: req.body.titre,
      date: req.body.date,
      etat: 'en cours',
      coach: req.user.id,
      lieu: req.body.lieu,
      joueur: req.body.joueur,
      competences:req.body.competences,
      statistiques:req.body.statistiques,
      program:req.body.program

    });
    await seance.save();
    const seance2 =await Seance.findById(seance._id)
    .populate("competences")
    .populate("statistiques.statistique")
    .populate("lieu")
    .populate("program")
    .populate("joueur");
    res.status(200).send(seance2);
  } catch (error) {
    res.status(500).send(error);
  }
});

route.get("/", verifyToken, async (req, res) => {
  try {
    const prog = await Seance.find({ couch: req.user.id })
      .populate("competences")
      .populate("statistiques.statistique")
      .populate("lieu")
      .populate("program")
      .populate("joueur");
    res.send(prog);
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});

route.put("/coach/:id", verifyCoach, async (req, res) => {
  try {
    const prog = await Program.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        videoLink: req.body.videoLink,
      },
      { new: true }
    );
    res.send(prog);
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});


route.put("/etat/:id", verifyCoach, async (req, res) => {
  try {
    const seance = await Seance.findByIdAndUpdate(
      req.params.id,
      {
        etat: req.body.etat,
     
      },
      { new: true }
    );
    res.send(seance);
  } catch (error) {
    res.status(500).send("erreur de modification");
  }
});

route.put("/feedback/:id", verifyCoach, async (req, res) => {
  try {
    const seance = await Seance.findByIdAndUpdate(
      req.params.id,
      {
        goal: req.body.goal,
        feedback: req.body.feedback
     
      },
      { new: true }
    );
    res.send(seance);
  } catch (error) {
    res.status(500).send("erreur de modification");
  }
});



export default route;

/*
// assign competences to program
route.put("/coach/competences/:id", verifyCoach, async (req, res) => {
  try {
    const pr = await Program.findById(req.params.id);
    const findIndex = pr.competences.findIndex(
      (x) => x.competence == req.body.competence
    );
    if (findIndex !== -1) {
      res.status(400).send("Joueur already have this competence");
    } else {
      const prog = await Program.findByIdAndUpdate(
        req.params.id,
        {
          $push: { competences: { compentence: req.body.competence } },
        },
        { new: true }
      );
      res.send(prog);
    }
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});

// assign stat to program
route.put("/coach/stat/:id", verifyCoach, async (req, res) => {
  try {
    const pr = await Program.findById(req.params.id);
    const findIndex = pr.statistiques.findIndex(
      (x) => x.statistique == req.body.statistique
    );
    if (findIndex !== -1) {
      res.status(400).send("Joueur already have this statistique");
    } else {
      const prog = await Program.findByIdAndUpdate(
        req.params.id,
        {
          $push: { statistiques: { statistique: req.body.statistique } },
        },
        { new: true }
      );
      res.send(prog);
    }
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});
*/

/*
// done competence
route.put("/coach/competences/done/:id", verifyCoach, async (req, res) => {
  try {
    const data = { competence: req.body.competence, done: req.body.done };
    let prog = await Program.findById(req.params.id);
    const index = prog.competences.findIndex(
      (x) => x.competence == data.competence
    );
    if (index !== -1) res.status(400).send("competence does not exist!");
    else {
      prog.competences[index] = data;
      await prog.save();
      res.send("updated");
    }
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});

// done stat
route.put("/coach/statistiques/done/:id", verifyCoach, async (req, res) => {
  try {
    const data = { statistique: req.body.statistique, done: req.body.done };
    let prog = await Program.findById(req.params.id);
    const index = prog.statistiques.findIndex(
      (x) => x.statistique == data.statistique
    );
    if (index !== -1) res.status(400).send("statistique does not exist!");
    else {
      prog.statistiques[index] = data;
      await prog.save();
      res.send("updated");
    }
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});

// remove competence from progrom
route.delete("/coach/competences/:id", verifyCoach, async (req, res) => {
  try {
    const prog = await Program.findById(req.params.id);
    const index = prog.competences.findIndex(
      (x) => x.competence == req.body.competence
    );
    prog.competences.splice(index, 1);
    prog = await prog.save();
    res.send(prog);
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});

// remove statistique from progrom
route.delete("/coach/statistiques/:id", verifyCoach, async (req, res) => {
  try {
    const prog = await Program.findById(req.params.id);
    const index = prog.statistiques.findIndex(
      (x) => x.statistique == req.body.statistique
    );
    prog.statistiques.splice(index, 1);
    prog = await prog.save();
    res.send(prog);
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});
*/

/*
// assign seance to program
route.put("/coach/seance/:id", verifyCoach, async (req, res) => {
  try {
    const sc = await Seance.findById(req.body.seance);
    if (sc.program) {
      res.status(400).send("this seance already assigned to a program");
    } else {
      await Seance.findByIdAndUpdate(req.body.seance, {
        program: req.params.id,
      });
      const prog = await Program.findByIdAndUpdate(
        req.params.id,
        {
          $push: { seances: req.body.seance },
        },
        { new: true }
      );
      res.send(prog);
    }
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});
*/
