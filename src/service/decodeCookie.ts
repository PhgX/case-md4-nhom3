import { Request, Response } from "express";

export const decodeCookie = (req: Request, res: Response) => {
    let cookie = req.headers.cookie;
    let accessToken = cookie.split('=')[1];
}