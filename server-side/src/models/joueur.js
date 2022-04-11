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
      type: String,
    },
    photo: {
      type: String
    },
    pob: {
      type: String
    },
    sexe: {
      type: String
    },
    job: {
      type: String
    },
    ville: {
      type: String
    },
    telephone: {
      type: String
    },
    price: {
      type: Number
    },
    taille: {
      type: Number
    },
    poid: {
      type: Number
    },
    orientation: {
      type: String,
      enum: ["droitier", "gaucher"]
    },
    nbscweek: {
      type: Number
    },
    password: {
      type: String
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
    firstAuth: {
      type: Boolean,
      default: true,
    },
    etat: {
      type: String,
      default: "actif"
    },
    events: [
      {
        event: {
          type: ObjectId,
          ref: "Event"
        },
        status: {
          type: String,
        }
      }
    ],
    defis: [
      {
        type: ObjectId,
        ref: "Defi"
      }
    ],
    competences: [
      {
        competence: {
          type: ObjectId,
          ref: "Competence"
        },
        stars: {
          type: Number,
          min: [0, 'Must be at least 0'],
          max: [5, 'Must be at most 5']
        },
        isVisible: {
          type: Boolean,
          default: false
        }
      }
    ],
    statistiques: [
      {
        statistique: {
          type: ObjectId,
          ref: "Stat"
        },
        changement: {
          type: String,
        },
        isVisible: {
          type: Boolean,
          default: false
        }
      }
    ],
    invitation: {
      type: ObjectId,
      ref: "Invitation"
    }
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

// joueurSchema.pre("save", async function (next) {
//   const user = this;
//   const salt = await bcrypt.genSalt(parseInt(process.env.JWTSECRETKEY_J));
//   user.password = await bcrypt.hash(user.password, salt);
//   next();
// });

joueurSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

export const Joueur = mongoose.model("Joueur", joueurSchema);
