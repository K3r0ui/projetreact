const express = require("express");
const router = express.Router();

import verifyCoach from "../middlewares/verifyCoach";
import verifyToken from "../middlewares/verifyToken";
import verifyJoueur from "../middlewares/verifyJoueur";
import { Stat } from "../models/stat";
import { Joueur } from "../models/joueur";



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
    let newStat
    try {
        newStat = new Stat({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            unite: req.body.unite,
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
                lien: req.body.lien,
            },
            { new: true }
        )
        res.status(200).send(stat);
    } catch {
        return res.status(500).send("Stat CANNOT BE UPDATED");
    }
});


router.put("/coach/assigned/:id", verifyCoach, async (req, res) => {
    try {
        const stats = await Stat.findById(req.params.id)
        const findIndex = stats.joueurs.findIndex(x => x == req.body.joueur);

        if (findIndex !== -1) {
            res.status(500).send("Joueur already have this stats")
        } else {
            await Joueur.findByIdAndUpdate(
                req.body.joueur,
                {
                    $push: { statistiques: { statistique: req.params.id } }
                }
            )
            const stat = await Stat.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { joueurs: req.body.joueur }
                },
                { new: true }
            )
            res.send(stat);
        }

    } catch {
        return res.status(400).send("statistique CANNOT BE assigned");
    }
});


router.put("/coach/alterstatistiquejoueur/:id", verifyCoach, async (req, res) => {
    try {
        const data = {
            statistique: req.params.id,
            changement: req.body.changement,
            isVisible: req.body.isVisible
        }
        let joueur = await Joueur.findById(req.body.joueur)
        const findIndex = joueur.statistiques.findIndex(x => x.statistique == req.params.id)
        joueur.statistiques[findIndex] = data;
        joueur = await joueur.save();
        res.send(joueur);
    } catch {
        return res.status(400).send("statistique CANNOT BE modifi");
    }
})



router.delete("/coach/:id", verifyCoach, async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.id);

        stat.joueurs.forEach(async x => {
            let joueur = await Joueur.findById(x)
            const findIndex = joueur.statistiques.findIndex(x => x.statistique == req.params.id)
            joueur.statistiques.splice(findIndex, 1)
            await joueur.save()
        })

        await Stat.findByIdAndRemove(req.params.id);
        res.status(200).send("SUCCESS")
    } catch {
        res.status(500).json("Error");
    };
});




export default router;