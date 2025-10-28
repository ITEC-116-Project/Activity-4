import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { WeatherPinService } from './weather-pin-module.service';

@Controller('api/weather-pin')
export class WeatherPinController {
  constructor(private readonly weatherPinService: WeatherPinService) {}

  @Get()
  getPin() {
    return this.weatherPinService.getPin();
  }

  @Post()
  savePin(@Body() data: any) {
    return this.weatherPinService.savePin(data);
  }

  @Delete()
  removePin() {
    return this.weatherPinService.removePin();
  }
}
