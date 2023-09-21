"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const AdminController_1 = require("../controllers/AdminController");
const router = express.Router();
router.get('/deposit', passport.authenticate('jwt', { session: false }), AdminController_1.default.getDepositRequests);
router.get('/withdrawal', passport.authenticate('jwt', { session: false }), AdminController_1.default.getWithdrawalRequests);
router.put('/access-request', passport.authenticate('jwt', { session: false }), AdminController_1.default.accessTransaction);
exports.default = router;
//# sourceMappingURL=admin.js.map