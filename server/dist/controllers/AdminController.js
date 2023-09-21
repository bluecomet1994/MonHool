"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionHistoryModel_1 = require("../models/TransactionHistoryModel");
const status_1 = require("../enums/status");
const type_1 = require("../enums/type");
const UserModel_1 = require("../models/UserModel");
class AdminController {
    static async getDepositRequests(req, res) {
        const { email, isAdmin } = req.user;
        await UserModel_1.default.findOne({ email })
            .then(async (user) => {
            if (user) {
                if (isAdmin) {
                    await TransactionHistoryModel_1.default.find({ type: type_1.TRANSACTION_TYPE.DEPOSIT, status: status_1.TRANSACTION_STATUS.PENDING }).sort({ date: -1 })
                        .then(histories => {
                        res.status(200).json({
                            success: true,
                            valid: true,
                            message: "Deposit requests loaded.",
                            histories
                        });
                    });
                }
                else {
                    res.status(403).json({
                        success: false,
                        valid: true,
                        message: "You are not an administrator."
                    });
                }
            }
            else {
                res.status(404).json({
                    success: false,
                    valid: true,
                    message: "The user does not exist."
                });
            }
        });
    }
    static async getWithdrawalRequests(req, res) {
        const { email, isAdmin } = req.user;
        await UserModel_1.default.findOne({ email })
            .then(async (user) => {
            if (user) {
                if (isAdmin) {
                    await TransactionHistoryModel_1.default.find({ type: type_1.TRANSACTION_TYPE.WITHDRAWAL, status: status_1.TRANSACTION_STATUS.PENDING }).sort({ date: -1 })
                        .then(histories => {
                        res.status(200).json({
                            success: true,
                            valid: true,
                            message: "Withdrawal requests loaded.",
                            histories
                        });
                    });
                }
                else {
                    res.status(403).json({
                        success: false,
                        valid: true,
                        message: "You are not an administrator."
                    });
                }
            }
            else {
                res.status(404).json({
                    success: false,
                    valid: true,
                    message: "The user does not exist."
                });
            }
        });
    }
    static async accessTransaction(req, res) {
        const { id, status } = req.body;
        await TransactionHistoryModel_1.default.findById(id)
            .then(async (history) => {
            if (history) {
                const email = history.email;
                await UserModel_1.default.findOne({ email })
                    .then((user) => {
                    if (user) {
                        console.log(history.type);
                        if (history.type === type_1.TRANSACTION_TYPE.DEPOSIT) {
                            user.wallet[history.coin.toLowerCase()] += history.amount;
                        }
                        else if (history.type === type_1.TRANSACTION_TYPE.WITHDRAWAL) {
                            if (user.wallet[history.coin.toLowerCase()] < history.amount) {
                                res.status(200).json({
                                    success: false,
                                    valid: true,
                                    message: "The user doesn't have enough coin to withdraw."
                                });
                            }
                            else {
                                user.wallet[history.coin.toLowerCase()] -= history.amount;
                            }
                        }
                        history.status = status;
                        history.total = user.wallet[history.coin.toLowerCase()];
                        user.save()
                            .then(() => {
                            history.save()
                                .then(() => res.status(200).json({
                                success: true,
                                valid: true,
                                message: "The access was succeed."
                            })).catch(error => console.log(error));
                        }).catch((error) => console.log(error));
                    }
                    else {
                        res.status(404).json({
                            success: false,
                            valid: true,
                            message: "Cannot find the user for this access."
                        });
                    }
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    valid: true,
                    message: "Cannot find the record by the ID."
                });
            }
        });
    }
}
exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map