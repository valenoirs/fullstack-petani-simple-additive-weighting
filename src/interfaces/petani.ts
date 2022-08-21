import { Model } from "mongoose";

export interface IPetani {
  id?: string;
  nama: string;
  idPetani: string;
  kode: string;
  alamat: string;
  subsektor: string;
  kriteria: number[];
}

// User model type
export type PetaniModel = Model<IPetani>;
