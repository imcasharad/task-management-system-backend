import express from "express";
import { createGroup, getGroups, updateGroup, deleteGroups } from "../controllers/groupController";

const router = express.Router();

router.post("/groups", createGroup); // POST /api/groups
router.get("/groups", getGroups);    // GET /api/groups
router.put("/groups/:id", updateGroup);       // New: Update a group
router.delete("/groups", deleteGroups);       // New: Delete multiple groups

export default router;