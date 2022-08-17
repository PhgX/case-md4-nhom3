import { Request, Response } from "express";
import { Category } from "../schema/category.model";

class CategoryController {
    getAll = async (req: Request, res: Response) => {
        let categories = await Category.find();
        res.status(200).json(categories);
    }

}
export default new CategoryController();