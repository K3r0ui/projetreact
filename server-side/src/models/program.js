import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String,
    },
    image: {
      type: String
    },
    VideoLink: {
      type: String
    },
    competences: [
      {
        competence: {
          type: ObjectId,
          ref: "Competence"
        },
        done: {
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
        done: {
          type: Boolean,
          default: false
        }
      }
    ],
    seances: [
      {
        type: ObjectId,
        ref: "Seance"
      }
    ]
  },
  { timestamps: true }
);

export const Program = mongoose.model("Program", programSchema);
