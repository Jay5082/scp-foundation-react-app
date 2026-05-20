import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.send("SCP Foundation API Running");
});

app.get("/items", async (req, res) => {
  const { data, error } = await supabase
    .from("scp_subjects")
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/items", async (req, res) => {
  const { item, class: scpClass, description, containment } = req.body;

  const { data, error } = await supabase
    .from("scp_subjects")
    .insert([
      {
        item,
        class: scpClass,
        description,
        containment
      }
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});