import express from "express";
import {
  createSingleUser,
  deleteSingleUser,
  getAllAdmin,
  getAllUsers,
  getSingleUser,
  isUserAdmin,
  updateSingleUser,
  upgradeUserToAdmin,
} from "./users.controller";

const router = express.Router();
router.get("/", getAllUsers);
router.post("/", createSingleUser);
router.get("/:id", getSingleUser);
router.put("/:id", updateSingleUser);
router.delete("/:id", deleteSingleUser);
router.get("/admins", getAllAdmin);
router.get("/admins/:email", isUserAdmin);
router.post("/admins/:id", upgradeUserToAdmin);
export default router;
