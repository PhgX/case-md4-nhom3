import { Request, Response } from "express";
import { Restaurant } from "../schema/restaurant.model";

class RestaurantController {
    getAll = async (req: Request, res: Response) => {
        let restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    }

}
export default new RestaurantController();