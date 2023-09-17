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

    const newServiceItem = {
      service_name: req.body.service_name,
      category_id: req.body.category_id,
      service_photo: file.originalname,
      sub_service: req.body.sub_service,
      service_created_date: new Date(),
      service_edited_date: new Date(),
    };

    console.log(newServiceItem);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

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
      return res.status(500).json({ message: "Error inserting data to Supabase" });
    }

    if (serviceData && serviceData.length > 0) {
      const service_id = serviceData[0].service_id;

      if (newServiceItem.sub_service) {
        for (let r = 0; r <= newServiceItem.sub_service.length - 1; r++) {
          const subServiceItem = {
            service_id: service_id,
            sub_service_name: newServiceItem.sub_service[r].sub_service_name,
            unit: newServiceItem.sub_service[r].unit,
            price_per_unit: newServiceItem.sub_service[r].price_per_unit,
            sub_service_quantity: 0,
          };
      
          const { data: insertedSubService, error: subServiceError } = await supabase
            .from('sub_service')
            .insert([subServiceItem]);

          if (subServiceError) {
            console.error("Error inserting sub_service data to Supabase", subServiceError);
            return res.status(500).json({ message: "Error inserting sub_service data to Supabase" });
          }
        }
      }
    }
    console.log( {data: insertedSubService})

    return res.status(200).send("Service DATA uploaded successfully");
  } catch (error) {
    console.error("Error on service photo uploading", error);
    return res.status(500).json({ message: "Can't upload file to Supabase" });
  }
});


// serviceRouter.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const file = req.file;

//     const newServiceItem = {
//       service_name: req.body.service_name,
//       category_id: req.body.category_id,
//       // category_name: req.body.category_name,
//       service_photo: file.originalname,
//       // sub_service: JSON.parse(req.body.sub_service),
//       service_created_date: new Date(),
//       service_edited_date: new Date(),
//     };

//     console.log(newServiceItem);

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Use 'newServiceItem' as needed in your code...
//     // filter category in different table to insert first ******
//     const uploadResult = await supabase.storage
//       .from("home_service")
//       .upload(`service_photo/${Date.now()}${file.originalname}`, file.buffer, {
//         cacheControl: "3600",
//         upsert: false,
//         contentType: file.mimetype,
//       });

//     const servicePhotourl = supabase.storage
//       .from("home_service")
//       .getPublicUrl(`service_photo/${Date.now()}${file.originalname}`);

//     newServiceItem["service_photo"] = servicePhotourl;

//     console.log(newServiceItem["service_photo"]);
//     console.log({ uploadResult: uploadResult });

//     // const { data: categoryData, error: categoryError } = await supabase
//     //   .from("category")
//     //   .select("category_id")
//     //   .eq("category_name", newServiceItem.category_name)
//     //   .single();

//     //   console.log("categoryData", categoryData);

//     //   if (categoryError || !categoryData) {
//     //     return res.status(500).json({ message: "Error fetching category" });
//     //   }

//     // newServiceItem["category_name"] = categoryData.category_id;

//     // console.log( newServiceItem["category_name"])

      
//     // newServiceItem["category_name"] = categoryData

//     const { data: serviceData, error: serviceError } = await supabase
//       .from("service")
     
//       .insert([
//        newServiceItem
//       ]);

//       if (serviceError) {
//         console.error("Error inserting data to Supabase", serviceError);
//         return res
//           .status(500)
//           .json({ message: "Error inserting data to Supabase" });
//       }
      
//       console.log("data before insert", serviceData);

    
   

//     if (error) {
//       return res
//         .status(500)
//         .json({ message: "Error inserting data to Supabase" });
//     }
//     return res.status(200).send("Service DATA uploaded successfully");
//   } catch (error) {
//     console.error("Error on service photo uploading", error);
//     return res.status(500).json({ message: "Can't upload file to Supabase" });
//   }
// });

export default serviceRouter;
