import express from "express";
import bcrypt from "bcryptjs";
import { Coach } from "../models/coach";
import verifyCoach, { firstAuthMid } from "../middlewares/verifyCoach";
import { Joueur } from "../models/joueur";

const router = express.Router();

router.post("/signup", async (req, res) => {
  let coach;
  try {
    coach = new Coach({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
    });
    coach = await coach.save();
    const token = await coach.generateJWT();
    res.header("x-auth-token", token).send(coach);
  } catch (error) {
    res.status(400).send("email already used");
  }
});

router.post("/login", async (req, res) => {
  let coach = await Coach.findByEmail(req.body.email);
  if (!coach) return res.status(400).send("Email or Password invalid.");

  const validPwd = await bcrypt.compare(req.body.password, coach.password);
  if (!validPwd) return res.status(400).send("Email or Password invalid.");

  const token = await coach.generateJWT();

  res.send(token);
});

router.put("/discipline", [verifyCoach, firstAuthMid], async (req, res) => {
  try {
    const result = await Coach.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: { discipline: req.body.discipline },
      },
      { new: true }
    );

    res.send(result);
  } catch {
    res.status(500).send("there is some error")
  }
});

router.put("/alert", [verifyCoach, firstAuthMid], async (req, res) => {
  try {
    const result = await Coach.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: { alert: req.body.alert },
      },
      { new: true }
    );
    res.send(result);
  } catch {
    res.status(500).send("there is some error")
  }
});

//set nombre de seance non atteint
router.put("/alert", [verifyCoach, firstAuthMid], async (req, res) => {
  try {
    const result = await Coach.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: { nbsc: req.body.nbsc },
      },
      { new: true }
    );
    res.send(result);
  } catch {
    res.status(500).send("there is some error")
  }
});

//get list of here joueur 
router.get("/alljoueurs", verifyCoach, async (req, res) => {
  try {
    const joueurs = await Joueur.find({ "coach": req.user.id });
    if (!joueurs) {
      res.status(400).send("you don't have a joueurs")
    }
    res.send(joueurs)
  } catch {
    res.status(500).send("there is something wrong ")
  }
})

//get profile
router.get('/profile', verifyCoach, async (req, res) => {
  try {
    const coach = await Coach.findById(req.user.id);
    res.send(coach)
  } catch {
    res.status(500).send("there is something wrong ")
  }
})


export default router;
