const express = require("express");
const router = express.Router();

const { Competence } = require("../models/competence");

import verifyCoach from "../middlewares/verifyCoach";
import verifyJoueur from "../middlewares/verifyJoueur";


//Get All competence of joueur with id
router.get("/coach/all/:id", verifyCoach, async (req, res) => {
    try {
        const compts = await Competence.find({ joueur: req.params.id });
        res.send(compts);
    } catch {
        res.status(404).json("EROOOOOR COMPETENCE IS NOT FOUND with this joueur id");
    }
});

//Get competence with id
router.get("/coach/:id", verifyCoach, async (req, res) => {
    try {
        const compts = await Competence.findById({ _id: req.params.id });
        res.send(compts);
    } catch {
        res.status(404).json("EROOOOOOOOR COMPETENCE IS NOT FOUND with this id");
    }


});

//get all competence visible of Joueur
router.get("/joueur", verifyJoueur, async (req, res) => {
    try {
        const compts = await Competence.find({ joueur: req.user.id, isVisible: true });
        res.status(200).send(compts);
    } catch {
        res.status(400).json("EROOOOOOOOR COMPETENCE IS NOT FOUND");
    }

});

//Get One Competence visible
router.get("/joueur/:id", verifyJoueur, async (req, res) => {
    try {
        const compts = await Competence.findOne({ _id: req.params.id, joueur: req.user.id, isVisible: true });
        res.status(200).send(compts);
    } catch {
        res.status(400).json("EROOOOOOOOR COMPETENCE IS NOT FOUND");
    }
});

// Coach Add new Competence 
router.post("/coach", verifyCoach, async (req, res) => {

    let newComp
    try {
        newComp = new Competence({
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            isVisible: req.body.isVisible,
            stars: req.body.stars,
            joueur: req.body.joueur,
        });
        newComp = await newComp.save();
        res.status(200).send(newComp)
    }
    catch {
        res.status(404).send("THE COMPETENCE CANNOT BE CREATED");
    }
});

//Coach update visibility and stars of Competence 
router.put("/coach/:id", verifyCoach, async (req, res) => {
    try {
        const compt = await Competence.findByIdAndUpdate(
            req.params.id,
            {
                isVisible: req.body.isVisible,
                stars: req.body.stars,
            },
            { new: true }
        );
        res.send(compt);
    } catch {
        return res.status(400).send("COMPETENCE CANNOT BE UPDATED");
    }

});

//delete compentence 
router.delete("/:id", verifyCoach, (req, res) => {
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