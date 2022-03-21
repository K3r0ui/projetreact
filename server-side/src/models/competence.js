import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const competenceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
      required: false
    },
    coach: {
      type: ObjectId,
      ref: "Coach"
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

export const Competence = mongoose.model("Competence", competenceSchema);
