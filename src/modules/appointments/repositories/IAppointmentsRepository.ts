import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '../dtos/ICreateAppointmentsDTO'
export default interface AppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
};
