import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/appError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  name: string,
  email: string,
  password: string,
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const checkUsersExists = await this.usersRepository.findByEmail(email)

    if (checkUsersExists) {
      throw new AppError('Email already used.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
export default CreateUserService
