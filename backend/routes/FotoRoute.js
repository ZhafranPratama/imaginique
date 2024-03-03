import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { deleteFoto, editFoto, getImage, getImagebyId, getImagebyUserId, getImagebyAlbumId, postFoto } from "../controllers/FotoController.js";

const router = express.Router();

router.get("/image", getImage);
router.get("/image/:fotoId",getImagebyId);
router.get("/userimage/:userId", getImagebyUserId);
router.get("/albumimage/:albumId", getImagebyAlbumId);
router.post("/image", postFoto);
router.patch("/image/:fotoId", editFoto);
router.delete("/image/:fotoId", deleteFoto);

export default router;