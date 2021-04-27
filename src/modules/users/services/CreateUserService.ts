import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/appError'

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
    private usersRepository: IUsersRepository
    ,) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const checkUsersExists = await this.usersRepository.findByEmail(email)

    if (checkUsersExists) {
      throw new AppError('Email already used.')
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
export default CreateUserService
