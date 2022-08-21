import config from "../config/config";
import { Request, Response } from "express";

import { Pupuk } from "../models/pupuk";
import { IPupuk } from "../interfaces/pupuk";

/**
 * Tambah Pupuk controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const tambahPupuk = async (req?: Request, res?: Response) => {
  const pupuk = await Pupuk.find();

  const newPupuk = [
    {
      nama: "MKP",
      harga: "Rp. 50.000",
      status: "Tersedia",
    },
    {
      nama: "Urea",
      harga: "Rp. 100.000",
      status: "Tersedia",
    },
  ];

  if (pupuk.length === 0) {
    Pupuk.insertMany(newPupuk);
    console.log(`[server]: OK! pupuk-added!`);
  } else {
    console.log(`[server]: OK! pupuk-already-existed!`);
  }
};

/**
 * Ubah Pupuk controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const updatePupuk = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    let status: string = "Tersedia";

    const pupuk = await Pupuk.findById(id);

    if (pupuk?.status === "Tersedia") {
      status = "Tidak Tersedia";
    }

    if (pupuk)
      await Pupuk.findByIdAndUpdate(id, {
        $set: {
          status,
        },
      });

    // Success response
    console.log(`[server]: OK! pupuk-edited!`);
    req.flash("error", "Status pupuk diubah!");
    return res.redirect("/pupuk");
  } catch (error) {
    // Error handler if something went wrong while signing in user
    console.error("edit-pupuk-error", error);
    req.flash("error", "Ubah pupuk error, coba lagi!");
    return res.redirect("/pupuk");
  }
};
