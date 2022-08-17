import { Request, Response } from "express";
import { User } from "../schema/user.model";

class UserController {
    getAll = async (req: Request, res: Response) => {
        let users = await User.find().populate('role','name');
        res.status(200).json(users)
    }
}
export default new UserController();