import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getUser, Login, Register, Logout, updateUser, deleteUser } from "../controllers/UserController.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/user/:userId", getUser);
router.post("/login", Login);
router.post("/register", Register);
router.delete("/logout", Logout);
router.patch("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);
router.get("/token", refreshToken)

export default router;
