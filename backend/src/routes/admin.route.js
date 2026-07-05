import { Router } from "express";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

//For clean code and optimized --- insted of writing it in every get/post/delete we use router.use
router.use(protectRoute, requireAdmin);

//checking if user is admin
router.get("/check", checkAdmin);

//for creating song
router.post("/songs", createSong);

//for deleting song
router.delete("/songs/:id", deleteSong);

//for creating album
router.post("/albums", createAlbum);

//for deleting album
router.delete("/albums/:id", deleteAlbum);

export default router;
