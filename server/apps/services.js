import { Router } from "express";
import supabase from "../utils/supabase.js";
import multer from "multer";

// import {protect} from "../middlewares/protects.js";
// import { uploadFile } from "../utils/upload.js";

const serviceRouter = Router();

const upload = multer({ dest: "uploads/"})
const uploadRouter = Router()

// API route to service listing page
serviceRouter.get("/", async (req, res) => {
  const keywords = req.query.keywords || "";
  const categoryFilter = req.query.categoryFilter || "";
  const maxPriceFilter = req.query.maxPriceFilter || Number.MAX_SAFE_INTEGER;
  const minPriceFilter = req.query.minPriceFilter || 0;
  const orderFilter = req.query.orderFilter || "";

  try {
    const data = await supabase.from("service").select("*, sub_service(*), category(*)");
    return res.json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

//API route to one service item page
serviceRouter.get("/:id", async (req, res) => {
  const serviceId = req.params.id;

  try {
    const { data, error } = await supabase
      .from("service")
      .select("*")
      .eq("service_id", serviceId);

    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error fetching data from Supabase" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    return res.status(200).json({ data: data[0] }); // Return the first (and only) result
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

serviceRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    console.log(req.file);
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File Object", req.file);
    console.log("File Object", req.file);

    const uploadResult = await supabase.storage
      .from("home_service")
      .upload(`service_photo/${file.originalname}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log({ uploadResult: uploadResult });
    return res.status(200).send("Service photo uploaded successfully");
  } catch (error) {
    console.error("Error on service photo uploading", error);
    return res.status(500).json({ message: "can't upload file to supabase" });
  }
});

//API ROUTE to delete exisitng service item
serviceRouter.delete("/:id", async (req, res) => {

  try {
    const serviceId = req.params.id;

    const { data, error } = await supabase
      .from("service")
      .delete()
      .eq("service_id", serviceId);

    if (error) {
      return res.status(500).json({ error: "ไม่สามารถลบได้" });
    }

    if (data && data.length === 0) {
      return res
        .status(404)
        .json({ error: `ไม่พบรายการที่ตรงกับ ${serviceId}` });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "ไม่สามารถลบได้" });
  }
});

export default serviceRouter;
