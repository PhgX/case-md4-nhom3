import { Router } from "express";
import { auth } from "../middleware/auth";
import userController from "../controller/user-controller";

export const userRoute = Router();
// userRoute.use(auth)
userRoute.get('',userController.getAll)