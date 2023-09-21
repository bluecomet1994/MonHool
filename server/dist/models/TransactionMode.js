"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
    type: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    coin: {
        type: String,
        required: true
    },
    isExchange: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number || String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('transactions', TransactionSchema);
//# sourceMappingURL=TransactionMode.js.map