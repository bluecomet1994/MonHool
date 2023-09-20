import * as express from 'express';
import * as passport from 'passport';
import StakingController from '../controllers/StakingController';

const router: express.Router = express.Router();

router.get('/list', passport.authenticate('jwt', {session: false}), StakingController.getPositions);
router.post('/create', passport.authenticate('jwt', {session: false}), StakingController.addPosition);
router.put('/ready', passport.authenticate('jwt', {session: false}), StakingController.setPositionReady);
router.put('/earn', passport.authenticate('jwt', {session: false}), StakingController.getMoney);

export default router;