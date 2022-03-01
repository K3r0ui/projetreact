import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const invitationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    etat: {
      type: String,
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
  },
  { timestamps: true }
);

export const Invitation = mongoose.model("Invitation", invitationSchema);
