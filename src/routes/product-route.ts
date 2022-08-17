import { Router } from "express";
import productController from "../controller/product-controller";

export const productRoute = Router();
productRoute.get('', productController.getAll)