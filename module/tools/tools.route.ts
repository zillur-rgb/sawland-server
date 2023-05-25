import express from "express";
import {
  addATool,
  deleteSingleTool,
  getAllTools,
  getSingleTool,
  updateSingleTool,
} from "./tools.controller";
const router = express.Router();

router.get("/", getAllTools);
router.get("/:id", getSingleTool);
router.delete("/:id", deleteSingleTool);
router.put("/:id", updateSingleTool);
router.post("/", addATool);

export default router;
