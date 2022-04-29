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
    stars: {
      type: Number,
      min: [0, 'Must be at least 0'],
      max: [5, 'Must be at most 5']
    },
    isVisible: {
      type: Boolean,
      default: false
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
