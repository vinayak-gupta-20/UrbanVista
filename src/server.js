import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.routes.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

//config dotenv file
dotenv.config({
    path: './.env'
})

//database config
connectDB();

const app = express();

//middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res)=>{
    res.send("created a mini server");
});

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});