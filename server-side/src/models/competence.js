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
    stars: {
      type: Number,
    },
    changement: {
      type: Boolean,
    },
    link: {
      type: String,
      required: false
    },
    joueur: {
      type: ObjectId,
      ref: "Joueur",
    },
  },
  { timestamps: true }
);

export const Competence = mongoose.model("Competence", competenceSchema);
