"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const status_1 = require("../enums/status");
const StakingHistorySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    coin: {
        type: String,
        required: true
    },
    deposit: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    earning: {
        type: Number,
        required: true
    },
    usd: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: status_1.STAKING_STATUS.PROGRESS
    },
    date: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('stakinghistories', StakingHistorySchema);
//# sourceMappingURL=StakingHistoryModel.js.map