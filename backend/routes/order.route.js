import { Router } from "express";

import { getCustomerOrder, getAdminOrders, shipOrder } from "../controllers/order.controller.js";
import { adminGuard, verify } from "../middlewares/verifyToken.js";

const router = Router()

router.get("/order", verify, getCustomerOrder)
router.get("/order/admin", adminGuard, getAdminOrders)
router.post("/order/admin/ship/:id", adminGuard,shipOrder)

export default router