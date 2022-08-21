import express from "express";
import {
  tambahPetani,
  updatePetani,
  deletePetani,
  updateKriteria,
} from "../controllers/petani";

export const router = express.Router();

router.post("/", tambahPetani);

router.put("/", updatePetani);

router.delete("/", deletePetani);

router.patch("/", updateKriteria);
