import { Router } from "express";
import { addReview } from "../controllers/review.controller.js";
import { verify } from "../middlewares/verifyToken.js";

const router = Router()
router.post("/review" ,verify,addReview)

export default router