import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const lieuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    address: {
      type: String
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
  },
  { timestamps: true }
);

export const Lieu = mongoose.model("Lieu", lieuSchema);
