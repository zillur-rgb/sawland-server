import express from "express";
import { getAllPayments } from "./payments.controller";

const router = express.Router();

router.get("/", getAllPayments);
export default router;
