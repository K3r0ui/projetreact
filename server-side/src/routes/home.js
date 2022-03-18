import express from "express";
import api_key from "../middlewares/api_key";

const route = express.Router();

route.get("/",api_key, (_, res) => {
  res.send("Hello World achref wx");
});

export default route;
