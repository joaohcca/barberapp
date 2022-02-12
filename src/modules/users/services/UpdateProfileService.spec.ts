import AppError from '@shared/errors/AppError';
import usersRouter from '../infra/http/routes/users.routes';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update existing user data', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Tré',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('John Tré');
    expect(updatedUser.email).toBe('johntre@example.com');
  });
  it('should not be able to update non-existing user dataa', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(updateUserProfile.execute({
      user_id: user.email,
      name: 'John Tré',
      email: 'johntre@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the email to another user current email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    });

    await expect(updateUserProfile.execute({
      user_id: user.id,
      name: 'John Tré',
      email: 'johndoe@example.com',
    })).rejects.toBeInstanceOf(AppError);

  });
  it('should be able to update the user password', async () => {


    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Tré',
      oldPassword: '123456',
      password: '123123',
      email: 'johntre@example.com',
    });

    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the user password without providing the oldPassword', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(updateUserProfile.execute({
      user_id: user.id,
      name: 'John Tré',
      password: '123123',
      email: 'johntre@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the user password when providing the wrong oldPassword', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(updateUserProfile.execute({
      user_id: user.id,
      name: 'John Tré',
      oldPassword: '123444',
      password: '123123',
      email: 'johntre@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });
});
