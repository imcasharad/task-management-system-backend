import express from "express";
import { createGroup, getGroups, updateGroup, deleteGroups } from "../controllers/groupController";

const router = express.Router();

router.post("/", createGroup); // POST /api/groups
router.get("/", getGroups);    // GET /api/groups
router.put("/:id", updateGroup);       // New: Update a group
router.delete("/", deleteGroups);       // New: Delete multiple groups

export default router;