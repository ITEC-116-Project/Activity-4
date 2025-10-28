import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherPin } from '../../typeorm/entities/weather.entity';

@Injectable()
export class WeatherPinService {
  constructor(
    @InjectRepository(WeatherPin)
    private readonly pinRepo: Repository<WeatherPin>,
  ) {}

  async getPin() {
    const pin = await this.pinRepo.findOne({ order: { createdAt: 'DESC' } });
    return pin || null; // safe default
  }

  async savePin(data: any) {
    await this.pinRepo.clear(); // only one pin allowed
    const pin = this.pinRepo.create({ city: data.city, data });
    return this.pinRepo.save(pin);
  }

  async removePin() {
    return this.pinRepo.clear();
  }
}
