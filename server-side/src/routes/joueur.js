import express from "express";
import bcrypt from "bcryptjs";

import { Joueur } from "../models/joueur";

import verifyJoueur from "../middlewares/verifyJoueur";

const router = express.Router();


router.post("/login", async (req, res) => {
    let joueur = await Joueur.findByEmail(req.body.email);
    if (!joueur) return res.status(400).send("Email or Password invalid.");

    const validPwd = await bcrypt.compare(req.body.password, joueur.password);
    if (!validPwd) return res.status(400).send("Email or Password invalid.");

    const token = await joueur.generateJWT();

    res.send(token);
});

router.get("/profile", verifyJoueur, async (req, res) => {
    let joueur = await Joueur.findById(req.user.id)
    if (!joueur) {
        res.status(400).send("Joueur not found !!!!")
    }
    res.status(200).send(joueur)

});

router.put("/modifierprofile", verifyJoueur, async (req, res) => {
    try {
        const joueur = await Joueur.findByIdAndUpdate(
            req.user.id,
            {
                firstName: req.body.firstName
            },
            { new: true }
        )
    } catch {
        res.status(500).send("there is something wrong ")
    }
})



export default router;