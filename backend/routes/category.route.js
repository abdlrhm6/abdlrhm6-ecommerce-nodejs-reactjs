import {Router} from "express";
import {deleteCategory, getAllCategories, saveCategory, updateCategory} from "../controllers/category.controller.js";
import { adminGuard } from "../middlewares/verifyToken.js";

const router = Router()
router.post("/category", adminGuard,saveCategory)
router.get("/category", adminGuard,getAllCategories)
router.delete("/category/:id", adminGuard,deleteCategory)
router.patch("/category/:id", adminGuard,updateCategory)

export default router