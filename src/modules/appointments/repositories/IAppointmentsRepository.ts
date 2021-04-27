import Appointment from '../infra/typeorm/entities/Appointment';

export default interface AppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
};
