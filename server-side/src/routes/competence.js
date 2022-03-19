const express = require("express");
const router = express.Router();

const { Competence } = require("../models/competence");

import verifyCoach from "../middlewares/verifyCoach";
import verifyToken from "../middlewares/verifyToken";


//Get All competence of joueur with id
router.get("/coach", verifyCoach, async (req, res) => {
    try {
        const compts = await Competence.find({ coach: req.user.id });
        res.send(compts);
    } catch {
        res.status(404).json("EROOOOOR COMPETENCE IS NOT FOUND with this joueur id");
    }
});

//Get competence with id
router.get("/coach/:id", verifyToken, async (req, res) => {
    try {
        const compts = await Competence.findById(req.params.id);
        res.send(compts);
    } catch {
        res.status(404).json("EROOOOOOOOR COMPETENCE IS NOT FOUND with this id");
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
            stars: req.body.stars,
            coach: req.user.id
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
                title: req.body.title,
                description: req.body.description,
                link: req.body.link,
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
router.delete("/coach/:id", verifyCoach, (req, res) => {
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