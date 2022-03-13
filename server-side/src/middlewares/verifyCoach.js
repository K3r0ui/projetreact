import jwt from "jsonwebtoken";
import { Coach } from "../models/coach";

export default (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(403).send("Access denied.");
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY_C);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export const firstAuthMid = async (req, res, next) => {
  try {
    let coach = await Coach.findById(req.user.id);
    if (coach.firstAuth) {
      next();
    } else {
      res.status(400).send("Not allowed");
    }
  } catch (error) {
    res.status(400).send("Error query");
  }
};
