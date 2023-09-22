import * as express from 'express';
import * as passport from 'passport';
import TradingBotController from '../controllers/TradingBotController';

const router: express.Router = express.Router();

router.get('/crypto-currency', TradingBotController.getCryptoCurrency);
router.get('/position', passport.authenticate('jwt', {session: false}), TradingBotController.getPosition);
router.post('/position', passport.authenticate('jwt', {session: false}), TradingBotController.openPosition);
router.put('/earn', passport.authenticate('jwt', {session: false}), TradingBotController.getEarning);

export default router;