import { Router } from "express";
import {
  allComments,
  createComment,
  getFirstComments,
  postComments,
} from "../controllers/CommentController.js";
import checkAuth from "../middleware/checkAuth.js";
import { commentCreateValidation } from "../validations/validations.js";
const router = new Router();

router.get("/", commentCreateValidation, allComments);
router.post("/:id", checkAuth, commentCreateValidation, createComment);
router.get("/:id", commentCreateValidation, postComments);
// router.get("/:id", commentCreateValidation, getPostComments);
router.get("/firstfive", commentCreateValidation, getFirstComments);

export default router;
