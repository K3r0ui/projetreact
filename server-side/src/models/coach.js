import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      type: String,
    },
    password: {
      type: String,
    },
    discipline: {
      type: ObjectId,
      ref: "Discipline",
    },
    firstAuth: {
      type: Boolean,
      default: true,
    },
    alert: {
      type: ObjectId,
      ref: "Alert"
    },
    nbsc: {
      type: Number,
      required: true
    },
    abonnement: {
      type: {
        type: String,
        default: "free"
      },
      doc: {
        type: Date,
        default: new Date()
      },
      nbjoueur: {
        type: Number,
        default: 3
      }
    }
  },
  { timestamps: true }
);

coachSchema.statics.findByEmail = async (email) => {
  return await Coach.findOne({ email });
};

coachSchema.methods.generateJWT = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWTSECRETKEY_C, {
    expiresIn: "10h",
  });
};

coachSchema.pre("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(parseInt(process.env.JWTSECRETKEY_C));
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

coachSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

export const Coach = mongoose.model("Coach", coachSchema);
