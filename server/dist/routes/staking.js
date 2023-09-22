"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const StakingController_1 = require("../controllers/StakingController");
const router = express.Router();
router.get('/list', passport.authenticate('jwt', { session: false }), StakingController_1.default.getPositions);
router.post('/create', passport.authenticate('jwt', { session: false }), StakingController_1.default.addPosition);
router.put('/ready', passport.authenticate('jwt', { session: false }), StakingController_1.default.setPositionReady);
router.put('/earn', passport.authenticate('jwt', { session: false }), StakingController_1.default.getMoney);
exports.default = router;
//# sourceMappingURL=staking.js.map