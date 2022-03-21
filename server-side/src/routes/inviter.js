const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const { Joueur } = require("../models/joueur");
import { Coach } from "../models/coach";
import verifyCoach from "../middlewares/verifyCoach";

router.post("/", verifyCoach, async (req, res) => {

    let joueur
    try {
        joueur = new Joueur({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            coach: req.user.id
        })


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
          <ul>
          <li>Name : ${req.body.firstName} </li>
          <li>prenom : ${req.body.lastName} </li>
          <li>password : ${req.body.password} </li>
          </ul>`,
        };

        smtpTransport.sendMail(mailOptions, (error, res) => {
            if (error) {
                res.send(error);
            } else {
                res.send({ message: "Sucess", joueur });
            }
        });

        smtpTransport.close();
        joueur = await joueur.save();
        req.send(joueur)

    } catch (error) {
        res.status(400).send("email already user")
    }

});

export default router;
