import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const UserRouter = Router();


UserRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    
    const createUser = new CreateUserService();
    
    const user = await createUser.execute({
        name,
        email,
        password,
    });

    const noPassUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
    
    return response.json(noPassUser);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default UserRouter;
