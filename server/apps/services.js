import { Router } from "express";
import supabase from "../utils/supabase.js";
// import multer from "multer";
// import {protect} from "../middlewares/protects.js";
// import {uploadFile} from "../utils/upload.js";

const serviceRouter = Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });

// const multerUpload = multer({ dest: "uploads/" });
// const servicePhotoUpload = multerUpload.fields([
//   { name: "service_photo", maxCount: 1 },
// ]);

// serviceRouter.use(protect); // protect all user that not login

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
      return res.status(500).json({ error: "Error fetching data from Supabase" });
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




//Uploading 1
// serviceRouter.post('/upload', servicePhotoUpload, async (req, res) => {
//   try {
//     const { path, originalname, mimetype } = req.files['service_photo'][0]; // Access the uploaded file info
//     const file = await supabase.storage
//       .from('service_photo')
//       .upload(path, { cacheControl: 3600, upsert: true });

//     res.json({ message: 'File uploaded successfully', file });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error uploading file' });
//   }
// });

serviceRouter.post("/", async (req, res) => {
  try {
    const { file } = req.body;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File Object", file);

    const fileName = file.originalName || "defaultFileName.ext"; //ถ้ามีไฟล์มีชื่อให้เป็นชื่อไฟล์เดิม แต่ถ้าไม่มีจะถูกเปลี่ยนเป็นdefaultFileName.ext
    const folderName = "service_photo";

    console.log(fileName);

    const { data, error } = await supabase.storage
      .from("home_service")
      .upload(`${folderName}/${fileName}`, file);

    if (error) {
      console.error("Error uploading file");
      return res.status(500).json({ message: "Internal server error !" });
    }

    return res
      .status(200)
      .json({ message: "Service photo uploaded successfully", data });
  } catch (error) {
    console.error("Error on service photo uploading", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Uploading2
// serviceRouter.post("/", servicePhotoUpload, async (req, res) => {
//   try {
//     const uploadFile = req.files.service_photo[0];

//     if (!uploadFile) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const { data, error } = await supabase.storage
//       .from("home_service")
//       .upload(uploadFile.originalname, uploadFile);

//     if (error) {
//       console.error("Error uploading file");
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     return res
//       .status(200)
//       .json({ message: "Service photo uploaded successfully", data });
//   } catch (error) {
//     console.error("Error on service photo uploading", error);
//     return res.status(500).json({ messsage: "Internal server error" });
//   }
// });

export default serviceRouter;
