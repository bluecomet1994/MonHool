import * as express from 'express';
import * as passport from 'passport';
import TransactionController from '../controllers/TransactionController';

const router: express.Router = express.Router();

router.post('/exchange', passport.authenticate('jwt', { session: false }), TransactionController.exchange);
router.post('/deposit', passport.authenticate('jwt', { session: false }), TransactionController.deposit);
router.post('/withdrawal', passport.authenticate('jwt', { session: false }), TransactionController.withdrawal);

export default router;