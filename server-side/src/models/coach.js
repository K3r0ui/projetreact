import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const coachSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
    },
    discipline: {
      type: ObjectId,
      ref: "Discipline",
    },
  },
  { timestamps: true }
);

export const Coach = mongoose.model("Coach", coachSchema);
