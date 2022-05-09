import express from "express";
import mongoose from 'mongoose';
import { Event } from "../models/event";
import verifyJoueur from "../middlewares/verifyJoueur";
import verifyCoach from "../middlewares/verifyCoach";
import { Joueur } from "../models/joueur";
import verifyToken from "../middlewares/verifyToken";


const router = express.Router();

//All evevent for Coach
router.get('/coach', verifyCoach, async (req, res) => {
    try {
        const events = await Event.find({ coach: req.user.id }).populate('joueurs.joueur')
        if (!events) {
            req.status(400).send("No event Found");
        }
        res.status(200).send(events);
    } catch {
        res.status(500).send("Eroor")
    }
});


//get All """""""id""""""""""" joueur participate in event

router.get('/coach/participate/:id', verifyCoach, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).select("joueurs");
        const jrs = event.joueurs.map(joueur => {
            if (joueur.status == "participer") {
                return joueur.joueur
            }
        })
        if (!jrs[0]) {
            res.send("there not user participate ")
        } else {
            res.send(jrs)
        }


    } catch {
        res.status(500).send("there is some error")
    }
});


router.get('/coach/interess/:id', verifyCoach, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).select("joueurs");
        const jrs = event.joueurs.map(joueur => {
            if (joueur.status == "interessé") {
                return joueur.joueur
            }
        })
        if (!jrs[0]) {
            res.send("there not user interessted ")
        }
        res.send(jrs)

    } catch {
        res.status(500).send("there is some error")
    }
});

router.get('/coach/notparticipate/:id', verifyCoach, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).select("joueurs");
        const jrs = event.joueurs.map(joueur => {
            if (joueur.status == "ne pas participer") {
                return joueur.joueur
            }
        })
        if (!jrs[0]) {
            res.send("there not user not participate ")
        }
        res.send(jrs)

    } catch {
        res.status(500).send("there is some error")
    }
})




//Get list of Event of here Coach
router.get("/joueur/private", verifyJoueur, async (req, res) => {
    try {
        const joueur = await Joueur.findById(req.user.id)
        const coachid = joueur.coach
        const events = await Event.find(
            { coach: coachid, etat: "privé" }
        ).populate('joueurs.joueur')
        .populate('coach')
        if (!events) {
            req.status(200).send("No event Found");
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
        ).populate('joueurs.joueur')
         .populate('coach')
        if (!events) {
            req.status(400).send("No event Found");
        }
        res.status(200).send(events);
    } catch {
        res.status(500).send("Eroor")
    }
})



//Joueur get """"id""""" of all evnt participer
router.get("/joueur/participate", verifyJoueur, async (req, res) => {
    try {
        const joueur = await Joueur.findById(req.user.id).populate("events");
        const events = joueur.events.map(event => {
            if (event.status == "participer") {
                return event.event
            }
        });
        console.log(events[0]);
        if (!events[0]) {
            res.status(400).send("have not event participate")
        } else {
            res.send(events)
        }
    }
    catch {
        res.status(500).send("there is some error")
    }
})


router.get("/joueur/interess", verifyJoueur, async (req, res) => {
    try {
        const joueur = await Joueur.findById(req.user.id).populate("events");
        const events = joueur.events.map(event => {
            if (event.status == "interessé") {
                return event.event
            }
        });
        console.log(events[0]);
        if (!events[0]) {
            res.status(400).send("have not event interesser")
        } else {
            res.send(events)
        }
    }
    catch {
        res.status(500).send("there is some error")
    }
})




//routes for players and coatchs 
router.get('/:id', verifyToken, async (req, res) => {
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
router.post('/coach', verifyCoach, async (req, res) => {
    let newEvent
    try {
        newEvent = new Event({
            name: req.body.name,
            etat: req.body.etat,
            description: req.body.description,
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
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product Id');
    }
    try {
        const event = await Event.findOneAndUpdate(
            { _id: req.params.id },
            {
                etat: req.body.etat,
                name: req.body.name,
                description: req.body.description,
            },
            { new: true }
        );
        res.send(event);
    } catch {
        return res.status(404).send("Event CANNOT BE UPDATED ");
    }
});


router.delete("/coach/:id", verifyCoach, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        event.joueurs.forEach(async (x) => {
            let joueur = await Joueur.findById(x.joueur)

            const findIndex = joueur.events.findIndex(
                (x) => x.event == req.params.id
            );
            joueur.events.splice(findIndex, 1);
            await joueur.save();
        })

        const r=await Event.findByIdAndRemove(req.params.id);
        res.status(200).json(r);
    } catch(e) {
        res.status(500).json("erreeer");
    }
});



//Joueur Join Event 
router.put('/joueur/join/:id', verifyJoueur, async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).send('Invalid Product Id');
        }
        const joueur = await Joueur.findById(req.user.id);
        const index = joueur.events.findIndex((x) => x.event == req.params.id)
        if (index !== -1) {
            res.status(200).send("you are ready join this event")
        } else if (req.body.status != "interessé" && req.body.status != "participer" && req.body.status != "ne pas participer") {
            res.status(200).send("status Error")
        } else {
            const event = await Event.findByIdAndUpdate(
                req.params.id,
                { $push: { joueurs: { joueur: req.user.id, status: req.body.status } } },
                { new: true }
            );
            await Joueur.findByIdAndUpdate(
                req.user.id,
                { $push: { events: { event: req.params.id, status: req.body.status } } },
                { new: true }
            )
            res.status(200).send(event);
        }

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
