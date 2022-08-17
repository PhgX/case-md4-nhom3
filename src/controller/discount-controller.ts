import { Request, Response } from "express";
import { Discount } from "../schema/discount.model";

class DiscountController {
    getAll = async (req: Request, res: Response) => {
        let discounts = await Discount.find();
        res.status(200).json(discounts);
    }

}
export default new DiscountController();