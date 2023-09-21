import * as express from 'express';
import * as passport from 'passport';
import TransactionController from '../controllers/TransactionController';

const router: express.Router = express.Router();

router.get('/history', passport.authenticate('jwt', { session: false }), TransactionController.getHistory);
router.get('/history/deposit', passport.authenticate('jwt', { session: false }), TransactionController.getDepositHistory);
router.get('/history/withdrawal', passport.authenticate('jwt', { session: false }), TransactionController.getWithdrawalHistory);
router.post('/exchange', passport.authenticate('jwt', { session: false }), TransactionController.exchange);
router.post('/deposit', passport.authenticate('jwt', { session: false }), TransactionController.deposit);
router.post('/withdrawal', passport.authenticate('jwt', { session: false }), TransactionController.withdrawal);
router.post('/dashboard', passport.authenticate('jwt', { session: false }), TransactionController.dashboard);

export default router;