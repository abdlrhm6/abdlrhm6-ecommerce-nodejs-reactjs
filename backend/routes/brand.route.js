import {Router} from "express";
import {deleteBrand, getAllBrands, saveBrand, updateBrand} from "../controllers/brand.controller.js";

const router = Router()
router.post("/brand", saveBrand)
router.get("/brand", getAllBrands)
router.delete("/brand/:id", deleteBrand)
router.patch("/brand/:id", updateBrand)

export default router