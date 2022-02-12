import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let listProvidersService: ListProvidersService;
let createUserService: CreateUserService


describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
    );
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to list the providers', async () => {

    const LoggedUser = await createUserService.execute({
      name: 'John Un',
      email: 'johnun@example.com',
      password: '123123',
    });

    const user1 = await createUserService.execute({
      name: 'John Du',
      email: 'johndu@example.com',
      password: '123456',
    });

    const user2 = await createUserService.execute({
      name: 'John Troia',
      email: 'johntroa@example.com',
      password: '123456789',
    });

    const providers = await listProvidersService.execute({ user_id: LoggedUser.id })
    expect(providers).toEqual([user1, user2]);
  });
});
