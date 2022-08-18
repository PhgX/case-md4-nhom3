
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { decodeCookie } from '../service/decodeCookie';
import { SECRET_KEY } from '../controller/auth-controller';
export const checkIsAdmin = (req, res, next : NextFunction) => {
    let decodedData: any = decodeCookie(req,res)
    console.log(decodedData)
    if (decodedData === -1) {
        res.redirect('/')
    }
    else {
        let isAdmin = false;
        for (const role of decodedData.role) {
            if (role.name === 'admin') {
                isAdmin = true;
                break;
            }
        }
        if (isAdmin) {
            next();
        }
        else {
            res.redirect('/')
        }
    }


    // let authorization = req.headers.cookie;
    // if (authorization) {
    //     let accessToken = authorization.split('=')[1];
    //     if (!accessToken) {
    //         res.redirect('/');
    //     } else {
    //         let test = decodeCookie(req,res);
    //         console.log('test=',test)
    //         jwt.verify(accessToken, SECRET_KEY, (err, data) => {
    //             if (err) {
    //                 res.redirect('/');
    //             } else {
    //                 req.decoded = data;
    //                 let isAdmin = false;
    //                 for (let i=0;i<data.role.length;i++) {
    //                     if (data.role[i] === '62fc447f48d8e5721c43579d')
    //                     isAdmin = true;
    //                     break;
    //                 }
    //                 if (isAdmin) {
    //                     next()
    //                 } else {
    //                     res.redirect('/');
    //                 }
    //             }
    //         });
    //     }
    // } else {
    //     res.redirect(200,'/');
    // }
}
