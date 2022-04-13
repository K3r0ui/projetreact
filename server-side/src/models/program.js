import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    videoLink: {
      type: String,
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },

    seances: [
      {
        type: ObjectId,
        ref: "Seance",
      },
    ],
  },
  { timestamps: true }
);

export const Program = mongoose.model("Program", programSchema);
