"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const status_1 = require("../enums/status");
const TradingHistorySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    hit: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: status_1.TRADING_STATUS.OPENED
    },
    date: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('tradinghistories', TradingHistorySchema);
//# sourceMappingURL=TradingHistoryModel.js.map