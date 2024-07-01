import express from "express";
import supabase from "../config/supabase.js";
import configureMiddleware from "../config/middleware.js";
import { verification } from "../config/verification.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/wallet", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("Wallet")
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
  
  router.get("/get-wallet-user/:id", async (req, res) => {
    try {
      const userId = req.params.id;
  
      const { data, error } = await supabase
        .from("Wallet")
        .select("*")
        .eq("user_id", userId);
  
      if (error) {
        return res.json(error.message);
      }
  
      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
  });

  router.get("/get-wallet/:id", async (req, res) => {
    try {
      const walletId = req.params.id;
  
      const { data, error } = await supabase
        .from("Wallet")
        .select("*")
        .eq("id", walletId);
  
      if (error) {
        return res.json(error.message);
      }
  
      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
  });
  
  router.post("/insert-wallet", verification, async (req, res) => {
    try {
      const { wallet_id, amount, contact, user_id } = req.body;
  
      const { data, error } = await supabase
        .from("Wallet")
        .insert({ wallet_id: wallet_id, amount: amount, contact: contact, user_id: user_id})
        .select("*")
        .order("id");
  
      if (error) {
        return res.json(error.message);
      }
  
      console.log(data);

      return res.json({ data, message: "Insert Wallet successfully!" });
    } catch (error) {
      return res.json(error);
    }
  });
  
  router.put("/update-wallet/:id", verification, async (req, res) => {
    try {
      const walletId = req.params.id;
      const { wallet_id, amount, contact } = req.body;
  
      const { data, error } = await supabase
        .from("Wallet")
        .update({ wallet_id: wallet_id, amount: amount, contact: contact})
        .eq("id", walletId)
        .select("*");
  
      if (error) {
        return res.json(error.message);
      }
  
      return res.json({ data, message: "Update wallet successfully!" });
    } catch (error) {
      return res.json(error);
    }
  });
  
  router.delete("/delete-wallet/:id", verification, async (req, res) => {
    try {
      const walletId = req.params.id;
  
      const { data, error } = await supabase
        .from("Wallet")
        .delete()
        .eq("id", walletId)
        .order("id");
  
      if (error) {
        return res.json(error.message);
      }
  
      return res.json({ data, message: "Delete wallet successfully" });
    } catch (error) {
      return res.json(error);
    }
  });
  

export default router;