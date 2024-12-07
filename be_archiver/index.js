import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ArchiverRoute from "./routes/ArchiverRoute.js";
import DivisionRoute from "./routes/DivisionRoute.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import dotenv from 'dotenv';
dotenv.config();  

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(ArchiverRoute);
app.use(DivisionRoute);
app.use(AuthRoutes);


app.listen(5001, ()=> console.log('server up and running'));