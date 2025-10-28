import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherPin } from '../../typeorm/entities/weather.entity';
import { WeatherPinService } from './weather-pin-module.service';
import { WeatherPinController } from './weather-pin-module.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherPin])],
  providers: [WeatherPinService],
  controllers: [WeatherPinController],
})
export class WeatherPinModule {}