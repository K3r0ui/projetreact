import jwt from "jsonwebtoken";
import { Joueur } from "../models/joueur";

export default (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.JWTSECRETKEY_J);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export const firstAuthMid = async (req, res, next) => {
  try {
    let joueur = await Joueur.findById(req.user.id);
    if (joueur.firstAuth) {
      next();
    } else {
      res.status(400).send("Joueur Not allowed");
    }
  } catch (error) {
    res.status(400).send("Error query");
  }
};
