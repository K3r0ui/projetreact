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
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  let coach = await Coach.findByEmail(req.body.email);

  if (!coach) return res.status(400).send("Email or Password invalid.");

  const validPwd = await bcrypt.compare(req.body.password, coach.password);

  if (!validPwd) return res.status(400).send("Email or Password invalid.");

  const token = await coach.generateJWT();

  res.send({ coach, token });
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
    res.status(500).send("there is some error");
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
    res.status(500).send("there is some error");
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
    res.status(500).send("there is some error");
  }
});
//get list of here joueur
router.get("/alljoueurs", verifyCoach, async (req, res) => {
  try {
    const joueurs = await Joueur.find({ coach: req.user.id })
    if (!joueurs) {
      res.status(400).send("you don't have a joueurs");
    }
    res.send(joueurs);
  } catch {
    res.status(500).send("there is something wrong ");
  }
});


// get the player that terminated the inscription process
const gg = (ee) => {
if (ee.invitation.etat === "Termenated"){
  return ee;
}}

router.get("/alljoueursI/:id", verifyCoach, async (req, res) => {

  try {
    let joueurs = await Joueur.findOne({ _id: req.params.id }).populate("invitation").populate("defis");
    res.send(joueurs);
  } catch {
    res.status(500).send("there is something wrong ");
  }
});

// get list of players that terminated the inscription process  
router.get("/alljoueursI", verifyCoach, async (req, res) => {

  try {

    const joueurs = await Joueur.find({ coach: req.user.id }).populate("invitation");
    const newJr = joueurs.filter(gg);
    if (!joueurs) {
      res.status(400).send("you don't have a joueurs");
    }
    res.send(newJr);
  } catch {
    res.status(500).send("there is something wrong ");
  }
});




//get profile
router.get("/profile", verifyCoach, async (req, res) => {
  try {
    const coach = await Coach.findById(req.user.id);
    res.send(coach);
  } catch {
    res.status(500).send("there is something wrong ");
  }
});

// modifier Profile 
router.put("/modifierprofile", verifyCoach, async (req, res) => {
  try {
      const rest = req.body;
      const coach = await Coach.findByIdAndUpdate(
          req.user.id, rest, { new: true }
      )
      res.send(coach);
  } catch {
      res.status(400).send("there is something wrong ")
  }
});
// modifier Profile Coach Password
router.put("/modifierpassword", verifyCoach, async (req, res) => {
  try {
      const coach = await Coach.findByIdAndUpdate(req.user.id)
      const compare = await bcrypt.compare(req.body.oldPassword, coach.password)
      if (compare) {
          const cc = await Coach.findByIdAndUpdate(
              req.user.id,
              {
                  password: bcrypt.hashSync(req.body.newPassword, 8)
              }
              , { new: true }
          )
          res.send(cc)
      } else {
          res.status(400).send("Verifier votre password")
      }

  } catch {
      res.status(500).send("there is something wrong ")
  }
});
router.put("/payerabonnement", verifyCoach, async (req, res) => {
  let coach;
  try {
    coach = await Coach.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          "abonnement.doc": new Date(),
          "abonnement.type": req.body.type,
        },
      },
      { new: true }
    );

    res.send(coach);
  } catch {
    res.status(500).send("there is something wrong ");
  }
});

export default router;