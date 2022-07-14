import express from "express";
import mongoose from "mongoose";
import checkAuth from "./utils/checkAuth.js";
import multer from "multer";
import cors from "cors";

import {
  create,
  getAll,
  getLastTags,
  getOne,
  remove,
  update,
  uploadImg,
} from "./controllers/PostController.js";
import { getMe, login, register } from "./controllers/UserController.js";

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations/validations.js";
import handlerValidationErrors from "./utils/handlerValidationErrors.js";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB is connecting"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handlerValidationErrors, login);

app.post(
  "/auth/register",
  registerValidation,
  handlerValidationErrors,
  register
);

app.get("/auth/me", checkAuth, getMe);

app.get("/tags", getLastTags);

app.get("posts/tags", getLastTags);

app.get("/posts", getAll);

app.get("/posts/:id", getOne);

app.delete("/posts/:id", checkAuth, remove);

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handlerValidationErrors,
  update
);

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handlerValidationErrors,
  create
);

app.post("/upload", checkAuth, upload.single("image"), uploadImg);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server is runing");
});
