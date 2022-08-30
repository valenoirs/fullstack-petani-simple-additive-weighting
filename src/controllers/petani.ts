import config from "../config/config";
import { Request, Response } from "express";

import { Petani } from "../models/petani";
import { IPetani } from "../interfaces/petani";
import {
  tambahPetaniValidation,
  updatePetaniValidation,
} from "../helper/petani-validation";

/**
 * Tambah Petani controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const tambahPetani = async (req: Request, res: Response) => {
  try {
    // Validate petani input
    const value: Omit<IPetani, "kriteria" | "id"> =
      await tambahPetaniValidation.validateAsync(req.body);

    const { idPetani } = value;

    const petani = await Petani.findOne({ idPetani });

    // If petani existed
    if (petani) {
      console.log("[server]: ERR! petani-already-existed");
      req.flash("error", "Petani sudah terdaftar, coba lagi!");
      return res.redirect("/petani");
    }

    await new Petani(value).save();

    // Success response
    console.log(`[server]: OK! petani-added!`);
    req.flash("error", "Petani berhasil ditambahkan!");
    return res.redirect("/petani");
  } catch (error) {
    // Error handler if something went wrong while signing in user
    console.error("tambah-petani-error", error);
    req.flash("error", "Tambah petani error, coba lagi!");
    return res.redirect("/petani");
  }
};

/**
 * Ubah Petani controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const updatePetani = async (req: Request, res: Response) => {
  try {
    const value = await updatePetaniValidation.validateAsync(req.body);

    const { id, idPetani, idPetaniOld, nama, kode, alamat, subsektor } = value;

    await Petani.updateOne(
      { idPetani: idPetaniOld },
      {
        $set: {
          nama,
          idPetani,
          kode,
          alamat,
          subsektor,
        },
      }
    );

    // Success response
    console.log(`[server]: OK! petani-edited!`);
    req.flash("error", "Petani berhasil diubah!");
    return res.redirect("/petani");
  } catch (error) {
    // Error handler if something went wrong while signing in user
    console.error("edit-petani-error", error);
    req.flash("error", "Ubah petani error, coba lagi!");
    return res.redirect("/petani");
  }
};

/**
 * Hapus Petani controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const deletePetani = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const petani = await Petani.findById(id);

    await Petani.findByIdAndDelete(id);

    // Success response
    console.log(`[server]: OK! petani-deleted!`);
    req.flash("error", "Petani berhasil dihapus!");
    return res.redirect("/petani");
  } catch (error) {
    // Error handler if something went wrong while signing in user
    console.error("delete-petani-error", error);
    req.flash("error", "Delete petani error, coba lagi!");
    return res.redirect("/petani");
  }
};

export const updateKriteria = async (req: Request, res: Response) => {
  try {
    const { id, kriteria } = req.body;

    const newKriteria = kriteria.map(Number);

    const petani = await Petani.findById(id);

    if (!petani) {
      console.log("[server]: ERR! petani-not-found");
      req.flash("error", "Petani tidak ditemukan, coba lagi!");
      return res.redirect("/kriteria");
    }

    await Petani.findByIdAndUpdate(id, { $set: { kriteria: newKriteria } });

    console.log("[server]: OK! petani-kriteria-updated");
    req.flash("error", "Kriteria berhasil diubah!");
    return res.redirect("/kriteria");
  } catch (error) {
    // Error handler if something went wrong while signing in user
    console.error("update-kriteria-error", error);
    req.flash("error", "Update kriteria error, coba lagi!");
    return res.redirect("/kriteria");
  }
};
