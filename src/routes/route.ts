import { Router } from "express";
import { adminRoute } from "./admin-route";
import { categoryRoute } from "./category-route";
import { discountRoute } from "./discount-route";
import { loginRoutes } from "./login-route";
import { orderRoute } from "./order-route";
import { orderDetailRoute } from "./orderDetail-route";
import { productRoute } from "./product-route";
import { restaurantRoute } from "./restaurant-route";
import { roleRoute } from "./role-route";
import { tagRoute } from "./tag-route";
import { userRoute } from "./user-route";


export const router = Router();
router.use('', loginRoutes);
router.use('/products',productRoute);
router.use('/admin',adminRoute);
router.use('/users',userRoute);
router.use('/roles', roleRoute);
router.use('/categories', categoryRoute);
router.use('/tags', tagRoute);
router.use('/restaurants', restaurantRoute);
router.use('/orderDetails', orderDetailRoute);
router.use('/orders', orderRoute);
router.use('/discounts', discountRoute);


