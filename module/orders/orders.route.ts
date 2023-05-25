import express from "express";
import { getAllOrders } from "./orders.controller";

const router = express.Router();

router.get("/", getAllOrders);

export default router;
