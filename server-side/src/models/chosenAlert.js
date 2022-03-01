import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const chosenAlertSchema = new mongoose.Schema(
  {
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
    alert: {
      type: ObjectId,
      ref: "Alert",
    },
  },
  { timestamps: true }
);

export const ChosenAlert = mongoose.model("ChosenAlert", chosenAlertSchema);
