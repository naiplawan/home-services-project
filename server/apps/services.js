import { Router } from "express";
import supabase from "../utils/supabase.js";
import multer from "multer";
import {protect} from "../middlewares/protects.js";
import {uploadFile} from "../utils/upload.js";

const serviceRouter = Router();

const multerUpload = multer({ dest: "uploads/"})
const servicePhotoUpload = multerUpload.fields([
    {name: "service_photo", maxCount:1}
]  
)

// serviceRouter.use(protect); // protect all user that not login 

// API route to service listing page
serviceRouter.get("/", async (req, res) => {
  const keywords = req.query.keywords || "";
  const categoryFilter = req.query.categoryFilter || "";
  const maxPriceFilter = req.query.maxPriceFilter || Number.MAX_SAFE_INTEGER;
  const minPriceFilter = req.query.minPriceFilter || 0;
  const orderFilter = req.query.orderFilter || "";

  let queryData = supabase
    .from('service')
    .select(
      `
      service.service_id,
      category.category_name,
      service.category_id,
      service.service_name,
      service.service_photo,
      min(sub_service.price_per_unit) as min_price,
      max(sub_service.price_per_unit) as max_price,
      service.service_created_date,
      service.service_edited_date
      `
    );

  if (keywords) {
    queryData = queryData
      .filter('service_name', 'ilike', `%${keywords}%`);
  }

  if (categoryFilter) {
    queryData = queryData
      .filter('category_name', 'eq', categoryFilter);
  }

  if (maxPriceFilter) {
    queryData = queryData
      .filter('price_per_unit', 'lte', maxPriceFilter);
  }

  if (minPriceFilter) {
    queryData = queryData
      .filter('price_per_unit', 'gte', minPriceFilter);
  }

  if (orderFilter === 'asc') {
    queryData = queryData
      .order('service_name', { ascending: true });
  } else if (orderFilter === 'desc') {
    queryData = queryData
      .order('service_name', { ascending: false });
  }
 console.log(queryData)
  const { data, error } = await queryData;

  if (error) {
    return res.status(500).json({ error: 'Error fetching data from Supabase' });
  }

  return res.status(200).json({ data });
});

  
//Add Service Post for Uploading 
serviceRouter.post("/", servicePhotoUpload, async (req, res) => {
    try {
      const uploadFile = req.files.service_photo[0];
  
      if (!uploadFile) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { data, error } = await supabase.storage
        .from("home_service")
        .upload(uploadFile.originalname, uploadFile);
  
      if (error) {
        console.error("Error uploading file");
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(200).json({ message: "Service photo uploaded successfully", data})
    } catch (error) {
        console.error("Error on service photo uploading", error)
        return res.status(500).json({messsage: "Internal server error"} )
      }})

export default serviceRouter;