import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const defiSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    link: {
      type: String
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
    joueurs: [
      {
        joueur: {
          type: ObjectId,
          ref: "Joueur"
        },
        delai: {
          type: Date
        },
        donejoueur:{
          type: Boolean,
          default: false
        }
      }
    ],
    done: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Defi = mongoose.model("Defi", defiSchema);
