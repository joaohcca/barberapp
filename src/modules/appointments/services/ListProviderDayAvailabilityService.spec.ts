
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the day availability of a providers', async () => {

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 8, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 5, 22, 10, 0, 0)
    })

    /* o month de date eu preciso fazer sentido pro TS
     * o month da rota precisa fazer sentido pro desenvolvedor
     *
     */

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      day: 22,
      month: 6,
      year: 2022
    })


    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: true },
      { hour: 10, available: false },
      { hour: 11, available: true },
    ]))

  });
});
