import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"; // Corrected path
import messageRoutes from "./routes/message.routes.js"; // Ensure the path and file name are correct
import userRoutes from "./routes/user.routes.js"; // Ensure the path and file name are correct

import connectToMongoDB from "./db/connectToMongoDB.js"; // Ensure the path and file name are correct
import { app, server } from "./socket/socket.js"; // Ensure the path and file name are correct

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
