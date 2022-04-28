const express = require("express");
const router = express.Router();

import verifyCoach from "../middlewares/verifyCoach";
import verifyToken from "../middlewares/verifyToken";
import verifyJoueur from "../middlewares/verifyJoueur";
import { Stat } from "../models/stat";
import { Joueur } from "../models/joueur";
import { Discipline } from "../models/discipline";



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


//Joueur get all stat
router.get("/joueur", verifyJoueur, async (req, res) => {
    try {
        const stats = await Joueur.findById(req.user.id).populate("statistiques")
        res.send(stats.statistiques)
    } catch {
        res.status(404).json("EROOOOOOOOR");
    }
});



router.post("/coach", verifyCoach, async (req, res) => {
    let stat
    try {
        stat = new Stat({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            unite: req.body.unite,
            lien: req.body.lien,
            max: req.body.max,
            isVisible: req.body.isVisible,
            alert: req.body.alert,
            coach: req.user.id

        });
        stat = await stat.save()
        res.status(200).send(stat);
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
                lien: req.body.lien,
                max: req.body.max,
                isVisible: req.body.isVisible,
                alert: req.body.alert,
            },
            { new: true }
        )
        res.status(200).send(stat);
    } catch {
        return res.status(500).send("Stat CANNOT BE UPDATED");
    }
});

router.delete("/coach/:id", verifyCoach, async (req, res) => {
    try {
        const stat = await Stat.findByIdAndRemove(req.params.id);
        res.status(200).send(stat.id)
    } catch {
        res.status(500).json("Error");
    };
});

export default router;