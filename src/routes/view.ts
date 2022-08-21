import express, { Request, Response } from "express";
import { Petani } from "../models/petani";
import { Pupuk } from "../models/pupuk";

import valenoirs from "../helper/simple-additive-weighting";

export const router = express.Router();

const title: string = "Simple Additive Weighting";

router.get("/", async (req: Request, res: Response) => {
  const petani = await Petani.find();

  const score = valenoirs(petani);

  res.render("index", {
    layout: "layouts/index",
    title,
    score,
    error: req.flash("error"),
  });
});

router.get("/petani", async (req: Request, res: Response) => {
  if (!req.session.user) {
    req.flash("error", "Login untuk melihat detail!");
    res.redirect("/");
  } else {
    const petani = await Petani.find();

    res.render("petani", {
      layout: "layouts/index",
      title,
      petani,
      error: req.flash("error"),
    });
  }
});

router.get("/pupuk", async (req: Request, res: Response) => {
  if (!req.session.user) {
    req.flash("error", "Login untuk melihat detail!");
    res.redirect("/");
  } else {
    const pupuk = await Pupuk.find();

    res.render("pupuk", {
      layout: "layouts/index",
      title,
      pupuk,
      error: req.flash("error"),
    });
  }
});

router.get("/kriteria", async (req: Request, res: Response) => {
  if (!req.session.user) {
    req.flash("error", "Login untuk melihat detail!");
    res.redirect("/");
  } else {
    const petani = await Petani.find();

    res.render("kriteria", {
      layout: "layouts/index",
      title,
      petani,
      error: req.flash("error"),
    });
  }
});
