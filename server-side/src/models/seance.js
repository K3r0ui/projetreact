import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;




const seanceSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
    },
    date: {
      type: Date,
    },
    goal: {
      type: Boolean,
    },
    feedback: {
      type: String,
    },
    etat: {
      type: String,
    },
    coach: {
      type: ObjectId,
      ref: "Coach",
    },
    program: {
      type: ObjectId,
      ref: "Program",
    },
    lieu: {
      type: ObjectId,
      ref: "Lieu",
    },
    joueur: {
      type: ObjectId,
      ref: "Joueur",
    },
    competences: [
      {
        type: ObjectId,
        ref: "Competence",
      },
    ],
    statistiques: [
    {  statistique:{
        type: ObjectId,
        ref: "Stat",
      },

    valeur:{
      type: String,
    },

    }  
    ],
    raisonannul: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Seance = mongoose.model("Seance", seanceSchema);
