import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const joueurSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
  },
  { timestamps: true }
);

export const Joueur = mongoose.model("Joueur", joueurSchema);
