import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { createAlbum, deleteAlbum, editAlbum, getAlbum, getAlbumbyId, getAlbumbyUserId } from "../controllers/AlbumController.js";

const router = express.Router();

router.get("/useralbum/:userId", getAlbumbyUserId);
router.get("/album/:albumId", getAlbumbyId);
router.post("/album", createAlbum);
router.patch("/album/:albumId", editAlbum);
router.delete("/album/:albumId", deleteAlbum);

export default router;