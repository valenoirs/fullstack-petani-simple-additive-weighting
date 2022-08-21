import { Schema, model } from "mongoose";
import { IPetani, PetaniModel } from "../interfaces/petani";

// User Schema
const PetaniSchema: Schema = new Schema<IPetani, PetaniModel>(
  {
    nama: { type: String, required: true, unique: true },
    idPetani: { type: String, required: true, unique: true },
    kode: { type: String, required: true, unique: true },
    alamat: { type: String, required: true },
    subsektor: { type: String, required: true },
    kriteria: { type: [Number], default: [1, 1, 1, 1] },
  },
  {
    timestamps: true,
  }
);

// Export Petani model
export const Petani = model<IPetani, PetaniModel>("Petani", PetaniSchema);
