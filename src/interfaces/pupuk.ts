import { Model } from "mongoose";

export interface IPupuk {
  nama: string;
  harga: string;
  status: string;
}

// User model type
export type PupukModel = Model<IPupuk>;
