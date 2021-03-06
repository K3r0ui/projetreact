import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type:{
      type: String,
    }
  },
  { timestamps: true }
);

export const Alert = mongoose.model("Alert", alertSchema);
