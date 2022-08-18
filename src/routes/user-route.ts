import { Router } from "express";
import { auth } from "../middleware/auth";
import userController from "../controller/user-controller";
import { checkIsAdmin } from "../middleware/checkIsAdmin";

export const userRoute = Router();
userRoute.use(checkIsAdmin)
userRoute.get('',userController.getAll)