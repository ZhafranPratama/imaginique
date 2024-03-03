import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { deleteLike, addLike, getLikeDetail, getLikebyPostId, getLikebyUserId } from "../controllers/LikeController.js";

const router = express.Router();

router.get("/postlike/:fotoId", getLikebyPostId);
router.get("/userlike/:userId", getLikebyUserId);
router.get("/likedetail/:userId/:postId", getLikeDetail);
router.post("/postlike", addLike);
router.delete("/like/:userId/:postId", deleteLike)

export default router;