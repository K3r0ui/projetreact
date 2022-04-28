import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const statSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    unite: {
      type: String,
    },
    lien: {
      type: String
    },
    max: {
      type: String
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
    alert: {
      type: Boolean,
      default: false
    },
    joueurs: [
      {
        type: ObjectId,
        ref: "Joueur",
      }
    ],
  },
  { timestamps: true }
);

export const Stat = mongoose.model("Stat", statSchema);
