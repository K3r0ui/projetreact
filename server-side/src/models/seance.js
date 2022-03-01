import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const seanceSchema = new mongoose.Schema(
  {
    goal: {
      type: Boolean,
    },
    feedback: {
      type: String,
    },
    etat: {
      type: String,
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
    program: {
      type: ObjectId,
      ref: "Program",
    },
    lieu: {
      type: ObjectId,
      ref: "Lieu",
    },
  },
  { timestamps: true }
);

export const Seance = mongoose.model("Seance", seanceSchema);
