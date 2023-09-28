import { Router } from "express";
import supabase from "../utils/supabase.js";
import multer from "multer";

const serviceRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API route to service listing page
serviceRouter.get("/", async (req, res) => {
  const keywords = req.query.keywords || "";
  const categoryFilter = req.query.categoryFilter || "";
  const maxPriceFilter =
    parseFloat(req.query.maxPriceFilter) || Number.MAX_SAFE_INTEGER;
  const minPriceFilter = parseFloat(req.query.minPriceFilter) || 0;
  const orderFilter = req.query.orderFilter || "";

  try {
    const data = await supabase
      .from("service")
      .select("*, sub_service(*), category(*)");

    //note: ถ้าใส่ function filter อาจจะทำให้หน้าอื่นที่ใช้ API ตัวนี้เกิดปัญหาได้ ต้องเช็คหน้าอื่นที่ใช้ API ตัวเดียวกันระหว่างเทส

    // .ilike("service_name, category_name", `%${keywords}%`);

    //กรองตามช่วงราคา;
    // const data = rawData.filter((item) => {
    //   const price_per_unit =
    //     parseFloat(item.sub_service[0]?.price_per_unit) || 0;
    //   return (
    //     price_per_unit >= minPriceFilter && price_per_unit <= maxPriceFilter
    //   );
    // });

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
      .select("*, sub_service(*), category(*)")
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
    console.log(req.body);

    const file = req.file;
    const requestBody = req.body;

    console.log("photo", req.file);
    const user_id = req.body.user_id;

    console.log("photo", req.file);

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newServiceItem = {
      user_id: user_id,
      service_name: req.body.service_name,
      category_id: req.body.category_id,
      service_photo: file.originalname,
      service_created_date: new Date(),
      service_edited_date: new Date(),
    };

    // item: req.body.json

    console.log("main service", newServiceItem);

    const subServiceItems = Array.isArray(req.body.items)
      ? req.body.items.map((item) => JSON.parse(item))
      : [JSON.parse(req.body.items)];

    console.log("sub service data", subServiceItems);

    // Upload file to Supabase storage
    const uploadResult = await supabase.storage
      .from("home_service")
      .upload(`service_photo/${Date.now()}${file.originalname}`, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });
    console.log("uploadresult", uploadResult);

    if (!uploadResult.error) {
      // Get public URL for the uploaded file
      const servicePhotourl = `https://tqjclbmprqjrgdrvylqd.supabase.co/storage/v1/object/public/home_service/${uploadResult.data.path}`;
      console.log(uploadResult.data.path);

      // Assign the URL directly to service_photo
      newServiceItem["service_photo"] = servicePhotourl;
    } else {
      console.error(
        "Error uploading file to Supabase storage",
        uploadResult.error
      );
      return res
        .status(500)
        .json({ message: "Error uploading file to Supabase storage" });
    }

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

// serviceRouter.put("/:id", async (req, res) => {
//   try {
//     const serviceId = req.params.id;
//     const file = req.file;

//     // if (!file) {
//     //   return res.status(400).json({ message: "No file uploaded" });
//     // }

//     const updatedServiceItem = {
//       service_name: req.body.service_name,
//       category_id: req.body.category_id,
//       // service_photo: req.file,
//       service_edited_date: new Date(),
//     };

//     const items = JSON.parse(req.body.items);

//     const updatedSubServiceItems = {
//       sub_service_name: items.sub_service_name,
//       unit: items.unit,
//       price_per_unit: items.price_per_unit,
//     };

//     if (file) {
//       const updateResult = await supabase.storage
//         .from("home_service")
//         .update(
//           `service_photo/${Date.now()}${file.originalname}`,
//           file.buffer,
//           {
//             cacheControl: "3600",
//             upsert: false,
//             contentType: file.mimetype,
//           }
//         );

//       const servicePhotoUrl = supabase.storage
//         .from("home_service")
//         .getPublicUrl(`service_photo/${Date.now()}${file.originalname}`);

//       updatedServiceItem["service_photo"] = servicePhotoUrl;
//     }

//     console.log(updatedServiceItem);

//     const { data: updatedServiceData, error: updatedServiceError } =
//       await supabase
//         .from("service")
//         .update(updatedServiceItem)
//         .eq("service_id", serviceId);

//     if (updatedServiceError) {
//       console.error("Error updating service data", updatedServiceError);
//       return res
//         .status(500)
//         .json({ message: "Error updating data in supabase" });
//     }

//     const { data: latestService } = await supabase
//       .from("service")
//       .select("service_id")
//       .order("service_id", { ascending: false })
//       .limit(1);

//     const service_id = latestService[0].service_id;

//     for (const subServiceItem of updatedSubServiceItems) {
//       subServiceItem.service_id = service_id; // Add service_id to each subServiceItem
//     }

//     if (!service_id) {
//       console.error("Failed to retrieve service_id from database");
//       return res
//         .status(500)
//         .json({ message: "Failed to retrieve service_id from database" });
//     }

//     // แก้ไขรายการบริการย่อย (sub_service)
//     const { data: updatedSubServiceData, error: updatedSubServiceError } =
//       await supabase
//         .from("sub_service")
//         .update(updatedSubServiceItems)
//         .eq("service_id", serviceId);

//     if (serviceError || subServiceError) {
//       console.error(
//         "เกิดข้อผิดพลาดในการอัพเดทข้อมูล:",
//         serviceError || subServiceError
//       );
//       res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัพเดทข้อมูล" });
//     } else {
//       res.status(200).json({ message: "อัพเดทข้อมูลเรียบร้อย" });
//     }

//     return res.status(200).send("Service DATA updated successfully");
//   } catch (error) {
//     res.status(500).json({
//       message: "Can't update service data in supabase",
//     });
//   }
// });

// serviceRouter.put("/:id", upload.single("file"), async (req, res) => {
//   try {
//     const serviceId = req.params.id;
//     const user_id = req.body.user_id;
//     const file = req.file;

//     console.log(req.body);

//     const updatedServiceItem = {
//       user_id: user_id,
//       service_photo: file,
//       service_edited_date: new Date(),
//     };

//     if (file) {
//       updatedServiceItem["service_photo"] = file.originalname;
//     }

//     const optionalFields = [
//       "service_name",
//       "category_id",
//       "service_created_date",
//     ];
//     optionalFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         updatedServiceItem[field] = req.body[field];
//       }
//     });

//     let updatedSubServiceItems;
//     try {
//       updatedSubServiceItems = JSON.parse(req.body.items);

//       if (!Array.isArray(updatedSubServiceItems)) {
//         updatedSubServiceItems = [updatedSubServiceItems];
//       }

//       // Remove sub_service_id from each item
//       updatedSubServiceItems = updatedSubServiceItems.map((item) => {
//         const { sub_service_id, ...rest } = item;
//         return { ...rest, sub_service_quantity: 1 };
//       });

//       // Continue with your code for inserting/updating sub_service
//     } catch (error) {
//       console.error("Error parsing subServiceItems:", error);
//       return res
//         .status(400)
//         .json({ message: "Invalid format for subServiceItems" });
//     }
//     if (file) {
//       // Upload file to Supabase storage
//       const uploadResult = await supabase.storage
//         .from("home_service")
//         .upload(
//           `service_photo/${Date.now()}${file.originalname}`,
//           file.buffer,
//           {
//             cacheControl: "3600",
//             upsert: false,
//             contentType: file.mimetype,
//           }
//         );
//       console.log("uploadresult", uploadResult);

//       if (!uploadResult.error) {
//         // Get public URL for the uploaded file
//         const servicePhotourl = `https://tqjclbmprqjrgdrvylqd.supabase.co/storage/v1/object/public/home_service/${uploadResult.data.path}`;
//         console.log(uploadResult.data.path);

//         // Assign the URL directly to service_photo
//         updatedServiceItem["service_photo"] = servicePhotourl;
//       } else {
//         console.error(
//           "Error uploading file to Supabase storage",
//           uploadResult.error
//         );
//         return res
//           .status(500)
//           .json({ message: "Error uploading file to Supabase storage" });
//       }
//     }

//     const { data: updatedServiceData, error: updatedServiceError } =
//       await supabase
//         .from("service")
//         .update(updatedServiceItem)
//         .eq("service_id", serviceId);

//     if (updatedServiceError) {
//       console.error("Error updating service data", updatedServiceError);
//       return res
//         .status(500)
//         .json({ message: "Error updating data in supabase" });
//     }

//     // const { data: latestService } = await supabase
//     //   .from("service")
//     //   .select("service_id")
//     //   .order("service_id", { ascending: false })
//     //   .limit(1);

//     // const service_id = latestService[0].service_id;

//     // for (const subServiceItem of updatedSubServiceItems) {
//     //   subServiceItem.service_id = service_id;
//     // }

//     // if (!service_id) {
//     //   console.error("Failed to retrieve service_id from database");
//     //   return res
//     //     .status(500)
//     //     .json({ message: "Failed to retrieve service_id from database" });
//     // }

//     updatedSubServiceItems = updatedSubServiceItems.map((item) => {
//       if (!item.sub_service_quantity) {
//         return { ...item, sub_service_quantity: 1 };
//       }
//       return item;
//     });

//     const { data: updatedSubServiceData, error: updatedSubServiceError } =
//       await supabase
//         .from("sub_service")
//         .upsert(updatedSubServiceItems)
//         .eq("service_id", serviceId);

//     console.log("updatedSubServiceData:", updatedSubServiceData);
//     console.log("updatedSubServiceError:", updatedSubServiceError);

//     return res.status(200).send("Service DATA updated successfully");
//   } catch (error) {
//     console.error("Error updating service data", error);
//     res.status(500).json({
//       message: "Error updating service data in supabase",
//       error: error.message,
//     });
//   }
// });

// serviceRouter.put("/:id", upload.single("file"), async (req, res) => {
//   try {
//     const serviceId = req.params.id;
//     const user_id = req.body.user_id;
//     const file = req.file;

//     console.log(req.body);

//     const updatedServiceItem = {
//       user_id: user_id,
//       service_photo: file,
//       service_edited_date: new Date(),
//     };

//     if (file) {
//       updatedServiceItem["service_photo"] = file.originalname;
//     }

//     const optionalFields = [
//       "service_name",
//       "category_id",
//       "service_created_date",
//     ];
//     optionalFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         updatedServiceItem[field] = req.body[field];
//       }
//     });

//     let updatedSubServiceItems;
//     try {
//       updatedSubServiceItems = JSON.parse(req.body.items);

//       if (!Array.isArray(updatedSubServiceItems)) {
//         updatedSubServiceItems = [updatedSubServiceItems];
//       }

//       // Ensure sub_service_quantity is set for each item
//       updatedSubServiceItems = updatedSubServiceItems.map((item) => {
//         if (!item.sub_service_quantity) {
//           item.sub_service_quantity = 1;
//         }

//         // Exclude sub_service_id from the data
//         const { sub_service_id, ...rest } = item;
//         return rest;
//       });
//       // Continue with your code for inserting/updating sub_service
//     } catch (error) {
//       console.error("Error parsing subServiceItems:", error);
//       return res
//         .status(400)
//         .json({ message: "Invalid format for subServiceItems" });
//     }

//     if (file) {
//       // Upload file to Supabase storage
//       const uploadResult = await supabase.storage
//         .from("home_service")
//         .upload(
//           `service_photo/${Date.now()}${file.originalname}`,
//           file.buffer,
//           {
//             cacheControl: "3600",
//             upsert: false,
//             contentType: file.mimetype,
//           }
//         );
//       console.log("uploadresult", uploadResult);

//       if (!uploadResult.error) {
//         // Get public URL for the uploaded file
//         const servicePhotourl = `https://tqjclbmprqjrgdrvylqd.supabase.co/storage/v1/object/public/home_service/${uploadResult.data.path}`;
//         console.log(uploadResult.data.path);

//         // Assign the URL directly to service_photo
//         updatedServiceItem["service_photo"] = servicePhotourl;
//       } else {
//         console.error(
//           "Error uploading file to Supabase storage",
//           uploadResult.error
//         );
//         return res
//           .status(500)
//           .json({ message: "Error uploading file to Supabase storage" });
//       }
//     }

//     const { data: updatedServiceData, error: updatedServiceError } =
//       await supabase
//         .from("service")
//         .update(updatedServiceItem)
//         .eq("service_id", serviceId);

//     if (updatedServiceError) {
//       console.error("Error updating service data", updatedServiceError);
//       return res
//         .status(500)
//         .json({ message: "Error updating data in supabase" });
//     }

//     updatedSubServiceItems = updatedSubServiceItems.map((item) => {
//       if (!item.sub_service_quantity) {
//         return { ...item, sub_service_quantity: 1 };
//       }
//       return item;
//     });

//     const { data: updatedSubServiceData, error: updatedSubServiceError } =
//       await supabase
//         .from("sub_service")
//         .upsert(updatedSubServiceItems)
//         .eq("service_id", serviceId);

//     console.log("updatedSubServiceData:", updatedSubServiceData);
//     console.log("updatedSubServiceError:", updatedSubServiceError);

//     return res.status(200).send("Service DATA updated successfully");
//   } catch (error) {
//     console.error("Error updating service data", error);
//     res.status(500).json({
//       message: "Error updating service data in supabase",
//       error: error.message,
//     });
//   }
// });

//อันนี้อัพเดทได้ทั้งคู่ แต่ duplicate อันเดิม
// serviceRouter.put("/:id", upload.single("file"), async (req, res) => {
//   try {
//     const serviceId = req.params.id;
//     const user_id = req.body.user_id;
//     const file = req.file;

//     const updatedServiceItem = {
//       user_id: user_id,
//       service_edited_date: new Date(),
//     };

//     if (file) {
//       updatedServiceItem["service_photo"] = file.originalname;
//     }

//     const optionalFields = [
//       "service_name",
//       "category_id",
//       "service_created_date",
//     ];

//     optionalFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         updatedServiceItem[field] = req.body[field];
//       }
//     });

//     let updatedSubServiceItems;
//     try {
//       updatedSubServiceItems = JSON.parse(req.body.items);

//       if (!Array.isArray(updatedSubServiceItems)) {
//         updatedSubServiceItems = [updatedSubServiceItems];
//       }

//       // Ensure sub_service_quantity is set for each item
//       updatedSubServiceItems = updatedSubServiceItems.map((item) => {
//         if (!item.sub_service_quantity) {
//           item.sub_service_quantity = 1;
//         }

//         // Exclude sub_service_id from the data
//         const { sub_service_id, ...rest } = item;
//         return rest;
//       });
//     } catch (error) {
//       console.error("Error parsing subServiceItems:", error);
//       return res
//         .status(400)
//         .json({ message: "Invalid format for subServiceItems" });
//     }

//     // Update service details
//     const { data: updatedServiceData, error: updatedServiceError } =
//       await supabase
//         .from("service")
//         .update(updatedServiceItem)
//         .eq("service_id", serviceId);

//     if (updatedServiceError) {
//       console.error("Error updating service data", updatedServiceError);
//       return res
//         .status(500)
//         .json({ message: "Error updating data in supabase" });
//     }

//     const { data: existingSubServiceItems, error: existingSubServiceError } =
//       await supabase
//         .from("sub_service")
//         .select("*")
//         .eq("service_id", serviceId);

//     if (existingSubServiceError) {
//       console.error(
//         "Error fetching existing sub_service items",
//         existingSubServiceError
//       );
//       return res
//         .status(500)
//         .json({ message: "Error fetching sub_service items" });
//     }

//     // Identify which items need to be updated and which are new
//     const existingSubServiceIds = existingSubServiceItems.map(
//       (item) => item.sub_service_id
//     );
//     const updatedSubServiceIds = updatedSubServiceItems
//       .filter((item) => item.sub_service_id)
//       .map((item) => item.sub_service_id);
//     const newSubServiceItems = updatedSubServiceItems.filter(
//       (item) => !item.sub_service_id
//     );

//      const updatedExistingSubServiceItems = updatedSubServiceItems.filter(
//       (item) => existingSubServiceIds.includes(item.sub_service_id)
//     );

//     for (const updatedItem of updatedExistingSubServiceItems) {
//       await supabase.from("sub_service").upsert([
//         {
//           ...updatedItem,
//           service_id: serviceId,
//         },
//       ]);
//     }

//     // Insert new sub_service items
//     for (const newItem of newSubServiceItems) {
//       await supabase.from("sub_service").upsert([
//         {
//           ...newItem,
//           service_id: serviceId,
//         },
//       ]);
//     }

//     return res.status(200).send("Service DATA updated successfully");
//   } catch (error) {
//     console.error("Error updating service data", error);
//     res.status(500).json({
//       message: "Error updating service data in supabase",
//       error: error.message,
//     });
//   }
// });

// อันนี้อัพเดทได้แค่อันเดียว
// serviceRouter.put("/:id", upload.single("file"), async (req, res) => {
//   try {
//     console.log(req.body)
//     const serviceId = req.params.id;
//     const user_id = req.body.user_id;
//     const file = req.file;

//     const updatedServiceItem = {
//       user_id: user_id,
//       service_edited_date: new Date(),
//     };

//     if (file) {
//       updatedServiceItem["service_photo"] = file.originalname;
//     }

//     const optionalFields = [
//       "service_name",
//       "category_id",
//       "service_created_date",
//     ];

//     optionalFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         updatedServiceItem[field] = req.body[field];
//       }
//     });

//     let updatedSubServiceItems;
//     try {
//       updatedSubServiceItems = JSON.parse(req.body.items);

//       if (!Array.isArray(updatedSubServiceItems)) {
//         updatedSubServiceItems = [updatedSubServiceItems];
//       }

//       // Ensure sub_service_quantity is set for each item
//       updatedSubServiceItems = updatedSubServiceItems.map((item) => {
//         if (!item.sub_service_quantity) {
//           item.sub_service_quantity = 1;
//         }

//         // Exclude sub_service_id from the data
//         const { sub_service_id, ...rest } = item;
//         return rest;
//       });
//     } catch (error) {
//       console.error("Error parsing subServiceItems:", error);
//       return res
//         .status(400)
//         .json({ message: "Invalid format for subServiceItems" });
//     }

//     // Begin transaction
//     const { data: transactionData, error: transactionError } = await supabase
//       .from("service")
//       .upsert([
//         {
//           ...updatedServiceItem,
//           service_id: serviceId,
//         },
//       ]);

//     if (transactionError) {
//       console.error("Error updating service data", transactionError);
//       return res
//         .status(500)
//         .json({ message: "Error updating data in supabase" });
//     }

//     // Delete existing sub_service items
//     const { error: deleteError } = await supabase
//       .from("sub_service")
//       .delete()
//       .eq("service_id", serviceId);

//     if (deleteError) {
//       console.error("Error deleting existing sub_service items", deleteError);
//       return res
//         .status(500)
//         .json({ message: "Error deleting existing sub_service items" });
//     }

//     // Insert new sub_service items
//     const { data: insertData, error: insertError } = await supabase
//       .from("sub_service")
//       .upsert(updatedSubServiceItems);

//     if (insertError) {
//       console.error("Error inserting sub_service items", insertError);
//       return res
//         .status(500)
//         .json({ message: "Error inserting sub_service items" });
//     }

//     return res.status(200).send("Service DATA updated successfully");
//   } catch (error) {
//     console.error("Error updating service data", error);
//     res.status(500).json({
//       message: "Error updating service data in supabase",
//       error: error.message,
//     });
//   }
// });

serviceRouter.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const serviceId = req.params.id;
    const user_id = req.body.user_id;
    const file = req.file;

    const updatedServiceItem = {
      user_id: user_id,
      service_edited_date: new Date(),
    };

    if (file) {
      const updateResult = await supabase.storage
        .from("home_service")
        .update(
          `service_photo/${Date.now()}${file.originalname}`,
          file.buffer,
          {
            cacheControl: "3600",
            upsert: false,
            contentType: file.mimetype,
          }
        );

      const servicePhotoUrl = supabase.storage
        .from("home_service")
        .getPublicUrl(`service_photo/${Date.now()}${file.originalname}`);

      updatedServiceItem["service_photo"] = servicePhotoUrl;
    }

    const optionalFields = [
      "service_name",
      "category_id",
      "service_created_date",
    ];

    optionalFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedServiceItem[field] = req.body[field];
      }
    });

    let updatedSubServiceItems;
    try {
      updatedSubServiceItems = JSON.parse(req.body.items);

      if (!Array.isArray(updatedSubServiceItems)) {
        updatedSubServiceItems = [updatedSubServiceItems];
      }

      // Ensure sub_service_quantity is set for each item
      updatedSubServiceItems = updatedSubServiceItems.map((item) => {
        if (!item.sub_service_quantity) {
          item.sub_service_quantity = 1;
        }

        // Exclude sub_service_id from the data
        const { sub_service_id, ...rest } = item;
        return rest;
      });
    } catch (error) {
      console.error("Error parsing subServiceItems:", error);
      return res
        .status(400)
        .json({ message: "Invalid format for subServiceItems" });
    }

    // Begin transaction
    await supabase.rpc("start_transaction");

    // Update service information
    const { data: transactionData, error: transactionError } = await supabase
      .from("service")
      .upsert([
        {
          ...updatedServiceItem,
          service_id: serviceId,
        },
      ]);

    if (transactionError) {
      console.error("Error updating service data", transactionError);
      await supabase.rpc("rollback_transaction");
      return res
        .status(500)
        .json({ message: "Error updating data in supabase" });
    }

    // Retrieve existing sub-service items
    const { data: existingSubServiceItems, error: fetchError } = await supabase
      .from("sub_service")
      .select("*")
      .eq("service_id", serviceId);

    if (fetchError) {
      console.error("Error fetching existing sub_service items", fetchError);
      await supabase.rpc("rollback_transaction");
      return res
        .status(500)
        .json({ message: "Error fetching existing sub_service items" });
    }

    // Compare existing with updated sub-service items
    const itemsToAdd = updatedSubServiceItems.filter(
      (updatedItem) =>
        !existingSubServiceItems.some(
          (existingItem) =>
            existingItem.sub_service_id === updatedItem.sub_service_id
        )
    );

    const itemsToUpdate = updatedSubServiceItems.filter((updatedItem) =>
      existingSubServiceItems.some(
        (existingItem) =>
          existingItem.sub_service_id === updatedItem.sub_service_id
      )
    );

    const itemsToDelete = existingSubServiceItems.filter(
      (existingItem) =>
        !updatedSubServiceItems.some(
          (updatedItem) =>
            existingItem.sub_service_id === updatedItem.sub_service_id
        )
    );

    // Insert new sub-service items
    for (const item of itemsToAdd) {
      const { sub_service_id, ...rest } = item;

      rest.service_id = serviceId;

      const { error: insertError } = await supabase
        .from("sub_service")
        .insert([rest]);

      if (insertError) {
        console.error("Error inserting sub_service item", insertError);
        await supabase.rpc("rollback_transaction");
        return res
          .status(500)
          .json({ message: "Error inserting sub_service item" });
      }
    }

    // Update existing sub-service items
    for (const item of itemsToUpdate) {
      const { sub_service_id, ...rest } = item;
      const { error: updateError } = await supabase
        .from("sub_service")
        .upsert([rest]);

      if (updateError) {
        console.error("Error updating sub_service item", updateError);
        await supabase.rpc("rollback_transaction");
        return res
          .status(500)
          .json({ message: "Error updating sub_service item" });
      }
    }

    // Delete sub-service items
    const { error: deleteError } = await supabase
      .from("sub_service")
      .delete()
      .in(
        "sub_service_id",
        itemsToDelete.map((item) => item.sub_service_id)
      );

    if (deleteError) {
      console.error("Error deleting sub_service items", deleteError);
      await supabase.rpc("rollback_transaction");
      return res
        .status(500)
        .json({ message: "Error deleting sub_service items" });
    }

    // Commit transaction
    await supabase.rpc("commit_transaction");

    return res.status(200).send("Service DATA updated successfully");
  } catch (error) {
    console.error("Error updating service data", error);
    res.status(500).json({
      message: "Error updating service data in supabase",
      error: error.message,
    });
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
