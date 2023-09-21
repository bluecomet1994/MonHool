import * as express from 'express';
import user from './user';
import transaction from './transaction';
import staking from './staking';
import tradingBot from './trading-bot';
import admin from './admin';

const router: express.Router = express.Router();

router.use('/user', user);
router.use('/transaction', transaction);
router.use('/staking', staking);
router.use('/trading', tradingBot);
router.use('/admin', admin);

export default router;