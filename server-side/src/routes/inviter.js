import express from "express";
const router = express.Router();

import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';

const { Joueur } = require("../models/joueur");
import { Coach } from "../models/coach";
import verifyCoach from "../middlewares/verifyCoach";
import { Invitation } from "../models/invitation";

router.post("/", verifyCoach, async (req, res) => {

    const invits = await Invitation.find({ coach: req.user.id })

    const nb = invits.map((invit) => {
        const nbr = 0
        if (invit.etat != "Refuser" && invit.etat != "Supprimer") {
            return nbr + 1
        }
    })

    const coach = await Coach.findById(req.user.id)
    if (coach.abonnement.nbjoueur <= nb) {
        res.status(400).send("Abonnement insufisant")
    }
    let joueur;
    let invitation;
    try {
        joueur = new Joueur({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dob: req.body.dob,
            pod: req.body.pod,
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
        console.log("fg");
        invitation = new Invitation({
            joueur: joueur._id,
            coach: req.user.id
        })

        invitation = await invitation.save();

        await Joueur.findOneAndUpdate(
            { email: req.body.email },
            { invitation: invitation._id },
            { new: true }
        )

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
           <a href="http://localhost:3000/accepter/?idjoueur=${joueur._id}"> Accepter </a>
           <a href="http://localhost:3000/annuler/?idjoueur=${joueur._id}"> Refuser </a>`,
        };

        smtpTransport.sendMail(mailOptions, (error, res) => {
            if (error) {
                res.send(error);
            } else {
                res.send({ message: "Sucess", joueur });
            }
        });


        smtpTransport.close();
        invitation.joueur = joueur
        res.send(invitation)

    } catch (error) {
        res.status(400).send({ "error to inviter": error })
    }

});


router.put("/refuser/:id", async (req, res) => {
    try {
        await Invitation.findOneAndUpdate(
            { joueur: req.params.id },
            {
                $set: { etat: "Refuser" }
            },
            { new: true }
        );
        const joueur = await Joueur.findById(req.params.id)
        res.send(joueur);
    } catch {
        res.send(500).send("somthing is wrong")
    }
});


router.put("/accepter/:id", async (req, res) => {
    try {
        const joueur = await Joueur.findById(req.params.id)
        if (joueur.invitation.etat == "Supprimer") {
            res.send("this invitation has been deleted")
        }
        else {
            await Invitation.findOneAndUpdate(
                { joueur: req.params.id },
                {
                    $set: { etat: "Accepter" }
                },
                { new: true }
            );

            res.send(joueur);
        }

    } catch {
        res.send(500).send("somthing is wrong")
    }
});

router.put("/updatejoueur/:id", async (req, res) => {
    let joueur
    try {
        const invitation = await Invitation.findOne({ joueur: req.params.id })

        if (invitation.etat != "Accepter") {
            res.status(400).send("invitation is wrong")
        }
        else if (!req.body.password) {
            res.status(400).send("required password")
        } else {
            joueur = await Joueur.findOneAndUpdate(
                req.params.id,
                {
                    sexe: req.body.sexe,
                    job: req.body.job,
                    ville: req.body.ville,
                    telephone: req.body.ville,
                    price: req.body.price,
                    taille: req.body.taille,
                    orientation: req.body.orientation,
                    password: bcrypt.hashSync(req.body.password, 15),
                    poid: req.body.poid
                },
                { new: true }
            );
            await Invitation.findOneAndUpdate(
                { joueur: req.params.id },
                {
                    etat: "Termenated"
                },
                { new: true }
            )

            res.send(joueur)
        }

    } catch {
        res.status(500).send("there somthing wrong")
    }
});

router.put("/delete/:id", verifyCoach, async (req, res) => {
    try {
        let invit = await Invitation.findById(req.params.id)
        if (invit.etat != "En attente") {
            res.status(500).send("this invitation is not en attente")
        } else {
            invit.etat = "Supprimer"
            invit = await invit.save();
            res.send(invit);
        }

    } catch {
        res.status(500).send(" somthing is wrong")
    }
})


router.get("/all", verifyCoach, async (req, res) => {
    try {
        const invitations = await Invitation.find({ coach: req.user.id }).populate("joueur");
        const invits = invitations.map(invit => {
            if (invit.etat != "Supprimer") {
                return invit;
            }
        })
        res.send(invits)
    } catch {
        res.status(500).send(" somthing is wrong")
    }
})

export default router;
