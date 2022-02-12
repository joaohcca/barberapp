import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  oldPassword?: string
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ user_id, name, email, password, oldPassword }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && user_id !== userWithUpdatedEmail.id) {
      throw new AppError('Email already used by another user');
    }

    user.name = name
    user.email = email

    //verify if oldPassword is provided in case of a password update
    if (password && !oldPassword) {
      throw new AppError(
        'You should inform oldPassword to set a new one'
      );
    }

    if (password && oldPassword) {

      const checkOldPassword = await this.hashProvider.compareHash(oldPassword, user.password)

      if (!checkOldPassword) {
        throw new AppError('please inform correct password')
      }

      user.password = await this.hashProvider.generateHash(password);

    }

    return this.usersRepository.save(user);

  }
}
export default UpdateProfileService
