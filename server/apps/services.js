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
serviceRouter.get('/', async (req, res) => {
  try {
    const keywords = req.query.keywords;
    const categoryFilter = req.query.categoryFilter;
    const maxPriceFilter = req.query.maxPriceFilter;
    const minPriceFilter = req.query.minPriceFilter;
    const orderFilter = req.query.orderFilter;

    // Create the initial queryData with select statement for the service table
    let queryData = supabase
      .from('service')
      .select(`
        service_id,
        category_id,
        service_name,
        service_photo,
        service_created_date,
        service_edited_date
      `);

    if (keywords) {
      queryData = queryData.filter('service_name', 'ilike', `%${keywords}%`);
    }

    if (categoryFilter) {
      queryData = queryData.filter('category_id', 'eq', categoryFilter);
    }

    if (maxPriceFilter) {
      queryData = queryData.filter('max_price', 'lte', parseFloat(maxPriceFilter));
    }

    if (minPriceFilter) {
      queryData = queryData.filter('min_price', 'gte', parseFloat(minPriceFilter));
    }

    if (orderFilter === 'asc') {
      queryData = queryData.order('service_name', { ascending: true });
    } else if (orderFilter === 'desc') {
      queryData = queryData.order('service_name', { ascending: false });
    }

    // Execute the query for the service table
    const { data: serviceData, error: serviceError } = await queryData;
    if (serviceError) {
      console.error('Supabase error:', serviceError.message);
      return res.status(500).json({ error: 'Error fetching data from Supabase', supabaseError: serviceError.message });
    }

    // Create a subquery for fetching category information
    const categoryQuery = supabase
      .from('category')
      .select('category_id', 'category_name');

    // Execute the subquery for category information
    const { data: categoryData, error: categoryError } = await categoryQuery;
    if (categoryError) {
      console.error('Supabase error:', categoryError.message);
      return res.status(500).json({ error: 'Error fetching category data from Supabase', supabaseError: categoryError.message });
    }

    // Combine serviceData and categoryData based on category_id
    const combinedData = serviceData.map((service) => {
      const category = categoryData.find((cat) => cat.category_id === service.category_id);
      return {
        ...service,
        category_name: category ? category.category_name : null,
      };
    });

    // Log the data
    console.log('Retrieved data:', combinedData);

    return res.status(200).json({ data: combinedData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
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

    console.log('File Object', file)

    const fileName = file.originalName || 'defaultFileName.ext'; //ถ้ามีไฟล์มีชื่อให้เป็นชื่อไฟล์เดิม แต่ถ้าไม่มีจะถูกเปลี่ยนเป็นdefaultFileName.ext
    const folderName = 'service_photo';

    console.log(fileName)

    const { data, error } = await supabase.storage
      .from('home_service')
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
