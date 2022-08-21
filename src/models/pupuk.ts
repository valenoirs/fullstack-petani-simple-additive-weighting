import { Schema, model } from "mongoose";
import { IPupuk, PupukModel } from "../interfaces/pupuk";

// User Schema
const PupukSchema: Schema = new Schema<IPupuk, PupukModel>(
  {
    nama: { type: String, required: true, unique: true },
    harga: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Export Pupuk model
export const Pupuk = model<IPupuk, PupukModel>("Pupuk", PupukSchema);
