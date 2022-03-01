import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const eventJoueurSchema = new mongoose.Schema(
  {
    joueur: {
      type: ObjectId,
      ref: "Joueur",
    },
    event: {
      type: ObjectId,
      ref: "Event",
    },
  },
  { timestamps: true }
);

export const EventJoueur = mongoose.model("EventJoueur", eventJoueurSchema);
