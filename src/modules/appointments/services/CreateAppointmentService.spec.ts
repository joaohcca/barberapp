import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 2, 17, 12).getTime()
    })
    const appointment = await createAppointment.execute({
      date: new Date(2020, 2, 17, 13),
      user_id: '123456',
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });
  it('should not be able to create two appointments at the same time with the same provider', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 2, 17, 12).getTime()
    })

    await createAppointment.execute({
      date: new Date(2020, 2, 17, 13),
      user_id: '123456',
      provider_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 2, 17, 13),
        user_id: '123456',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 2, 17, 12).getTime()
    })
    await expect(createAppointment.execute({
      date: new Date(2020, 2, 17, 11),
      user_id: '123456',
      provider_id: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 2, 17, 12).getTime()
    })
    await expect(createAppointment.execute({
      date: new Date(2020, 2, 17, 13),
      user_id: '123456',
      provider_id: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment outside working hours interval 8-17', async () => {

    await expect(createAppointment.execute({
      date: new Date(2020, 2, 17, 7),
      user_id: '123456',
      provider_id: '1234567',
    })).rejects.toBeInstanceOf(AppError);
  });

});
