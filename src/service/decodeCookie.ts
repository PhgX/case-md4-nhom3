import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../controller/auth-controller';
export const decodeCookie = (req, res) => {
    let decodedData = -1;
    let cookie = req.headers.cookie;
    if (cookie) {
        let accessToken = cookie.split('=')[1];
        if (!accessToken) {
            decodedData = -1;
        } else {
            jwt.verify(accessToken, SECRET_KEY, (err, data) => {
                if (err) {
                    decodedData = -1;
                } else {
                    decodedData = data;
                }
            });
        }
    } else {
        decodedData = -1;
    }
    return decodedData;
}