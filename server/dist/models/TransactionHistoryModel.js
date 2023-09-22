"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const status_1 = require("../enums/status");
const TransactionHistorySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    status: {
        type: Number,
        default: status_1.TRANSACTION_STATUS.PENDING
    },
    coin: {
        type: String,
        required: true
    },
    isExchange: {
        type: Boolean,
        default: false
    },
    exchangeCoin: {
        type: String
    },
    amount: {
        type: Number,
        default: 0
    },
    usd: {
        type: Number,
        default: 0
    },
    total: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('transactionHistory', TransactionHistorySchema);
//# sourceMappingURL=TransactionHistoryModel.js.map