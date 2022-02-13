
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the month availability providers', async () => {

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 8, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 9, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 10, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 11, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 12, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 13, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 14, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 15, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 16, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 17, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 21, 8, 0, 0)
    })


    /* o month de date eu preciso fazer sentido pro TS
     * o month da rota precisa fazer sentido pro desenvolvedor
     *
     */

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user',
      month: 6,
      year: 2022
    })


    expect(availability).toEqual(expect.arrayContaining([
      { day: 22, available: false },
      { day: 21, available: true },
      { day: 23, available: true },
    ]))

  });
});
