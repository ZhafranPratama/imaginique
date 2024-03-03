import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { addKomentar, getKomentarbyPostId } from "../controllers/KomentarController.js";

const router = express.Router();

router.get("/komentar/:fotoId", getKomentarbyPostId);
router.post("/komentar", addKomentar);

export default router;