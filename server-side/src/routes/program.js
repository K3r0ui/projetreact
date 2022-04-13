import express from "express";
import verifyCoach from "../middlewares/verifyCoach";
import verifyToken from "../middlewares/verifyToken";
import { Program } from "../models/program";
import { Seance } from "../models/seance";

const route = express.Router();

// get all programs

// route.get("/:id", verifyToken, async (req, res) => {
//   try {
//     const prog = await Program.findById(req.params.id)
//       .populate("seances");
//     res.send(prog);
//   } catch (error) {
//     res.status(500).send("something wrong happened!");
//   }
// });

// programs created by coach
route.get("/coach", verifyCoach, async (req, res) => {
  console.log("azerty");
  try {
    const prog = await Program.find({ coach: req.user.id }).populate("seances");
    console.log("hit");
    res.send(prog);
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});

// add program
route.post("/coach", verifyCoach, async (req, res) => {
  let prog;
  try {
    prog = new Program({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      videoLink: req.body.videoLink,
      coach: req.user.id,
    });
    await prog.save();
    res.send(prog);
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});

// modify program
route.put("/coach/:id", verifyCoach, async (req, res) => {
  try {
    const prog = await Program.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        videoLink: req.body.videoLink,
      },
      { new: true }
    );
    res.send(prog);
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});

// remove a program
route.delete("/coach/:id", verifyCoach, async (req, res) => {
  try {
    const prog = await Program.findById(req.params.id);
    console.log("hit", prog.id);
    const seances = prog.seances;
    seances.forEach(async (seance) => {
      await Seance.findByIdAndRemove(seance);
    });
    await Program.findByIdAndRemove(req.params.id);
    res.send(prog.id);
  } catch (error) {
    res.status(500).send("something wrong happened!");
  }
});

export default route;
