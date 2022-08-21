import Joi from "joi";

const username = Joi.string().alphanum().min(5).max(20).required();
const password = Joi.string().min(5).max(30).required();

// Sign in input validation
export const signInValidation = Joi.object().keys({
  username,
  password,
});
