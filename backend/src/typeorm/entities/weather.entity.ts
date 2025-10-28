import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'weather_pins' })
export class WeatherPin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column({ type: 'json', nullable: true })
  data: any;

  @CreateDateColumn()
  createdAt: Date;
}