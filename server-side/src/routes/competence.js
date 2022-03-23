const express = require("express");
const router = express.Router();

const { Competence } = require("../models/competence");

import verifyCoach from "../middlewares/verifyCoach";
import verifyJoueur from "../middlewares/verifyJoueur";
import verifyToken from "../middlewares/verifyToken";
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

//Get competence with id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const compts = await Competence.findById(req.params.id);
    res.send(compts);
  } catch {
    res.status(404).json("EROOOOOOOOR COMPETENCE IS NOT FOUND with this id");
  }
});

//Joueur get all competence
router.get("/joueur", verifyJoueur, async (req, res) => {
  try {
    const compts = await Joueur.findById(req.user.id).populate("competences");
    res.send(compts.competences);
  } catch {
    res.status(404).json("EROOOOOOOOR");
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
      },
      { new: true }
    );
    res.send(compt);
  } catch {
    return res.status(400).send("COMPETENCE CANNOT BE UPDATED");
  }
});

//assigned competence to Joeur
router.put("/coach/assigned/:id", verifyCoach, async (req, res) => {
  try {
    const compts = await Competence.findById(req.params.id);
    const findIndex = compts.joueurs.findIndex((x) => x == req.body.joueur);

    if (findIndex !== -1) {
      res.status(400).send("Joueur already have this competence");
    } else {
      await Joueur.findByIdAndUpdate(req.body.joueur, {
        $push: { competences: { compentence: req.params.id } },
      });
      const compt = await Competence.findByIdAndUpdate(
        req.params.id,
        {
          $push: { joueurs: req.body.joueur },
        },
        { new: true }
      );
      res.send(compt);
    }
  } catch {
    return res.status(400).send("COMPETENCE CANNOT BE assigned");
  }
});

router.put(
  "/coach/altercometrencejoueur/:id",
  verifyCoach,
  async (req, res) => {
    try {
      const data = {
        competence: req.params.id,
        stars: req.body.stars,
        isVisible: req.body.isVisible,
      };
      let joueur = await Joueur.findById(req.body.joueur);
      const findIndex = joueur.competences.findIndex(
        (x) => x.competence == req.params.id
      );
      joueur.competences[findIndex] = data;


      //send mail if this competence is visible
      if (data.isVisible) {

        let smtpTransport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "nodeisamm@gmail.com",
            pass: "otaku666",
          },
          tls: {
            rejectUnauthorized: false
          },
        });
        const coach = await Coach.findById(req.user.id)

        let mailOptions = {
          from: "nodeisamm@gmail.com",
          to: `${joueur.email}`,
          subject: `new Competence from: ${coach.firstName} ${coach.lastName}`,
          text: "test",
          html: `<h3> You have a new competence  </h3> 
                <div>
                  <b>to check this competence please visit this link</b>
                </div>
                <div>
                <a href="http://localhost:3000/"> clic here </a>
                </div>
                `,
        };

        smtpTransport.sendMail(mailOptions);

        smtpTransport.close();
      }

      joueur = await joueur.save();
      res.send(joueur);
    } catch {
      return res.status(400).send("COMPETENCE CANNOT BE modifi");
    }
  }
);

//delete compentence
router.delete("/coach/:id", verifyCoach, async (req, res) => {
  try {
    const compt = await Competence.findById(req.params.id);

    compt.joueurs.forEach(async (x) => {
      let joueur = await Joueur.findById(x);
      const findIndex = joueur.competences.findIndex(
        (x) => x.competence == req.params.id
      );
      joueur.competences.splice(findIndex, 1);
      await joueur.save();
    });

    await Competence.findByIdAndRemove(req.params.id);
    res.status(200).send("SUCCESS");
  } catch {
    res.status(500).json("Error");
  }
});

export default router;
