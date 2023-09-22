"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const UserModel_1 = require("../models/UserModel");
const TransactionHistoryModel_1 = require("../models/TransactionHistoryModel");
const status_1 = require("../enums/status");
const type_1 = require("../enums/type");
const StakingHistoryModel_1 = require("../models/StakingHistoryModel");
const TradingHistoryModel_1 = require("../models/TradingHistoryModel");
class TransactionController {
    static async dashboard(req, res) {
        const { username, email } = req.user;
        const { range } = req.body;
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - range);
        const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const futureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + range);
        let allEarning = [0, 0];
        let staking = [0, 0];
        let trading = [0, 0];
        await StakingHistoryModel_1.default.find({ email, date: { $gte: startDate, $lt: endDate } })
            .then(lastHistories => {
            lastHistories.map(history => {
                if (history.status === status_1.STAKING_STATUS.EARNED) {
                    staking[0] += history.usd;
                }
            });
        });
        await StakingHistoryModel_1.default.find({ email, date: { $gte: endDate, $lt: futureDate } })
            .then(histories => {
            histories.map(history => {
                if (history.status === status_1.STAKING_STATUS.EARNED) {
                    staking[1] += history.usd;
                }
            });
        });
        await TradingHistoryModel_1.default.find({ email, date: { $gte: startDate, $lt: endDate } })
            .then(lastHistories => {
            lastHistories.map(history => {
                if (history.status === status_1.TRADING_STATUS.EARNED) {
                    trading[0] += history.amount;
                }
            });
        });
        await TradingHistoryModel_1.default.find({ email, date: { $gte: endDate, $lt: futureDate } })
            .then(histories => {
            histories.map(history => {
                if (history.status === status_1.TRADING_STATUS.EARNED) {
                    trading[1] += history.amount;
                }
            });
        });
        allEarning[0] = staking[0] + trading[0];
        allEarning[1] = staking[1] + trading[1];
        res.status(200).json({
            success: true,
            valid: true,
            message: "Dashboard data loaded.",
            result: {
                allEarning,
                staking,
                trading
            }
        });
    }
    static async exchange(req, res) {
        const { username, email } = req.user;
        const { sendCoin, sendAmount, getCoin, getAmount } = req.body;
        await UserModel_1.default.findOne({ email })
            .then((user) => {
            if (user) {
                let updatedCoin = 0;
                let isAllowed = false;
                Object.keys(user.wallet).map(key => {
                    if (key === sendCoin.toLowerCase()) {
                        if (user.wallet[key] < sendAmount) {
                            res.status(200).json({
                                success: false,
                                valid: true,
                                message: "You do not have enough coin to exchange."
                            });
                        }
                        else {
                            user.wallet[key] -= sendAmount;
                            updatedCoin = user.wallet[key];
                            isAllowed = true;
                        }
                    }
                    if (key === getCoin.toLowerCase()) {
                        user.wallet[key] += getAmount;
                    }
                });
                if (isAllowed) {
                    user.save()
                        .then((user) => {
                        const newHistory = new TransactionHistoryModel_1.default({
                            username,
                            email,
                            type: 0,
                            status: 1,
                            coin: sendCoin,
                            isExchange: true,
                            exchangeCoin: getCoin,
                            total: updatedCoin
                        });
                        newHistory.save().then(() => {
                            res.status(200).json({
                                success: true,
                                valid: true,
                                message: "Successfully exchanged.",
                                user: _.pick(user, ['username', 'email', 'wallet', 'date'])
                            });
                        });
                    })
                        .catch((error) => {
                        console.log(error);
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
    static async deposit(req, res) {
        const { username, email } = req.user;
        const { coin, amount, usd, hash } = req.body;
        await UserModel_1.default.findOne({ email })
            .then(user => {
            if (user) {
                const newDepositHistory = new TransactionHistoryModel_1.default({
                    username,
                    email,
                    type: 1,
                    address: hash,
                    coin,
                    amount,
                    usd: usd > 100 ? usd + 25 : usd
                });
                newDepositHistory.save()
                    .then(() => {
                    res.status(200).json({
                        success: true,
                        valid: true,
                        message: "You successfully requested the deposit."
                    });
                })
                    .catch((error) => console.log(error));
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
    static async withdrawal(req, res) {
        const { username, email } = req.user;
        const { coin, amount, usd, address } = req.body;
        await UserModel_1.default.findOne({ email })
            .then((user) => {
            if (user) {
                if (user.wallet[coin.toLowerCase()] < amount) {
                    res.status(200).json({
                        success: false,
                        valid: true,
                        message: "You do not have enough coin to exchange."
                    });
                }
                else {
                    const newWithdrawalHistory = new TransactionHistoryModel_1.default({
                        username,
                        email,
                        type: 2,
                        address,
                        coin,
                        amount,
                        usd
                    });
                    newWithdrawalHistory.save()
                        .then(() => {
                        res.status(200).json({
                            success: true,
                            valid: true,
                            message: "You successfully requested the withdrawal."
                        });
                    })
                        .catch((error) => console.log(error));
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
    static async getHistory(req, res) {
        const { email } = req.user;
        await TransactionHistoryModel_1.default.find({ email, status: status_1.TRANSACTION_STATUS.SUCCESS }).sort({ date: -1 })
            .then(history => {
            res.status(200).json({
                success: true,
                valid: true,
                history
            });
        });
    }
    static async getDepositHistory(req, res) {
        const { email } = req.user;
        await TransactionHistoryModel_1.default.find({ email, type: type_1.TRANSACTION_TYPE.DEPOSIT }).sort({ date: -1 })
            .then(history => {
            res.status(200).json({
                success: true,
                valid: true,
                history
            });
        });
    }
    static async getWithdrawalHistory(req, res) {
        const { email } = req.user;
        await TransactionHistoryModel_1.default.find({ email, type: type_1.TRANSACTION_TYPE.WITHDRAWAL }).sort({ date: -1 })
            .then(history => {
            res.status(200).json({
                success: true,
                valid: true,
                history
            });
        });
    }
}
exports.default = TransactionController;
//# sourceMappingURL=TransactionController.js.map