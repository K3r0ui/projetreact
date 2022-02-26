import express from "express";
const route = express.Router();

route.get("/", (_, res) => {
  res.send("Hello World.. !");
});

export default route;
