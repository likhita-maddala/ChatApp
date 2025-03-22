import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js"; // Ensure the path and file name are correct
import { createGroupChat } from "../controllers/group.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/createGroup", createGroupChat);
export default router;
