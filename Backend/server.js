import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from './db/connectToMongodb.js';
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
//app.get("/", (req,res)=> {
    //root route https://localhost:5000/
    //res.send("Hello, World!");
//});
app.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`)
});