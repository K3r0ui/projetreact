const express = require("express");
const router = express.Router();

import verifyCoach from "../middlewares/verifyCoach";
import verifyToken from "../middlewares/verifyToken";
import { Stat } from "../models/stat";



//All Static of Coach
router.get("/coach", verifyCoach, async (req, res) => {
    try {
        const stats = await Stat.find({ coach: req.user.id });
        res.status(200).send(stats);
    } catch {
        res.status(500).send("Error")
    }
})

router.get("/:id", verifyToken, async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.id)
        res.status(200).send(stat);
    } catch {
        res.status(500).send("Id not Found")
    }
})

router.get("/joueur")


router.post("/coach", verifyCoach, async (req, res) => {
    let newStat
    try {
        newStat = new Stat({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            unite: req.body.unite,
            changement: req.body.changement,
            lien: req.body.lien,
            discipline: req.body.discipline,
            coach: req.user.id
        });
        newStat = await newStat.save();
        res.status(200).send(newStat);
    } catch {
        res.status(500).send("Stat Cannot be created");
    }
})


router.put("/coach/:id", verifyCoach, async (req, res) => {
    try {
        const stat = await Stat.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                type: req.body.type,
                unite: req.body.unite,
                changement: req.body.changement,
                lien: req.body.lien,
            },
            { new: true }
        )
        res.status(200).send(stat);
    } catch {
        return res.status(500).send("Stat CANNOT BE UPDATED");
    }
});



router.delete("/coach/:id", verifyCoach, (req, res) => {
    Stat.findByIdAndRemove(req.params.id)
        .then((stat) => {
            if (stat) {
                return res
                    .status(200)
                    .json({ success: true, Message: "Stat HAS BEEN DELETED !!" });
            } else {
                return res
                    .status(404)
                    .json({ success: false, Message: "Stat CANNOT BE DELETED !!" });
            }
        })
        .catch((err) => {
            return res.status(404).json({ success: false, Message: err });
        });
});




export default router;