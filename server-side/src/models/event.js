import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    etat: {
      type: String,
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
    joueurs: [
      {
        type: ObjectId,
        ref: "Joueur"
      }
    ]
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
