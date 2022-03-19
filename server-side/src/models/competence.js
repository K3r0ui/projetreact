import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const competenceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    stars: {
      type: Number,
      min: [0, 'Must be at least 0'],
      max: [5, 'Must be at most 5']
    },
    link: {
      type: String,
      required: false
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    }
  },
  { timestamps: true }
);

export const Competence = mongoose.model("Competence", competenceSchema);
