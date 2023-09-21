"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const TransactionController_1 = require("../controllers/TransactionController");
const router = express.Router();
router.get('/history', passport.authenticate('jwt', { session: false }), TransactionController_1.default.getHistory);
router.get('/history/deposit', passport.authenticate('jwt', { session: false }), TransactionController_1.default.getDepositHistory);
router.get('/history/withdrawal', passport.authenticate('jwt', { session: false }), TransactionController_1.default.getWithdrawalHistory);
router.post('/exchange', passport.authenticate('jwt', { session: false }), TransactionController_1.default.exchange);
router.post('/deposit', passport.authenticate('jwt', { session: false }), TransactionController_1.default.deposit);
router.post('/withdrawal', passport.authenticate('jwt', { session: false }), TransactionController_1.default.withdrawal);
router.post('/dashboard', passport.authenticate('jwt', { session: false }), TransactionController_1.default.dashboard);
exports.default = router;
//# sourceMappingURL=transaction.js.map