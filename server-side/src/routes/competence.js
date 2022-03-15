const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Competence } = require("../models/competence");
const { Joueur } = require("../models/joueur");

import verifyCoach from "../middlewares/verifyCoach";

router.get("/competence/:id", [verifyCoach], async (res, req) => {
    const joueur = await Joueur.findById(req.params.id);
    if (!joueur) {
        res
            .status(500)
            .json({ Message: "ERROOOOOOOOR Joueur NOT FOUND WITH THIS ID" });
    }
    const compts = await Competence.findOne({ joueur: req.params.id });
    if (!compts) {
        res.status(500).json({ Message: "EROOOOOOOOR COMPETENCE IS NOT FOUND" });
    }
    res.send(compts);
});

router.post("/competence/:id", [verifyCoach], async (res, req) => {
    const joueur = await Joueur.findById(req.params.id);
    if (!joueur) {
        res
            .status(500)
            .json({ Message: "ERROOOOOOOOR Joueur NOT FOUND WITH THIS ID" });
    }
    let newComp
    try {
        newComp = new Competence({
            title: req.body.name,
            description: req.body.description,
            link: req.body.lien,
            changement: req.body.visibility,
            stars: req.body.note,
            joueur: req.params.id,
        });
        newComp = await newComp.save();
    }
    catch {
        res.status(404).send({ Message: "THE COMPETENCE CANNOT BE CREATED" });
    }
});

router.put("/competence/:id", [verifyCoach], async (res, req) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send({ Message: "INVALID COMPETENCE ID" });
    }
    const compt = await Competence.findByIdAndUpdate(
        req.params.id,
        {
            changement: req.body.visibility,
            stars: req.body.note,
        },
        { new: true }
    );
    if (!compt) {
        return res.status(404).send({ Message: "COMPETENCE CANNOT BE UPDATED" });
    }
    res.send(compt);
});

router.delete("/competence/:id", [verifyCoach], (res, req) => {
    Competence.findByIdAndRemove(req.params.id)
        .then((compt) => {
            if (compt) {
                return res
                    .status(200)
                    .json({ success: true, Message: "COMPETENCE HAS BEEN DELETED !!" });
            } else {
                return res
                    .status(404)
                    .json({ success: false, Message: "COMPETENCE CANNOT BE DELETED !!" });
            }
        })
        .catch((err) => {
            return res.status(404).json({ success: false, Message: err });
        });
});


export default router;