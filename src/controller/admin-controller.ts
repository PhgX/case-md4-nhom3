import { Request, Response } from "express";

class AdminController {
    showAdminPage = (req: Request, res: Response) => {
        res.render('admin/home')
    }
}
export default new AdminController;