
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../controller/auth-controller';

export const checkIsAdmin = (req, res, next : NextFunction) => {
    let authorization = req.headers.cookie;
    if (authorization) {
        let accessToken = authorization.split('=')[1];
        if (!accessToken) {
            res.redirect('/');
        } else {
            jwt.verify(accessToken, SECRET_KEY, (err, data) => {
                if (err) {
                    res.redirect('/');
                } else {
                    req.decoded = data;
                    let isAdmin = false;
                    for (let i=0;i<data.role.length;i++) {
                        if (data.role[i] === '62fc447f48d8e5721c43579d')
                        isAdmin = true;
                        break;
                    }
                    if (isAdmin) {
                        next()
                    } else {
                        res.redirect('/');
                    }
                }
            });
        }
    } else {
        res.redirect(200,'/');
    }
}
