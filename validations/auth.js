import { body } from "express-validator";

export const registerValidation = [
  body("email", "Wrong email format").isEmail(),
  body("password", "The password should have minimum 5 letters").isLength({
    min: 5,
  }),
  body("fullName", "The name should have minimum 3 letters").isLength({
    min: 3,
  }),
  body("avatarUrl", "Wrong address to avatar").optional().isURL(),
];
