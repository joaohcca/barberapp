import { injectable, inject } from 'tsyringe';
import {
  getHours, getDate, getYear,
  getDaysInMonth
} from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {
    /**a ideia é puxar os appointmenys do banco, fazer uma lógica e depois devolver a availability do dia especifico*/
    const appointmentsDayFromProvider = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id, day, month, year
    })
    /**falta criar o array e devolver */
    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 }, (_, index) => index + hourStart)


    const availability = eachHourArray.map(hour => {

      const hasAppointmentInHour = appointmentsDayFromProvider.find(appointment =>
        getHours(appointment.date) === hour
      )

      return {
        hour,
        available: !hasAppointmentInHour,
      }
    })

    return availability
  }
}
export default ListProviderDayAvailabilityService
