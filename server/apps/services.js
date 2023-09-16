import { Router } from "express";
import supabase from "../utils/supabase.js";
import multer from "multer";


// import {protect} from "../middlewares/protects.js";
// import { uploadFile } from "../utils/upload.js";

// npm install form-data

const serviceRouter = Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API route to service listing page
serviceRouter.get("/", async (req, res) => {
  try {
    const data = await supabase.from("service").select("*");
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
    const {
      service_name,
      category_name,
      sub_service,
      service_created_date,
      service_edited_date
    } = req.body;

    console.log(req.body)
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File Object", req.file);

    // const fileBlob = new Blob([req.file.buffer]);

    // form.append('file', fileBlob, {
    //   filename: `${Date.now()}${file.originalname}`,
    //   contentType: file.mimetype,
    // });
    // form.append('service_name', service_name);
    // form.append('category_name', category_name);
    // form.append('sub_service', sub_service);
    // form.append('service_created_date', service_created_date);
    // form.append('service_edited_date', service_edited_date);

    // const uploadResult = await supabase.storage
    //   .from("home_service")
    //   .upload(`service_photo/${Date.now()}${file.originalname}`, form, {
    //     cacheControl: "3600",
    //     upsert: false,
    //   });

    // const uploadResult = await supabase.storage
    // .from("home_service")
    // .upload(`service_photo/${Date.now()}${file.originalname}`, form, {
    //   cacheControl: "3600",
    //   upsert: false,
    // });

    const uploadResult = await supabase.storage
      .from("home_service")
      .upload(`service_photo/${Date.now()}${file.originalname}`, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });

    // const insertResult = await supabase
    // .from('service')
    // .insert([
    //   {
    //     service_name,
    //     category_name,
    //     sub_service,
    //     service_created_date,
    //     service_edited_date
    //   },
    // ]);

    // const insertResult = await supabase
    //   .from('service')
    //   .insert([
    //     {
    //       service_name,
    //       category_name,
    //       sub_service,
    //       service_created_date,
    //       service_edited_date
    //     },
    //   ]);
    return res.status(200).send("Service photo uploaded successfully");
  } catch (error) {
    console.error("Error on service photo uploading", error);
    return res.status(500).json({ message: "can't upload file to supabase" });
  }
});

export default serviceRouter;
