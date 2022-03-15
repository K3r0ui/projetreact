const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Defi } = require("../models/defi");
const { Joueur } = require("../models/joueur");


import verifyCoach from "../middlewares/verifyCoach";
import verifyJoueur from "../middlewares/verifyJoueur";

router.get('/coach', verifyCoach, async (req, res) => {
    try {
        const defi = await Defi.find({ coach: req.user.id });
        res.status(200).send(defi);

    } catch {
        res.status(400).send("No Defi Trouved")
    }

})

router.get('/coach/:id', verifyCoach, async (req, res) => {
    try {
        const defi = await Defi.findOne({ _id: req.params.id, coach: req.user.id });
        res.status(200).send(defi)
    } catch {
        res.status(400).send("No Defi Trouved under Coach")
    }

})

router.get('/joueur', verifyJoueur, async (req, res) => {
    try {
        const defi = await Defi.find({ joueur: req.user.id })
        res.status(200).send(defi)
    } catch {
        res.status(400).send("No Defi Trouved under Player")
    }
})

router.get('/joueur/:id', verifyJoueur, async (req, res) => {
    try {
        let defi = await Defi.findOne({ _id: req.params.id, joueur: req.user.id })
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
            joueur: req.body.joueur
        })
        newDefi.save()
        res.status(200).send(newDefi)

    } catch {
        req.status(400).send("Defi can not be created !!")

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
        return res.status(404).send("Defi CANNOT BE UPDATED ");
    }
})

router.put('/joueur/:id', verifyJoueur, async (req, res) => {
    try {
        const defi = await Defi.findOneAndUpdate(
            { _id: req.params.id, joueur: req.user.id },
            {
                done: true,
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