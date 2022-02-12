import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const appointmentsRouter = Router();
const providersController = new ProvidersController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', providersController.list);

export default appointmentsRouter;
