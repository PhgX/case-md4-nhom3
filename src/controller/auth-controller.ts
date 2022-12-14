import { Request, Response } from "express";
import { User } from "../schema/user.model";
import Validate from "./validate-signUp"
import  bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const SECRET_KEY = '379999';
class AuthenController {
    showHomepage = async (req: Request, res: Response) => {
        res.render('products/home');
    }

    showSignUp = async (req: Request, res: Response) => {
        let err = {
            username: '',
            password: '',
            re_password: '',
            email: '',
            phone: ''
        }
        res.render('auth/signUp', { err });
    }

    signUp = async (req: Request, res: Response) => {
        let err = {
            username: '',
            password: '',
            re_password: '',
            email: '',
            phone: ''
        }
        try {
            let userSignUp = req.body;
            let checkedInfo = new User(req.body);
            console.log(userSignUp);
            let username = userSignUp.username;
            let password = userSignUp.password;
            let repassword = userSignUp.re_password;
            let email = userSignUp.email;
            let phone = userSignUp.phone;
            if (await Validate.ValidateUserName(username) &&
                Validate.ValidatePassword(password, repassword) &&
                Validate.passwordMatch(password, repassword) &&
                Validate.ValidateEmail(email) &&
                await Validate.checkEmail(email) &&
                Validate.ValidatePhone(phone)) {
                checkedInfo.password = await bcrypt.hash(userSignUp.password, 10);
                await checkedInfo.save();
                console.log('Sign Up Success!');
                res.status(201).json(userSignUp);
            } else if (await Validate.ValidateUserName(username) == false) {
                err.username = 'Tài khoản đã tồn tại!'
                res.render('auth/signUp', { err });
            } else if (Validate.ValidatePassword(password, repassword) == false) {
                err.password = 'Mật khẩu từ 6 đến 20 ký tự, có bao gồm ít nhất 1 ký tự đặc biệt, 1 chữ in hoa, 1 chữ thường!'
                res.render('auth/signUp', { err });
                console.log('Incorrect Password');
            } else if (Validate.passwordMatch(password, repassword) == false) {
                err.re_password = 'Mật khẩu và mật khẩu xác nhận không khớp!'
                res.render('auth/signUp', { err });
                console.log('Incorrect password confirmation');
            } else if (Validate.ValidateEmail(email) == false) {
                err.email = 'Sai định dạng email, email có dạng : myemail@gmail.com!'
                res.render('auth/signUp', { err });
                console.log('Wrong email format')
            } else if (await Validate.checkEmail(email) == false) {
                err.email = 'Email đã được sử dụng'
                res.render('auth/signUp', { err });
                console.log('Email already used')
            } else if (Validate.ValidatePhone(phone) == false) {
                err.phone = 'Xin nhập số điện thoại của bạn bằng 10 chữ số!'
                res.render('auth/signUp', { err });
                console.log('Please enter your phone number in 10 digits')
            }
        } catch (err) {
            console.log('signUp err: ', err)
        }

    }

    showLoginForm = async (req: Request, res: Response) => {
        let err = {
            account : ''
        }
        res.render('auth/login', { err });
    }

    login = async (req: Request, res: Response) => {
        let err = {
            account: ''
        }
        try {
            let nameUsersubmit = req.body.username;
                let passwordUserSubmit = req.body.password

            let userInfo = await User.findOne({ username:nameUsersubmit });

            let comparePassword = await bcrypt.compare(passwordUserSubmit, userInfo.password);

            console.log('userInfo', userInfo.password);
            if (userInfo) {
                if (comparePassword) {
                    let payload = {
                        username : userInfo.username,
                        id: userInfo._id,
                        role: userInfo.role
                    }
                    let token = jwt.sign(payload, SECRET_KEY, {
                        expiresIn: 360000
                    });
                    console.log(token)
                    // res.status(200).json(token);
                    res.cookie('access_token',token, {
                        httpOnly: false
                    });
                    res.render(`products/home`)

                } else {
                    err.account = 'Tài khoản không tồn tại hoặc sai mật khẩu!'
                    res.render('auth/login', { err });

                    // res.status(401).json({
                    //     message: 'Password is wrong'
                    // })
                    console.log('Wrong password')
                }
            } else {
                err.account = 'Tài khoản không tồn tại hoặc sai mật khẩu!'
                res.render('auth/login', { err });
                // res.status(404).json({
                //     message: 'Account is not exist'
                // })
                console.log('Account is not exist')
            }
        } catch (err) {
            console.log('login err: ', err)
        }

    }
}

export default new AuthenController();