import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const invitationSchema = new mongoose.Schema(
  {
    joueur: {
      type: ObjectId,
      ref: "Joueur",
    },
    etat: {
      type: String,
      default: "En attente"
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
  },
  { timestamps: true }
);

export const Invitation = mongoose.model("Invitation", invitationSchema);
