import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Program = mongoose.model("Program", programSchema);
