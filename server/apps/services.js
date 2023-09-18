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

// serviceRouter.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const newServiceItem = {
//       service_name: req.body.service_name,
//       category_id: req.body.category_id,
//       service_photo: file.originalname,
//       service_created_date: new Date(),
//       service_edited_date: new Date(),
//     };

//     console.log(newServiceItem);

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

//     const { data: serviceData, error: serviceError } = await supabase
//       .from("service")
//       .insert([newServiceItem])

//     console.log("serviceData:", serviceData);

//     if (serviceError) {
//       console.error("Error inserting data to Supabase", serviceError);
//       return res
//         .status(500)
//         .json({ message: "Error inserting data to Supabase" });
//     }

//     const { data: lastInsertedService } = await supabase
//       .from("service")
//       .select("*")
//       .order("service_id", { ascending: false })
//       .limit(1);

//     const service_id = lastInsertedService[0].service_id;

//     if (!service_id) {
//       console.error("Failed to retrieve service_id from database");
//       return res
//         .status(500)
//         .json({ message: "Failed to retrieve service_id from database" });
//     }

//     const subServiceItem = {
//       service_id: service_id,
//       sub_service_name: req.body.sub_service_name,
//       unit: req.body.unit,
//       price_per_unit: req.body.price_per_unit,
//       sub_service_quantity: req.body.sub_service_quantity,
//     };

//     const { data: insertedSubserviceData, error: subServiceError } =
//       await supabase.from("sub_service").insert([subServiceItem]);

//     console.log(insertedSubserviceData);

//     if (subServiceError) {
//       console.error(
//         "Error inserting sub_service data to Supabase",
//         subServiceError
//       );

//       return res.status(500).json({
//         message: "Error inserting sub_service data to Supabase",
//       });
//     }

//     return res.status(200).send("Service DATA uploaded successfully");
//   } catch (error) {
//     console.error("Error on DATA uploading", error);
//     return res.status(500).json({ message: "Can't upload file to Supabase" });
//   }
// });

serviceRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log(req.body);

    const file = req.file;
    const requestBody = req.body;

    console.log("photo", req.file);

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

    console.log("main service", newServiceItem);

    const items = JSON.parse(requestBody.items);

    console.log(items);

    const subServiceItems = [
      {
        sub_service_name: items.sub_service_name,
        unit: items.unit,
        price_per_unit: items.price_per_unit,
        sub_service_quantity: 1,
      },
    ];

    console.log("sub service data", subServiceItems);

    // Upload file to Supabase storage
    const uploadResult = await supabase.storage
      .from("home_service")
      .upload(`service_photo/${Date.now()}${file.originalname}`, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });

    // Get public URL for the uploaded file
    const servicePhotourl = supabase.storage
      .from("home_service")
      .getPublicUrl(`service_photo/${Date.now()}${file.originalname}`);

    newServiceItem["service_photo"] = servicePhotourl;

    // Insert new service item
    const { data: serviceData, error: serviceError } = await supabase
      .from("service")
      .insert([newServiceItem]);

    if (serviceError) {
      console.error("Error inserting data to Supabase", serviceError);
      return res
        .status(500)
        .json({ message: "Error inserting data to Supabase" });
    }

    const { data: latestService } = await supabase
      .from("service")
      .select("service_id")
      .order("service_id", { ascending: false })
      .limit(1);

    const service_id = latestService[0].service_id;

    for (const subServiceItem of subServiceItems) {
      subServiceItem.service_id = service_id; // Add service_id to each subServiceItem
    }

    if (!service_id) {
      console.error("Failed to retrieve service_id from database");
      return res
        .status(500)
        .json({ message: "Failed to retrieve service_id from database" });
    }

    // Get the ID of the newly inserted service
    // const service_id = serviceData[0].service_id;

    // console.log('id',service_id)

    // if (!service_id) {
    //   console.error("Failed to retrieve service_id from database");
    //   return res
    //     .status(500)
    //     .json({ message: "Failed to retrieve service_id from database" });
    // }

    // // Associate sub-services with the newly created service
    // for (const subServiceItem of subServiceItems) {
    //   subServiceItem.service_id = service_id;
    // }

    // Insert sub-services
    const { data: insertedSubserviceData, error: subServiceError } =
      await supabase.from("sub_service").insert(subServiceItems);

    if (subServiceError) {
      console.error(
        "Error inserting sub_service data to Supabase",
        subServiceError
      );
      return res.status(500).json({
        message: "Error inserting sub_service data to Supabase",
      });
    }

    return res.status(200).send("Service DATA uploaded successfully");
  } catch (error) {
    console.error("Error on DATA uploading", error);
    return res.status(500).json({ message: "Can't upload file to Supabase" });
  }
});

// serviceRouter.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const file = req.file;

//     console.log(req.file)

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const newServiceItem = {
//       service_name: req.body.service_name,
//       category_id: req.body.category_id,
//       service_photo: file.originalname,
//       service_created_date: new Date(),
//       service_edited_date: new Date(),
//     };

//     console.log('new Service Data' ,newServiceItem);

//     // Handle sub-service items
//     const subServiceItems = req.body.items.map(item => ({
//       sub_service_name: item.name,
//       unit: item.unit,
//       price_per_unit: item.cost,
//       sub_service_quantity: 1, // You might need to adjust this depending on your data model
//     }));

//     console.log('new sub service item',subServiceItems)

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

//     const { data: serviceData, error: serviceError } = await supabase
//       .from("service")
//       .insert([newServiceItem]);

//     console.log("serviceData:", serviceData);

//     if (serviceError) {
//       console.error("Error inserting data to Supabase", serviceError);
//       return res
//         .status(500)
//         .json({ message: "Error inserting data to Supabase" });
//     }

//     const { data: lastInsertedService } = await supabase
//       .from("service")
//       .select("*")
//       .order("service_id", { ascending: false })
//       .limit(1);

//     const service_id = lastInsertedService[0].service_id;

//     if (!service_id) {
//       console.error("Failed to retrieve service_id from database");
//       return res
//         .status(500)
//         .json({ message: "Failed to retrieve service_id from database" });
//     }

//     for (const subServiceItem of subServiceItems) {
//       subServiceItem.service_id = service_id;
//     }

//     const { data: insertedSubserviceData, error: subServiceError } =
//       await supabase.from("sub_service").insert(subServiceItems);

//     console.log(insertedSubserviceData);

//     if (subServiceError) {
//       console.error(
//         "Error inserting sub_service data to Supabase",
//         subServiceError
//       );

//       return res.status(500).json({
//         message: "Error inserting sub_service data to Supabase",
//       });
//     }

//     return res.status(200).send("Service DATA uploaded successfully");
//   } catch (error) {
//     console.error("Error on DATA uploading", error);
//     return res.status(500).json({ message: "Can't upload file to Supabase" });
//   }
// });

export default serviceRouter;
