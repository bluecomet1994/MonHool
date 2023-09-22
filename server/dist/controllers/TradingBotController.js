"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const TradingHistoryModel_1 = require("../models/TradingHistoryModel");
const status_1 = require("../enums/status");
const functions_1 = require("../utils/functions");
const UserModel_1 = require("../models/UserModel");
class TradingBotController {
    static async getCryptoCurrency(req, res) {
        const currencyApi = 'https://data.binance.com/api/v3/ticker?symbols=["BTCUSDT","ETHUSDT","BUSDUSDT","XRPUSDT","SOLUSDT"]';
        axios_1.default.get(currencyApi)
            .then(response => {
            res.status(200).json({
                success: true,
                data: response.data
            });
        });
    }
    static async getPosition(req, res) {
        const { email } = req.user;
        await TradingHistoryModel_1.default.findOne({ email, status: status_1.TRADING_STATUS.OPENED })
            .then(history => {
            if (history) {
                res.status(200).json({
                    success: true,
                    valid: true,
                    status: status_1.TRADING_STATUS.OPENED,
                    message: "The position is open.",
                    history
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    valid: true,
                    status: status_1.TRADING_STATUS.NO_OPEN,
                    message: "No opened positon."
                });
            }
        });
    }
    static async openPosition(req, res) {
        const { username, email } = req.user;
        const { amount, hit, time, balance } = req.body;
        await UserModel_1.default.findOne({ email })
            .then(async (user) => {
            await TradingHistoryModel_1.default.findOne({ email, status: status_1.TRADING_STATUS.OPENED })
                .then(history => {
                if (history) {
                    res.status(200).json({
                        success: false,
                        valid: true,
                        status: status_1.TRADING_STATUS.OPENED,
                        message: "There is already opened position."
                    });
                }
                else {
                    if (balance === false) {
                        res.status(200).json({
                            success: false,
                            valid: true,
                            message: "You do not have enough money in your wallet."
                        });
                    }
                    else {
                        Object.keys(balance).map(key => {
                            user.wallet[key.toLowerCase()] -= balance[key];
                        });
                        const newTradingHistory = new TradingHistoryModel_1.default({
                            username,
                            email,
                            amount,
                            hit,
                            time,
                            endDate: (0, functions_1.calculateEndDate)(time)
                        });
                        user.save().then((user) => {
                            newTradingHistory.save()
                                .then((history) => {
                                res.status(200).json({
                                    success: true,
                                    valid: true,
                                    message: "You opened the position successfully!",
                                    history,
                                    user
                                });
                            }).catch((error) => console.log(error));
                        });
                    }
                }
            });
        });
    }
    static async getEarning(req, res) {
        const { email } = req.user;
        await UserModel_1.default.findOne({ email })
            .then(async (user) => {
            if (user) {
                await TradingHistoryModel_1.default.findById(req.body.id)
                    .then(history => {
                    if (history) {
                        const remainTime = history.endDate - new Date().getTime();
                        if (remainTime > 0) {
                            res.status(200).json({
                                success: false,
                                valid: true,
                                message: "The position is not ready yet."
                            });
                        }
                        else {
                            user.wallet.usdt += (history.amount * history.hit);
                            history.status = status_1.TRADING_STATUS.EARNED;
                            user.save()
                                .then((user) => {
                                history.save().then(() => {
                                    res.status(200).json({
                                        success: true,
                                        valid: true,
                                        message: "Great! You've earned the money!",
                                        user
                                    });
                                }).catch((error) => console.log(error));
                            });
                        }
                    }
                    else {
                        res.status(404).json({
                            success: false,
                            valid: true,
                            message: "Cannot find the position with that ID."
                        });
                    }
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    valid: true,
                    message: "Cannot find the wallet for this user."
                });
            }
        });
    }
}
exports.default = TradingBotController;
//# sourceMappingURL=TradingBotController.js.map