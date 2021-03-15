import { request, response, Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const UserRouter = Router();
const upload = multer(uploadConfig)

UserRouter.post('/', async (request, response) => {
  
    const { name, email, password } = request.body;
    
    const createUser = new CreateUserService();
    
    let user = await createUser.execute({
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
    
    return response.json(user);
  
});

UserRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  
    const updateUserAvatar = new UpdateUserAvatarService();

   const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    const noPassUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
    return response.json(user) 

})
export default UserRouter;
