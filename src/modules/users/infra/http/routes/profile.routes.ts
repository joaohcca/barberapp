import { Router } from 'express';


import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileController = new ProfileController();
const profileRouter = Router();

profileRouter.use(ensureAuthenticated)

profileRouter.get(
  '/',
  profileController.show
);

profileRouter.patch(
  '/',
  profileController.update,
);
export default profileRouter;
