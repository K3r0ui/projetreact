
const express = require("express");
const router = express.Router();

import { Alert } from "../models/alert";

router.get('/coach', async (req, res) => {
    try {
        const alert = await Alert.find();
        res.status(200).send(alert);

    } catch {
        res.status(400).send("No alert Trouved")
    }
})


export default router;