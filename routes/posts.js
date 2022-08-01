import { Router } from "express";
import {
  create,
  getAll,
  getLastTags,
  getOne,
  getPopularPosts,
  remove,
  update,
} from "../controllers/PostController.js";
import checkAuth from "../middleware/checkAuth.js";
import handlerValidationErrors from "../utils/handlerValidationErrors.js";
import { postCreateValidation } from "../validations/validations.js";
const router = new Router();

router.get("/", getAll);
router.get("/popular", getPopularPosts);
router.get("/:id", getOne);
router.get("/tags", getLastTags);
router.delete("/:id", checkAuth, remove);
router.post(
  "/",
  checkAuth,
  postCreateValidation,
  handlerValidationErrors,
  create
);
router.patch(
  "/:id",
  checkAuth,
  postCreateValidation,
  handlerValidationErrors,
  update
);
export default router;
