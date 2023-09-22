"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
const StakingHistoryModel_1 = require("../models/StakingHistoryModel");
const functions_1 = require("../utils/functions");
const status_1 = require("../enums/status");
class StakingController {
    static async getPositions(req, res) {
        const { email } = req.user;
        await StakingHistoryModel_1.default.find({ email, status: status_1.STAKING_STATUS.PROGRESS })
            .then(histories => {
            if (histories) {
                res.status(200).json({
                    success: true,
                    valid: true,
                    histories
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    valid: true,
                    message: "No open positions"
                });
            }
        });
    }
    static async addPosition(req, res) {
        const { username, email } = req.user;
        const { coin, deposit, rate, earning, usd, time } = req.body;
        await UserModel_1.default.findOne({ email })
            .then((user) => {
            if (user) {
                if (user.wallet[coin.toLowerCase()] < deposit) {
                    res.status(200).json({
                        success: false,
                        valid: true,
                        message: "You do not have enough coin to stake."
                    });
                }
                else {
                    user.wallet[coin.toLowerCase()] -= deposit;
                    const newHistory = new StakingHistoryModel_1.default({
                        username,
                        email,
                        coin,
                        deposit,
                        rate,
                        earning,
                        usd,
                        endDate: (0, functions_1.calculateEndDate)(time)
                    });
                    user.save().then((user) => {
                        newHistory.save().then((history) => {
                            res.status(200).json({
                                success: true,
                                valid: true,
                                message: "The position was added successfully.",
                                history,
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
                    message: "Cannot find the wallet for the user."
                });
            }
        });
    }
    static async setPositionReady(req, res) {
        await StakingHistoryModel_1.default.findById(req.body.id)
            .then(history => {
            if (history) {
                history.status = status_1.STAKING_STATUS.FINISHED;
                history.save()
                    .then(() => {
                    res.status(200).json({
                        success: true,
                        valid: true,
                        message: "The position is finished."
                    });
                })
                    .catch((error) => console.log(error));
            }
            else {
                res.status(404).json({
                    success: false,
                    valid: true,
                    message: "Cannot find the history with that ID."
                });
            }
        });
    }
    static async getMoney(req, res) {
        const { email } = req.user;
        await UserModel_1.default.findOne({ email })
            .then(async (user) => {
            if (user) {
                await StakingHistoryModel_1.default.findById(req.body.id)
                    .then(history => {
                    if (history) {
                        if (history.status === status_1.STAKING_STATUS.EARNED) {
                            res.status(200).json({
                                success: false,
                                valid: true,
                                message: "You've already got the money."
                            });
                        }
                        else {
                            const remainTime = history.endDate - new Date().getTime();
                            if (remainTime > 0) {
                                res.status(200).json({
                                    success: false,
                                    valid: true,
                                    message: "The position is not ready yet."
                                });
                            }
                            else {
                                user.wallet[history.coin.toLowerCase()] = user.wallet[history.coin.toLowerCase()] + history.earning;
                                history.status = status_1.STAKING_STATUS.EARNED;
                                user.save()
                                    .then((savedUser) => {
                                    history.save().then(() => {
                                        res.status(200).json({
                                            success: true,
                                            valid: true,
                                            message: "Great! You've earned the money.",
                                            user: savedUser
                                        });
                                    }).catch((error) => console.log(error));
                                })
                                    .catch((error) => console.log(error));
                            }
                        }
                    }
                    else {
                        res.status(404).json({
                            success: false,
                            valid: true,
                            message: "Cannot find the history with that ID."
                        });
                    }
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    valid: true,
                    message: "Cannot find the wallet for the user."
                });
            }
        });
    }
}
exports.default = StakingController;
//# sourceMappingURL=StakingController.js.map