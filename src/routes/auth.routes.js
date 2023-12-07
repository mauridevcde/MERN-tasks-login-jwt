import { Router } from "express";
import { login, logout, profile, register, verifyToken } from "../controllers/auth.controller.js";
import { AuthRequired } from "../middlewares/validateToken.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
const router = Router();

router.post("/register", validateSchema(registerSchema) , register);
router.post("/login", validateSchema(loginSchema) , login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", AuthRequired, profile);

export default router;
