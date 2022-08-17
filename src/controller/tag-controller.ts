import { Request, Response } from "express";
import { Tag } from "../schema/tag.model";

class TagController {
    getAll = async (req: Request, res: Response) => {
        let tags = await Tag.find();
        res.status(200).json(tags);
    }

}
export default new TagController();