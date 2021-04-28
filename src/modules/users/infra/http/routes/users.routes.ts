import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const UserRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);
UserRouter.post('/', usersController.create);

UserRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default UserRouter;
