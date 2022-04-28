const express = require("express");
const router = express.Router();

const { Competence } = require("../models/competence");

import verifyCoach from "../middlewares/verifyCoach";
import { Joueur } from "../models/joueur";

//Get All competence of coach
router.get("/coach", verifyCoach, async (req, res) => {
  try {
    const compts = await Competence.find({ coach: req.user.id });
    res.send(compts);
  } catch {
    res
      .status(404)
      .json("EROOOOOR COMPETENCE IS NOT FOUND with this joueur id");
  }
});

//Coach get all competences of joueur
router.get("/coach/allcomptencesJoueurs/:id", verifyCoach, async (req, res) => {
  try {
    const compts = await Joueur.findById(req.params.id).populate("competences");
    res.send(compts.competences);
  } catch {
    res.status(404).json("EROOOOOOOOR");
  }
});

// Coach Add new Competence
router.post("/coach", verifyCoach, async (req, res) => {
  let newComp;
  try {
    newComp = new Competence({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      coach: req.user.id,
      stars: req.body.stars,
      isVisible: req.body.isVisible
    });
    newComp = await newComp.save();
    res.status(200).send(newComp);
  } catch {
    res.status(404).send("THE COMPETENCE CANNOT BE CREATED");
  }
});

//Coach update of Competence
router.put("/coach/:id", verifyCoach, async (req, res) => {
  try {
    const compt = await Competence.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        stars: req.body.stars,
        isVisible: req.body.isVisible
      },
      { new: true }
    );
    res.send(compt);
  } catch {
    return res.status(400).send("COMPETENCE CANNOT BE UPDATED");
  }
});


//delete compentence
router.delete("/coach/:id", verifyCoach, async (req, res) => {
  try {
    const compt = await Competence.findByIdAndRemove(req.params.id);
    res.status(200).send(compt.id);
  } catch {
    res.status(500).json("Error");
  }
});

export default router;
