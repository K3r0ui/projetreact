import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const statSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    unite: {
      type: String,
    },
    changement: {
      type: String,
    },
    discipline: {
      type: ObjectId,
      ref: "Discipline",
    },
  },
  { timestamps: true }
);

export const Stat = mongoose.model("Stat", statSchema);
