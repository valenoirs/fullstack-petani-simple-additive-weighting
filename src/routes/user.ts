import express from "express";
import { signIn, signOut } from "../controllers/user";

export const router = express.Router();

router.route("/signin").post(signIn);

router.route("/signout").get(signOut);
