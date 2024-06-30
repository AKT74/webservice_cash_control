import express from "express";
import supabase from "../config/supabase.js";
import configureMiddleware from "../config/middleware.js";
import { verification } from "../config/verification.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/category", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("Category")
        .select("*")
        .order("id");
  
      if (error) {
        return res.json(error.message);
      }
  
      console.log(data);

      return res.json(data);
    } catch (error) {
      console.log(error.message);
    }
  });
  
  router.get("/get-category/:id", async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      const { data, error } = await supabase
        .from("Category")
        .select("*")
        .eq("id", categoryId);
  
      if (error) {
        return res.json(error.message);
      }
  
      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
  });
  
  router.post("/insert-category", verification, async (req, res) => {
    try {
      const { wallet_name } = req.body;
  
      const { data, error } = await supabase
        .from("Category")
        .insert({ wallet_name: wallet_name })
        .select("*")
        .order("id");
  
      if (error) {
        return res.json(error.message);
      }
  
      console.log(data);

      return res.json({ data, message: "Insert category successfully!" });
    } catch (error) {
      return res.json(error);
    }
  });
  
  router.put("/update-category/:id", verification, async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { wallet_name } = req.body;
  
      const { data, error } = await supabase
        .from("Category")
        .update({ wallet_name: wallet_name })
        .eq("id", categoryId)
        .select("*");
  
      if (error) {
        return res.json(error.message);
      }
  
      return res.json({ data, message: "Update category successfully!" });
    } catch (error) {
      return res.json(error);
    }
  });
  
  router.delete("/delete-category/:id", verification, async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      const { data, error } = await supabase
        .from("Category")
        .delete()
        .eq("id", categoryId)
        .order("id");
  
      if (error) {
        return res.json(error.message);
      }
  
      return res.json({ data, message: "Delete category successfully" });
    } catch (error) {
      return res.json(error);
    }
  });
  

export default router;