import * as express from 'express';
import * as passport from 'passport';
import AdminController from '../controllers/AdminController';

const router: express.Router = express.Router();

router.get('/deposit', passport.authenticate('jwt', {session: false}), AdminController.getDepositRequests);
router.get('/withdrawal', passport.authenticate('jwt', {session: false}), AdminController.getWithdrawalRequests);
router.put('/access-request', passport.authenticate('jwt', {session: false}), AdminController.accessTransaction);

export default router;