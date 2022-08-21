import express from "express";
import { updatePupuk } from "../controllers/pupuk";

export const router = express.Router();

router.put("/", updatePupuk);
