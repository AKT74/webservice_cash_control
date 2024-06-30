import express from "express";
import configureMiddleware from "./config/middleware.js";
import categoryRouter from "./controller/category.js";
import authRouter from "./controller/auth.js";
import walletRouter from "./controller/wallet.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
configureMiddleware(app);
app.use(categoryRouter);  
app.use(authRouter);
app.use(walletRouter)

const port = process.env.APP_PORT || 5123;
app.listen(port, () => {
  console.log(`running server on port ${port}`);
});