import { v4 } from 'uuid';
import { isEqual } from 'date-fns';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../../infra/typeorm/entities/Appointment';
import { uuid } from 'uuidv4';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id })
    this.appointments.push(appointment);

    return appointment
  }
}

export default AppointmentsRepository;
