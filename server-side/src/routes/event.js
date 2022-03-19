import express from "express";
import { Event } from "../models/event";
import { EventJoueur } from "../models/eventJoueur";
import api_key from "../middlewares/api_key";
import verifyJoueur from "../middlewares/verifyJoueur";
import verifyCoach from "../middlewares/verifyCoach";
import { Joueur } from "../models/joueur";


const router = express.Router();

//All evevent for Coach
router.get('/coach', verifyCoach, async (req, res) => {
    try {
        const events = await Event.find({ coach: req.user.id })
        if (!events) {
            req.status(400).send("No event Found");
        }
        res.status(200).send(events);
    } catch {
        res.status(500).send("Eroor")
    }
})


//Get list of Event of here Coach
router.get("/joueur/private", verifyJoueur, async (req, res) => {
    try {
        const joueur = await Joueur.findById(req.user.id)
        const coachid = joueur.coach
        const events = await Event.find(
            { coach: coachid }
        )
        if (!events) {
            req.status(400).send("No event Found");
        }
        res.status(200).send(events);
    } catch {
        res.status(500).send("Eroor")
    }
});




//Get list of public Event
router.get("/joueur/public", verifyJoueur, async (req, res) => {
    try {
        const events = await Event.find(
            { etat: "public" }
        )
        if (!events) {
            req.status(400).send("No event Found");
        }
        res.status(200).send(events);
    } catch {
        res.status(500).send("Eroor")
    }
})




//routes for players and coatchs 
router.get('/:id', api_key, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.status(200).send(event);
        }
        res.status(200).json({
            msg: "event not exists"
        });
    }
    catch {
        res.status(400).send("No Event Trouved")
    }

})


//routes for  coatchs 
// insert event 
router.post('/coach', [api_key, verifyCoach], async (req, res) => {
    let newEvent
    try {
        newEvent = new Event({
            name: req.body.name,
            etat: req.body.etat,
            coach: req.user.id,
        })
        newEvent.save()
        res.status(200).send(newEvent)

    } catch {
        req.status(400).send("event can not be created !!")

    }
})

// update event 
router.put('/coach/:id', verifyCoach, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate(
            { _id: req.params.id },
            {
                etat: req.body.etat,
                name: req.body.name
            },
            { new: true }
        );
        res.send(event);
    } catch {
        return res.status(404).send("Event CANNOT BE UPDATED ");
    }
});


router.delete("/coach/:id", verifyCoach, (req, res) => {
    Event.findByIdAndRemove(req.params.id)
        .then((event) => {
            if (event) {
                return res
                    .status(200)
                    .json({ success: true, Message: "Event HAS BEEN DELETED !!" });
            } else {
                return res
                    .status(404)
                    .json({ success: false, Message: "Event CANNOT BE DELETED !!" });
            }
        })
        .catch((err) => {
            return res.status(404).json({ success: false, Message: err });
        });
});





//Joueur Join Event 
router.put('/joueur/join/:id', verifyJoueur, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { $push: { joueurs: req.user.id } },
            { new: true }
        );
        await Joueur.findByIdAndUpdate(
            req.user.id,
            { $push: { event: req.params.id } },
            { new: true }
        )
        res.status(200).send(event);
    } catch {
        res.status(400).send("player can not join event")
    }
})


//Get joueur All event Joind
router.get('/joueur/joined', verifyJoueur, async (req, res) => {
    try {
        const events = await Joueur.findById(req.user.id).populate("event")
        if (!events) {
            req.status(400).send("No event Found");
        }
        res.status(200).send(events.event);
    } catch {
        res.status(500).send("Eroor")
    }
})





export default router;
