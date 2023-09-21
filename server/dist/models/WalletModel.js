"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const WalletSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    btc: {
        type: Number,
        default: 0
    },
    eth: {
        type: Number,
        default: 0
    },
    usdt: {
        type: Number,
        default: 0
    },
    xrp: {
        type: Number,
        default: 0
    },
    sol: {
        type: Number,
        default: 0
    },
});
exports.default = mongoose.model('wallets', WalletSchema);
//# sourceMappingURL=WalletModel.js.map