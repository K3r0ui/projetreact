import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const joueurSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
    firstAuth: {
      type: Boolean,
      default: true,
    },
    event: [
      {
        type: ObjectId,
        ref: "Event"
      }
    ],
    defis: [
      {
        type: ObjectId,
        ref: "Defi"
      }
    ]
  },
  { timestamps: true }
);

joueurSchema.statics.findByEmail = async (email) => {
  return await Joueur.findOne({ email });
};

joueurSchema.methods.generateJWT = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWTSECRETKEY_J, {
    expiresIn: "10h",
  });
};

joueurSchema.pre("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(parseInt(process.env.JWTSECRETKEY_J));
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

joueurSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

export const Joueur = mongoose.model("Joueur", joueurSchema);
