//api ฝั่ง customer
import { Router } from "express";
import supabase from "../utils/supabase.js";
import { protect } from "../middlewares/protects.js";

const checkoutRouter = Router();
checkoutRouter.use(protect);

function generateOrderNumber() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter1 = letters[Math.floor(Math.random() * letters.length)];
  const randomLetter2 = letters[Math.floor(Math.random() * letters.length)];

  const randomNumber1 = Math.floor(Math.random() * 10);
  const randomNumber2 = Math.floor(Math.random() * 10);
  const randomNumber3 = Math.floor(Math.random() * 10);
  const randomNumber4 = Math.floor(Math.random() * 10);

  const orderNumber = `${randomLetter1}${randomLetter2}${randomNumber1}${randomNumber2}${randomNumber3}${randomNumber4}`;

  return `${orderNumber}`;
}

// API route to add new checkout item to checkout table
checkoutRouter.get("/", async (req, res) => {
  const { keyword } = req.query;
  try {
    if (keyword) {
      const { data, error } = await supabase
        .from("promotion")
        .select("*")
        .ilike("promotion_code", `%${keyword}%`);
      if (error) {
        throw error;
      }
      return res.json({
        data,
      });
    }

    let { data, error } = await supabase.from("promotion").select("*");

    return res.json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

checkoutRouter.post("/", async (req, res) => {
  //req.body ที่ได้มา ใช้ insert 3 table
  try {
    console.log(req.body);

    const { formData, subService, totalPrice, user_id, promotion_id } =
      req.body;

    const {
      service_date_time,
      address,
      sub_district,
      district,
      province,
      note,
    } = formData;

    // Insert into checkout
    const { data: checkoutData, error: checkoutError } = await supabase
      .from("checkout")
      .insert({
        service_date_time,
        address,
        sub_district,
        district,
        province,
        note,
        total_price: totalPrice,
        promotion_id,
      });

    console.log("checkout data", checkoutData);

    const { data: lastestCheckout } = await supabase
      .from("checkout")
      .select("checkout_id")
      .order("checkout_id", { ascending: false })
      .limit(1);

    console.log("lastest checkout", lastestCheckout);
    const checkout_id = lastestCheckout[0].checkout_id;

    // Insert or update checkout_quantity
    await Promise.all(
      subService.map(async (item) => {
        const { sub_service_id, sub_service_quantity } = item;
        await supabase.from("checkout_quantity").upsert(
          [
            {
              sub_service_id,
              checkout_id,
              sub_service_quantity,
            },
          ],
          { onConflict: ["checkout_quantity_id"] }
        );
      })
    );

    const order_number = generateOrderNumber();

    // Insert into order_history
    const { data: orderHistoryData, error: orderHistoryError } = await supabase
      .from("order_history")
      .insert([
        {
          order_number,
          serviceman_detail_id: 1,
          status: "รอดำเนินการ",
          checkout_id,
          user_id,
          service_id: req.body.service_id,
        },
      ]);

    res.json({ message: "สร้าง Order สำเร็จ" });
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
    console.error(error);
  }
});

// checkoutRouter.post("/", async (req, res) => {
//   //req.body ที่ได้มา ใช้ insert 3 table
//   try {

//     console.log(req.body)
//     const { formData, subService, totalPrice, user_id } = req.body;

//     const { service_date_time, address, sub_district, district, province, note } =
//       formData;

//     // Insert into checkout
//     const { data: checkoutData, error: checkoutError } = await supabase
//       .from("checkout")
//       .insert([{ service_date_time, address, sub_district, district, province, note, total_price: totalPrice, user_id: user_id }]);

//       const { data: lastestCheckout } = await supabase
//       .from("checkout")
//       .select("checkout_id")
//       .order("checkout_id")
//       .limit(1)

//     const checkout_id = lastestCheckout[0].checkout_id;

//     // Insert or update checkout_quantity
//     const checkoutQuantityData = await Promise.all(
//       subService.map(async (item) => {
//         const { sub_service_id, sub_service_quantity } = item;
//         const { data, error } = await supabase.from("checkout_quantity").upsert(
//           [
//             {
//               sub_service_id,
//               checkout_id,
//               sub_service_quantity,
//             },
//           ],
//           { onConflict: ["checkout_quantity_id"] }
//         );
//         return data;
//       })
//     );

//     const order_number = generateOrderNumber();

//     // Insert into order_history
//     const { data: orderHistoryData, error: orderHistoryError } = await supabase
//       .from("order_history")
//       .insert([
//         {
//           order_number,
//           status: "กำลังดำเนินการ",
//           checkout_id,
//           user_id: user_id, // replace with actual user ID
//         },
//       ]);

//     res.json({ message: "สร้าง Order สำเร็จ" });
//   } catch (error) {
//     res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
//     console.error(error);
//   }
// });

// checkoutRouter.post("/", async (req, res) => {
//   //req.body ที่ได้มา ใช้ insert 3 table
//   try {
//     console.log('req.body', req.body);

//     // const {
//     //   user_id,
//     //   service_date_time,
//     //   address,
//     //   sub_district,
//     //   district,
//     //   province,
//     //   note,
//     //   total_price,
//     //   sub_service_id,
//     //   sub_service_quantity,
//     //   // status,
//     // } = req.body;

//     // const checkoutItem = {
//     //   service_date_time,
//     //   address,
//     //   sub_district,
//     //   district,
//     //   province,
//     //   note,
//     //   total_price,
//     // };

//     // console.log(checkoutItem);

//     // // Insert into checkout
//     // const { data: checkoutData, error: checkoutError } = await supabase
//     //   .from("checkout")
//     //   .insert([checkoutItem]);

//     // const { data: latestId } = await supabase
//     //   .from("checkout")
//     //   .select("checkout_id")
//     //   .order("checkout_id", { ascending: false })
//     //   .limit(1);

//     // const checkout_id = latestId[0].checkout_id;

//     // // Insert or update checkout_quantity
//     // const { data: checkoutQuantityData, error: checkoutQuantityError } =
//     //   await supabase.from("checkout_quantity").upsert(
//     //     [
//     //       {
//     //         // checkout_quantity_id,
//     //         sub_service_id,
//     //         checkout_id,
//     //         sub_service_quantity,
//     //       },
//     //     ],
//     //     { onConflict: ["checkout_quantity_id"] }
//     //   );

//     // const order_number = generateOrderNumber();

//     // // Insert into order_history
//     // const { data: orderHistoryData, error: orderHistoryError } = await supabase
//     //   .from("order_history")
//     //   .insert([
//     //     {
//     //       order_number,
//     //       status: "กำลังดำเนินการ",
//     //       checkout_id,
//     //       user_id,
//     //     },
//     //   ]);

//     res.json({ message: "สร้าง Order สำเร็จ" });
//   } catch (error) {
//     res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
//     console.error(error);
//   }
// });

export default checkoutRouter;
