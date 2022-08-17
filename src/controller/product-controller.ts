import { Request, Response } from "express";
import { Product } from "../schema/product.model";

class ProductController {
    getAll = async (req: Request, res: Response) => {
        let products = await Product.find();
        res.status(200).json(products);
    }

}
export default new ProductController();