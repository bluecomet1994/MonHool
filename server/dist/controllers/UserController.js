"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const UserModel_1 = require("../models/UserModel");
class UserController {
    static async test(req, res) {
        res.status(200).json({
            success: true,
            message: "Currently working"
        });
    }
    static async register(req, res) {
        const { errors } = (0, express_validator_1.validationResult)(req);
        if (errors.length > 0) {
            res.status(401).json({
                success: false,
                message: "Fields are invalid"
            });
        }
        else {
            const data = (0, express_validator_1.matchedData)(req);
            await UserModel_1.default.findOne({ email: data.email })
                .then(async (user) => {
                if (user) {
                    res.status(200).json({
                        success: false,
                        message: "The user already exists."
                    });
                }
                else {
                    await UserModel_1.default.findOne({ username: data.username })
                        .then(user => {
                        if (user) {
                            res.status(200).json({
                                success: false,
                                message: "The user already exists."
                            });
                        }
                        else {
                            const newUser = new UserModel_1.default(data);
                            bcrypt.genSalt(10, (error, salt) => {
                                bcrypt.hash(newUser.password, salt, async (error, hash) => {
                                    newUser.password = hash;
                                    await newUser.save()
                                        .then((user) => res.status(200).json({
                                        success: true,
                                        message: 'Successfully registered',
                                        user
                                    }));
                                });
                            });
                        }
                    });
                }
            });
        }
    }
    static async login(req, res) {
        const { errors } = (0, express_validator_1.validationResult)(req);
        if (errors.length > 0) {
            res.status(200).json({
                success: false,
                message: "Fields are invalid"
            });
        }
        else {
            const data = (0, express_validator_1.matchedData)(req);
            await UserModel_1.default.findOne({ email: data.email })
                .then(user => {
                if (!user) {
                    res.status(200).json({
                        success: false,
                        message: "The user does not exist"
                    });
                }
                else {
                    bcrypt.compare(data.password, user.password)
                        .then((isMatch) => {
                        if (isMatch) {
                            const payload = {
                                _id: user._id,
                                email: user.email,
                                password: user.password
                            };
                            jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
                                res.status(200).json({
                                    success: true,
                                    message: "Welcome back!",
                                    token
                                });
                            });
                        }
                        else {
                            res.status(200).json({
                                success: false,
                                message: "Password is incorrect"
                            });
                        }
                    });
                }
            });
        }
    }
    static async accessToken(req, res) {
        const currencyApi = 'http://data.binance.com/api/v3/ticker?symbols=["BTCUSDT","ETHUSDT","BUSDUSDT","XRPUSDT","SOLUSDT"]';
        res.status(200).json({
            success: true,
            user: _.pick(req.user, ['username', 'email', 'wallet', 'isAdmin', 'date'])
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map