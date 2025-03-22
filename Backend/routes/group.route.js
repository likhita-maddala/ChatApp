import express from "express";
import { createGroupChat, getMessageInGroup, sendMessageInGroup, getGroupsForSidebar } from "../controllers/group.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/createGroup", protectRoute, createGroupChat);
router.post("/sendInGroup/:id", protectRoute, sendMessageInGroup);
router.get("/:id", protectRoute, getMessageInGroup);
router.get("/", protectRoute, getGroupsForSidebar);

export default router;
