import { Router } from "express";
import tagController from "../controller/tag-controller";

export const tagRoute = Router();
tagRoute.get('', tagController.getAll)