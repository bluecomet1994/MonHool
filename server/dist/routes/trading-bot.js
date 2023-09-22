"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const TradingBotController_1 = require("../controllers/TradingBotController");
const router = express.Router();
router.get('/position', passport.authenticate('jwt', { session: false }), TradingBotController_1.default.getPosition);
router.post('/position', passport.authenticate('jwt', { session: false }), TradingBotController_1.default.openPosition);
router.put('/earn', passport.authenticate('jwt', { session: false }), TradingBotController_1.default.getEarning);
exports.default = router;
//# sourceMappingURL=trading-bot.js.map