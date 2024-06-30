import express from "express";
import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configureMiddleware from "../config/middleware.js";
import dotenv from "dotenv";
dotenv.config()

const app = express();
configureMiddleware(app);
const router = express.Router();

router.post("/registration", async (req, res) => {
    try {
      const { user_name, email, password } = req.body;
  
      const saltRound = 10;
      const hash = await bcrypt.hash(password, saltRound);
  
      const { data, error } = await supabase
        .from("User")
        .insert({ user_name: user_name, email: email, password: hash })
        .select("*");
  
      if (error) {
        return res.json(error.message);
      }
  
      return res.json({ success: true,  data, message: "User created successfully" });
    } catch (error) {
      return res.json(error);
    }
  });

router.post("/login", async (req, res) => {
    const { usernameEmail, password } = req.body;
  
    try {
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .or(`user_name.eq.${usernameEmail}, email.eq.${usernameEmail}`);
  
      if (error) {
        return res.json({ error: error.message });
      }
  
      if (data.length > 0) {
        bcrypt.compare(password, data[0].password, (error, response) => {
          if (error) {
            return res.json({ error: error.message });
          }
  
          if (response) {
            const user = data[0];
            const getToken =
              process.env.JWT_TOKEN;
            const token = jwt.sign(
              { id: user.id },
              getToken,
              { expiresIn: "24h" }
            );
  
            return res.json({
              message: `Welcome, ${user.user_name}`,
              token: token,
              dataUser: user,
            });
          } else {
            return res.json({
              message: "Wrong username/email or password combination!",
            });
          }
        });
      } else {
        return res.json({ message: "User doesn't exist" });
      }
    } catch (error) {
      return res.json({ error: error.message });
    }
  });

  export default router;