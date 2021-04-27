import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, OneToMany, ManyToOne, JoinColumn
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
/**
 * One to One => Relação limitada a um pra um
 * One to Many => Relação de um usuário para multiplos agendamentos
 * Many to Many =>  
 * Many to One =>
 */

// 

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /* constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  } */
}

export default Appointment;
