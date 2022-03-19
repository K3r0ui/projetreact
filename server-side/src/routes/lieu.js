const express = require("express");
const router = express.Router();

import verifyCoach from "../middlewares/verifyCoach";
import verifyToken from "../middlewares/verifyToken";
import { Lieu } from "../models/lieu";

//Get All Lieu of coach
router.get('/coach', verifyCoach, async (req, res) => {
    try {
        const lieux = await Lieu.find({ couch: req.user.id });
        res.status(200).send(lieux);
    } catch {
        res.status(500).send("Error")
    }
});

//Get Lieu by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const lieu = await Lieu.findOne({ _id: req.params.id });
        res.status(200).send(lieu);
    } catch {
        res.status(500).send("Error")
    }
});


router.post("/coach", verifyCoach, async (req, res) => {
    let newLieu
    try {
        newLieu = new Lieu({
            name: req.body.name,
            city: req.body.city,
            country: req.body.country,
            address: req.body.address,
            coach: req.user.id
        })
        newLieu = await newLieu.save()
        res.status(200).send(newLieu)

    } catch {
        res.status(500).send("Lieu cannot be created")
    }
})

router.put("/coach/:id", verifyCoach, async (req, res) => {
    try {
        const lieu = await Lieu.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                city: req.body.city,
                country: req.body.country,
                address: req.body.address,
            },
            { new: true }
        )
        res.status(200).send(lieu);
    } catch {
        return res.status(500).send("Lieu CANNOT BE UPDATED");
    }
});


//delete Lieu 
router.delete("/coach/:id", verifyCoach, (req, res) => {
    Lieu.findByIdAndRemove(req.params.id)
        .then((lieu) => {
            if (lieu) {
                return res
                    .status(200)
                    .json({ success: true, Message: "Lieu HAS BEEN DELETED !!" });
            } else {
                return res
                    .status(404)
                    .json({ success: false, Message: "Lieu CANNOT BE DELETED !!" });
            }
        })
        .catch((err) => {
            return res.status(404).json({ success: false, Message: err });
        });
});





export default router;
