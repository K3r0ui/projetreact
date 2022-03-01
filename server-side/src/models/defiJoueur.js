import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const defiJoueurSchema = new mongoose.Schema(
  {
    joueur: {
      type: ObjectId,
      ref: "Joueur",
    },
    defi: {
      type: ObjectId,
      ref: "Defi",
    },
  },
  { timestamps: true }
);

export const DefiJoueur = mongoose.model("DefiJoueur", defiJoueurSchema);
