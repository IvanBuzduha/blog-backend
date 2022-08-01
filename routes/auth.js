import { Router } from "express";
import { getMe, login, register } from "../controllers/UserController.js";
import checkAuth from "../middleware/checkAuth.js";
import handlerValidationErrors from "../utils/handlerValidationErrors.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/validations.js";
const router = new Router();

router.post("/login", loginValidation, handlerValidationErrors, login);
router.post("/register", registerValidation, handlerValidationErrors, register);
router.get("/me", checkAuth, getMe);

export default router;
