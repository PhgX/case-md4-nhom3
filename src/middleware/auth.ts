
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../controller/auth-controller';

export const auth = (req, res, next : NextFunction) => {
    let authorization = req.headers.cookie;
    if (authorization) {
        let accessToken = authorization.split('=')[1];
        if (!accessToken) {
            res.render(`products/home`)
        } else {
            jwt.verify(accessToken, SECRET_KEY, (err, data) => {
                if (err) {
                    res.render(`products/home`)
                } else {
                    req.decoded = data;
                    console.log(data.role)
                    next();
                }
            });
        }
    } else {
        res.render(`products/home`)
    }
}
