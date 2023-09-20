//api order history
import { Router } from "express";
import supabase from "../utils/supabase.js";
// import { protect } from "../middlewares/protects.js";

const orderHistoryRouter = Router();
// orderHistoryRouter.use(protect);

// API route to view order history by userId


orderHistoryRouter.get('/', async (req, res) => {
  try {
    // ดึงข้อมูลจากตาราง users
    const { data: users, error: usersError } = await supabase.from('users').select('*');
    if (usersError) throw usersError;

    // ดึงข้อมูลจากตาราง service
    const { data: services, error: servicesError } = await supabase.from('service').select('*');
    if (servicesError) throw servicesError;

    // ดึงข้อมูลจากตาราง sub_service
    const { data: subServices, error: subServicesError } = await supabase.from('sub_service').select('*');
    if (subServicesError) throw subServicesError;

    // ดึงข้อมูลจากตาราง checkout_quantity
    const { data: checkoutQuantities, error: checkoutQuantitiesError } = await supabase.from('checkout_quantity').select('*');
    if (checkoutQuantitiesError) throw checkoutQuantitiesError;

    // ดึงข้อมูลจากตาราง checkout
    const { data: checkouts, error: checkoutsError } = await supabase.from('checkout').select('*');
    if (checkoutsError) throw checkoutsError;

    // ดึงข้อมูลจากตาราง order_history
    const { data: orderHistories, error: orderHistoriesError } = await supabase.from('order_history').select('*');
    if (orderHistoriesError) throw orderHistoriesError;

    // รวมข้อมูลเข้าด้วยกัน
    const combinedData = users.map((user) => {
      // รวมข้อมูลบริการของแต่ละผู้ใช้
      user.services = services.filter((service) => service.user_id === user.user_id);

      // รวมข้อมูลบริการย่อยของแต่ละบริการ
      user.services.forEach((service) => {
        service.sub_services = subServices.filter((subService) => subService.service_id === service.service_id);
      });

      // รวมข้อมูลการสั่งซื้อและปริมาณการสั่งซื้อของแต่ละบริการ
      user.services.forEach((service) => {
        service.checkouts = checkouts.filter((checkout) => checkout.service_id === service.service_id);

        service.checkouts.forEach((checkout) => {
          checkout.checkout_quantities = checkoutQuantities.filter(
            (cq) => cq.checkout_id === checkout.checkout_id
          );
        });
      });

      // รวมข้อมูลประวัติการสั่งซื้อของแต่ละผู้ใช้
      user.order_histories = orderHistories.filter((oh) => oh.user_id === user.user_id);

      return user;
    });

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลและรวมข้อมูล' });
  }
});

export default orderHistoryRouter;
