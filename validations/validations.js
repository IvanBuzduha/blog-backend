import { body } from "express-validator";

export const loginValidation = [
  body("email", "Wrong email format").isEmail(),
  body("password", "The password should have minimum 5 letters").isLength({
    min: 5,
  }),
];
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
export const postCreateValidation = [
  body("title", "Enter the post title").isLength({ min: 3 }).isString(),
  body("text", "Enter the post text").isLength({ min: 10 }).isString(),
  body("tags", "Wrong format tags").optional().isString(),
  body("imageUrl", "Wrong address to image").optional().isString(),
];
