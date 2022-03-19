import express from "express";
import bcrypt from "bcryptjs";
import { Coach } from "../models/coach";
import verifyCoach, { firstAuthMid } from "../middlewares/verifyCoach";

const router = express.Router();

// router.get('/list', async (req, res) => {
//     const coackList = await Coach.find();
//     if (!coackList) {
//         res.status(500).json({ success: false });
//     }
//     res.send(coackList);
// })

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
  const result = await Coach.findOneAndUpdate(
    { _id: req.user.id },
    {
      $set: { discipline: req.body.discipline },
    },
    { new: true }
  );

  res.send(result);
});





export default router;
