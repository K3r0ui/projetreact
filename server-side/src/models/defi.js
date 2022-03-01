import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const defiSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
  },
  { timestamps: true }
);

export const Defi = mongoose.model("Defi", defiSchema);
