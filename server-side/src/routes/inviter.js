import express from "express";
const router = express.Router();

import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const { Joueur } = require("../models/joueur");
import { Coach } from "../models/coach";
import verifyCoach from "../middlewares/verifyCoach";
import { Invitation } from "../models/invitation";

router.post("/", verifyCoach, async (req, res) => {
  const invits = await Invitation.find({ coach: req.user.id });

  // const nb = invits.map((invit) => {
  //     const nbr = 0
  //     if (invit.etat != "Refuser" && invit.etat != "Supprimer") {
  //         return nbr + 1
  //     }
  // })

  //const coach = await Coach.findById(req.user.id)
  // if (coach.abonnement.nbjoueur <= nb) {
  //     res.status(400).send("Abonnement insufisant")
  // }
  let joueur;
  let invitation;
  try {
    const coach = await Coach.findById(req.user.id);
    if (
      (coach.abonnement.type == "free" &&
        coach.abonnement.joueurterminer >= 3) ||
      (coach.abonnement.type == "basic" &&
        coach.abonnement.joueurterminer >= 10)
    ) {
      res.status(400).send("check abonnement");
    } else {
      joueur = new Joueur({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: req.body.dob,
        pob: req.body.pob,
        coach: req.user.id,
        sexe: req.body.sexe,
        job: req.body.job,
        ville: req.body.ville,
        telephone: req.body.telephone,
        price: req.body.price,
        taille: req.body.taille,
        poid: req.body.poid,
        orientation: req.body.orientation,
        nbscweek: req.body.nbscweek,
        price: req.body.price,
      });

      joueur = await joueur.save();
      invitation = new Invitation({
        joueur: joueur._id,
        coach: req.user.id,
      });

      invitation = await invitation.save();

      await Joueur.findOneAndUpdate(
        { email: req.body.email },
        { invitation: invitation._id },
        { new: true }
      );

      let smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nodeisamm@gmail.com",
          pass: "otaku666",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: "nodeisamm@gmail.com",
        to: `${req.body.email}`,
        subject: `Invitation from COACH: ${coach.firstName} ${coach.lastName} to join a session`,
        text: "test",
        html: `<h3> YOUR INFO </h3> 
          <div>
            <ul>
                <li>Name : ${req.body.firstName} </li>
                <li>prenom : ${req.body.lastName} </li>
            </ul>
           </div>
           <div>
           <a href="http://localhost:3000/accepter?idjoueur=${joueur._id}"> Accepter </a>
           <a href="http://localhost:3000/annuler?idjoueur=${joueur._id}"> Refuser </a>`,
      };

      smtpTransport.sendMail(mailOptions, (error, res) => {
        if (error) {
          res.send(error);
        } else {
          res.send({ message: "Sucess", joueur });
        }
      });

      smtpTransport.close();
      invitation.joueur = joueur;
      res.send(invitation);
    }
  } catch (error) {
    res.status(400).send({ "error to inviter": error });
  }
});

router.put("/refuser/:id", async (req, res) => {
  try {
    const invitation = await Invitation.findOne({ joueur: req.params.id });
    if (invitation.etat == "Supprimer") {
      res.status(400).send("invitation is already deleted by your coach");
    } else if (invitation.etat == "Refuser") {
      res
        .status(400)
        .send(
          "You have already refused the invitation, please ask your coach to send a new invitation"
        );
    } else if (invitation.etat == "Termenated") {
      res.status(400).send("You are already subscribed to the app");
    } else {
      await Invitation.findOneAndUpdate(
        { joueur: req.params.id },
        {
          $set: { etat: "Refuser" },
        },
        { new: true }
      );
      const joueur = await Joueur.findById(req.params.id);
      res.send(joueur);
    }
  } catch {
    res.send(500).send("somthing is wrong");
  }
});

router.put("/accepter/:id", async (req, res) => {
  try {
    const invitation = await Invitation.findOne({ joueur: req.params.id });
    if (invitation.etat == "Supprimer") {
      res.status(400).send("this invitation has been deleted");
    } else if (invitation.etat == "Refuser") {
      res.status(400).send("this invitation has been refused");
    } else if (invitation.etat == "Termenated") {
      res.status(400).send("You have already terminated this invitation");
    } else {
      await Invitation.findOneAndUpdate(
        { joueur: req.params.id },
        {
          $set: { etat: "Accepter" },
        },
        { new: true }
      );
      const joueur = await Joueur.findById(req.params.id);
      res.send(joueur);
    }
  } catch {
    res.status(500).send("somthing is wrong");
  }
});

router.put("/updatejoueur/:id", async (req, res) => {
  let joueur;
  try {
    const invitation = await Invitation.findOne({ joueur: req.params.id });

    if (invitation.etat != "Accepter") {
      res.status(400).send("invitation is wrong");
    } else if (!req.body.password) {
      res.status(400).send("required password");
    } else {
      const { password, ...rest } = req.body;
      joueur = await Joueur.findOneAndUpdate(
        req.params.id,
        {
          password: bcrypt.hashSync(password, 8),
          ...rest,
        },
        { new: true }
      );
      await Invitation.findOneAndUpdate(
        { joueur: req.params.id },
        {
          etat: "Termenated",
        },
        { new: true }
      );

      const coch = await Coach.findById(joueur.coach).populate("abonnement");

      await Coach.findOneAndUpdate(joueur.coach, {
        $set: {
          "abonnement.joueurterminer": coch.abonnement.joueurterminer + 1,
        },
      });

      res.send(joueur);
    }
  } catch {
    res.status(500).send("there somthing wrong");
  }
});

router.put("/delete/:id", verifyCoach, async (req, res) => {
  try {
    let invit = await Invitation.findById(req.params.id);
    if (invit.etat != "En attente") {
      res.status(500).send("this invitation is not en attente");
    } else {
      invit.etat = "Supprimer";
      invit = await invit.save();
      res.send(invit);
    }
  } catch {
    res.status(500).send(" somthing is wrong");
  }
});

router.get("/all", verifyCoach, async (req, res) => {
  try {
    const invitations = await Invitation.find({ coach: req.user.id }).populate(
      "joueur"
    );
    const invits = invitations.filter((invit) => {
      if (invit.etat != "Supprimer") {
        return invit;
      }
    });
    res.send(invits);
  } catch {
    res.status(500).send(" somthing is wrong");
  }
});

export default router;