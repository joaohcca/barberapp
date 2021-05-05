import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService'
describe('CreateAppointment', () => {
  it('it should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository,);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');

  });

  // it('it should be able to create a new appointment', () => {
  //   expect('1+1').toBe(3);
  // });
})
