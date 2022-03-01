import mongoose from "mongoose";

const disciplineSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Discipline = mongoose.model("Discipline", disciplineSchema);
