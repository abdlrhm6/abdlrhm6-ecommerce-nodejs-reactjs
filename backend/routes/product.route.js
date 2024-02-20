import { Router } from "express";
import { dashBoardProducts, deleteProduct, fetchByCategory, getAllProducts, getProductById, saveProduct, updateProduct, checkout } from "../controllers/product.controller.js";
import multer from "multer";
import path from "node:path";
import { adminGuard, verify } from "../middlewares/verifyToken.js";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })
const router = Router()
router.post("/product", adminGuard, saveProduct)
router.get("/product", getAllProducts)
router.get("/product/category", fetchByCategory)
router.get("/product/dashboard", adminGuard, dashBoardProducts)
router.get("/product/:id", getProductById)
router.post("/create-checkout-session", checkout)
router.delete("/product/:id", adminGuard, deleteProduct)
router.patch("/product/:id", adminGuard, updateProduct)
router.post("/product/upload", adminGuard, upload.single("image"), (req, res) => {
    const { filename } = req.file
    res.json({ image: filename })
})





export default router