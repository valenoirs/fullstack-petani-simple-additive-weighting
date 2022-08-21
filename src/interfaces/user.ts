import { Model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  nama: string;
  alamat: string;
  jamBuka: string;
  jamTutup: string;
}

// User Schema method interface
export interface IUserMethod {
  comparePassword(password: string): boolean;
}

// User model type
export type UserModel = Model<IUser, {}, IUserMethod>;
