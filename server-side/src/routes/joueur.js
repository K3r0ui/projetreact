import express from "express";
import bcrypt from "bcryptjs";

import { Joueur } from "../models/joueur";

import verifyJoueur from "../middlewares/verifyJoueur";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    let joueur = await Joueur.findByEmail(req.body.email);
    if (!joueur) return res.status(400).send("Email invalid.");

    const validPwd = await bcrypt.compare(req.body.password, joueur.password);
    if (!validPwd) return res.status(400).send("Password invalid.");

    const token = await joueur.generateJWT();

    res.send(token);
  } catch (error) {
    return res.status(200).send("erreur de serveur ");
  }
});

router.get("/profile", verifyJoueur, async (req, res) => {
  try {
    let joueur = await Joueur.findById(req.user.id);
    res.status(200).send(joueur);
  } catch (error) {
    res.status(400).send("Joueur not found !!!!");
  }
});

router.put("/modifierprofile", verifyJoueur, async (req, res) => {
  try {
    const rest = req.body;
    const joueur = await Joueur.findByIdAndUpdate(req.user.id, rest, {
      new: true,
    });
    res.send(joueur);
  } catch {
    res.status(400).send("there is something wrong ");
  }
});

router.put("/modifierpassword", verifyJoueur, async (req, res) => {
  try {
    const joueur = await Joueur.findByIdAndUpdate(req.user.id);
    const compare = await bcrypt.compare(req.body.oldPassword, joueur.password);
    if (compare) {
      const jo = await Joueur.findByIdAndUpdate(
        req.user.id,
        {
          password: bcrypt.hashSync(req.body.newPassword, 8),
        },
        { new: true }
      );
      res.send(jo);
    } else {
      res.status(400).send("Verifier votre password");
    }
  } catch {
    res.status(500).send("there is something wrong ");
  }
});

export default router;
