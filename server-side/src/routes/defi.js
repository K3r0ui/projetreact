const express = require("express");
const router = express.Router();

const { Defi } = require("../models/defi");


import verifyCoach from "../middlewares/verifyCoach";
import verifyJoueur from "../middlewares/verifyJoueur";
import verifyToken from "../middlewares/verifyToken";
import { Joueur } from "../models/joueur";


//Get List of defi of coach
router.get('/coach', verifyCoach, async (req, res) => {
    try {
        const defi = await Defi.find({ coach: req.user.id });
        res.status(200).send(defi);

    } catch {
        res.status(400).send("No Defi Trouved")
    }
})

//Get List defi of joueur
router.get('/joueur', verifyJoueur, async (req, res) => {
    try {
        const joueur = await Joueur.findById(req.user.id).populate("defis")
        res.status(200).send(joueur.defis)
    } catch {
        res.status(400).send("No Defi Trouved under Player")
    }
})

//Get defit By Id
router.get('/joueur/:id', verifyToken, async (req, res) => {
    try {
        let defi = await Defi.findOne({ _id: req.params.id }).populate("defis")
        res.status(200).send(defi)
    } catch {
        res.status(400).send("No Defi Trouved under Player")
    }
})


router.post('/coach', verifyCoach, async (req, res) => {
    let newDefi
    try {
        newDefi = new Defi({
            description: req.body.description,
            link: req.body.link,
            coach: req.user.id,
        })
        newDefi.save()
        res.status(200).send(newDefi)

    } catch {
        req.status(400).send("Defi can not be created !!")

    }
})

// ADD Joueur to defit
router.put('/coach/assigned/:id', verifyCoach, async (req, res) => {
    try {
        const newJoueurs = {
            joueur: req.body.joueur,
            delai: req.body.delai
        }
        const defi = await Defi.findByIdAndUpdate(
            req.params.id,
            { $push: { joueurs: newJoueurs } },
            { new: true }
        );
        await Joueur.findByIdAndUpdate(
            req.body.joueur,
            { $push: { defis: req.params.id } },
            { new: true }
        )
        res.status(200).send(defi);
    } catch {
        res.status(400).send("player can not join defi")
    }
})

router.put('/coach/:id', verifyCoach, async (req, res) => {
    try {
        const defi = await Defi.findOneAndUpdate(
            { _id: req.params.id, coach: req.user.id },
            {
                description: req.body.description,
                link: req.body.link,
            },
            { new: true }
        );
        res.send(defi);
    } catch {
        return res.status(200).send("Defi CANNOT BE UPDATED ");
    }
})



router.put('/joueur/:id', verifyJoueur, async (req, res) => {
    try {
        const defi = await Defi.findOneAndUpdate(
            { _id: req.params.id },
            {
                done: req.body.done,
            },
            { new: true }
        );
        res.send(defi);
    } catch {
        return res.status(404).send("Defi CANNOT BE UPDATED ");
    }
});


router.delete("/coach/:id", verifyCoach, (req, res) => {
    Defi.findOneAndRemove({ _id: req.params.id, coach: req.user.id })
        .then((defi) => {
            if (defi) {
                return res
                    .status(200)
                    .json({ success: true, Message: "Defi HAS BEEN DELETED !!" });
            } else {
                return res
                    .status(404)
                    .json({ success: false, Message: "Defi CANNOT BE DELETED !!" });
            }
        })
        .catch((err) => {
            return res.status(404).json({ success: false, Message: err });
        });
});

export default router;