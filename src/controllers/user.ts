import config from "../config/config";
import { Request, Response } from "express";

import { User } from "../models/user";
import { IUser } from "../interfaces/user";
import { signInValidation } from "../helper/user-validation";

/**
 * User Sign in controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signIn = async (req: Request, res: Response) => {
  try {
    // Validate user input
    const value: Pick<IUser, "username" | "password"> =
      await signInValidation.validateAsync(req.body);

    const { username, password } = value;

    const user = await User.findOne({ username });

    // If user didn't found
    if (!user) {
      console.log("[server]: ERR! username-not-registered-in-the-database");
      req.flash("error", "Username tidak ditemukan!");
      return res.redirect("/");
    }

    // Authenticating user by password
    const authenticated = await user.comparePassword(password);

    // If user unauthorized
    if (!authenticated) {
      console.log(
        "[server]: ERR! invalid-user-credential-provided-by-the-client"
      );
      req.flash("error", "Password Salah!");
      return res.redirect("/");
    }

    const clientSession: Pick<IUser, "username"> = {
      username,
    };

    // Set client session
    req.session.user = clientSession;

    // Success response
    console.log(`[server]: OK! ${username}-signed-in!`);
    return res.redirect("/");
  } catch (error) {
    // Error handler if something went wrong while signing in user
    console.error("sign-in-error", error);
    req.flash("error", "Login gagal, coba lagi!");
    return res.redirect("/");
  }
};

/**
 * User Sign out controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const signOut = async (req: Request, res: Response) => {
  try {
    if (!req.session.user) {
      console.log("[server]: ERR! no-session-id-provided-by-the-client!");
      req.flash("error", "Sign out gagal, coba lagi!");
      return res.redirect("/");
    }

    const { username } = req.session.user;

    req.session.destroy((error: Error) => {
      if (error) throw error;

      res.clearCookie(config.SESSION_COLLECTION_NAME);

      // Success response
      console.log(`[server]: OK! ${username}-successfully-signed-out!`);
      return res.redirect("/");
    });
  } catch (error) {
    // Error handler if something went wrong while signing out user
    console.log("[server]: ERR! User sign out error!", error);
    req.flash("error", "Sign out gagal, coba lagi!");
    return res.redirect("/");
  }
};
