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

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newServiceItem = {
      service_name: req.body.service_name,
      category_id: req.body.category_id,
      service_photo: file.originalname,
      service_created_date: new Date(),
      service_edited_date: new Date(),
    };

    console.log(newServiceItem);

    const uploadResult = await supabase.storage
      .from("home_service")
      .upload(`service_photo/${Date.now()}${file.originalname}`, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });

    const servicePhotourl = supabase.storage
      .from("home_service")
      .getPublicUrl(`service_photo/${Date.now()}${file.originalname}`);

    newServiceItem["service_photo"] = servicePhotourl;

    console.log(newServiceItem["service_photo"]);
    console.log({ uploadResult: uploadResult });

    const { data: serviceData, error: serviceError } = await supabase
      .from("service")
      .insert([newServiceItem]);

    if (serviceError) {
      console.error("Error inserting data to Supabase", serviceError);
      return res
        .status(500)
        .json({ message: "Error inserting data to Supabase" });
    }

    const subServiceItem = {
      service_id: req.body.service_id,
      sub_service_name: req.body.sub_service_name,
      unit: req.body.unit,
      price_per_unit: req.body.price_per_unit,
      sub_service_quantity: req.body.sub_service_quantity,
    }

    const { data: insertedSubserviceData, error: subServiceError } = await supabase
      .from('sub_service')
      .insert([subServiceItem]);

      console.log(insertedSubserviceData)

    if (subServiceError) {
      console.error(
        "Error inserting sub_service data to Supabase",
        subServiceError
      );

      return res
        .status(500)
        .json({
          message: "Error inserting sub_service data to Supabase",
        });
    }

    return res.status(200).send("Service DATA uploaded successfully");
  } catch (error) {
    console.error("Error on service photo uploading", error);
    return res.status(500).json({ message: "Can't upload file to Supabase" });
  }
});




export default serviceRouter;
