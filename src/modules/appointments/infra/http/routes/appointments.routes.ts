import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsController = new AppointmentsController();
const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated)

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
