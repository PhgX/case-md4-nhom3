import { Router } from "express";
import { auth } from "../middleware/auth";
import userController from "../controller/user-controller";
import { checkIsAdmin } from "../middleware/checkIsAdmin";
import adminController from "../controller/admin-controller";

export const adminRoute = Router();
adminRoute.use(checkIsAdmin)
adminRoute.get('',adminController.showAdminPage)