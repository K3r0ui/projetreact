
const express = require("express");
const router = express.Router();

import { Discipline } from "../models/discipline";

router.get('/coach', async (req, res) => {
    try {
        const disipline = await Discipline.find();
        res.status(200).send(disipline);

    } catch {
        res.status(400).send("No disipline Trouved")
    }
})


export default router;