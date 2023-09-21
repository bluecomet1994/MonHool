"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("./user");
const transaction_1 = require("./transaction");
const staking_1 = require("./staking");
const trading_bot_1 = require("./trading-bot");
const admin_1 = require("./admin");
const router = express.Router();
router.use('/user', user_1.default);
router.use('/transaction', transaction_1.default);
router.use('/staking', staking_1.default);
router.use('/trading', trading_bot_1.default);
router.use('/admin', admin_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map