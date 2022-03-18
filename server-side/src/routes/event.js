import express from "express";
import { Event } from "../models/event";
import { EventJoueur } from "../models/eventJoueur";
import api_key from "../middlewares/api_key";
import verifyJoueur from "../middlewares/verifyJoueur";
import verifyCoach, { firstAuthMid } from "../middlewares/verifyCoach";



const router = express.Router();


//routes for players and coatchs 
router.get('/',api_key, async(req , res)=>{
    try{
        const event = await Event.findById(req.id);
        if(event)
        {
            res.status(200).send(event);
        }
        res.status(200).json({
            msg:"event not exists"
        });
        

    }
    catch{
        res.status(400).send("No Event Trouved")
    }

})






//routes for  coatchs 
// insert event 
router.post('/coach',api_key, async (req, res) => {
    let newEvent
    try {
        newEvent = new Event({
            name: req.body.name,
            etat: "etat1",
            coach: req.body.coach,
        })
        newEvent.save()
        res.status(200).send(newEvent)

    } catch {
        req.status(400).send("Defi can not be created !!")

    }
})

// update event 
router.put('/event/:id', async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate(
            { _id: req.params.id },
            {
                etat: req.body.etat,
                name: req.body.name
            },
            { new: true }
        );
        res.send(Event);
    } catch {
        return res.status(404).send("Event CANNOT BE UPDATED ");
    }
});



export default router;
