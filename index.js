import express from "express";
import mongoose from "mongoose";
import checkAuth from "./middleware/checkAuth.js";
import multer from "multer";
import cors from "cors";
import postsRoute from "./routes/posts.js";
import authRoute from "./routes/auth.js";
import commentsRoute from "./routes/comments.js";
import { getLastTags, uploadImg } from "./controllers/PostController.js";

import dotenv from "dotenv";

const PORT = process.env.PORT || 4444;
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

app.use("/posts", postsRoute);
app.use("/auth", authRoute);
app.use("/comments", commentsRoute);
app.get("/tags", getLastTags);

// app.post("/auth/login", loginValidation, handlerValidationErrors, login);

// app.post(
//   "/auth/register",
//   registerValidation,
//   handlerValidationErrors,
//   register
// );

// app.get("/auth/me", checkAuth, getMe);

// app.get("/posts/tags", getLastTags);

// app.get("/posts", getAll);

// app.get("/posts/popular", getPopularPosts);

// app.get("/posts/:id", getOne);

// app.delete("/posts/:id", checkAuth, remove);

// app.patch(
//   "/posts/:id",
//   checkAuth,
//   postCreateValidation,
//   handlerValidationErrors,
//   update
// );

// app.post(
//   "/posts",
//   checkAuth,
//   postCreateValidation,
//   handlerValidationErrors,
//   create
// );

app.post("/upload", checkAuth, upload.single("image"), uploadImg);

// app.post("/comments/:id", checkAuth, commentCreateValidation, createComment);

// app.get("/comments/:id", commentCreateValidation, postComments);

// app.get("/comments/:id", commentCreateValidation, getPostComments);

// app.get("/comments", commentCreateValidation, allComments);

// app.get("/comments/firstfive", commentCreateValidation, getFirstComments);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server started on port localhost:${PORT}`);
});
