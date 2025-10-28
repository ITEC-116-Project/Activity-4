import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async fetchByCity(city: string) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new HttpException('OPENWEATHER_API_KEY not set', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city,
    )}&appid=${apiKey}&units=metric`;

    try {
      const resp = await firstValueFrom(this.httpService.get(url));
      return resp.data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Error fetching weather';
      throw new HttpException(msg, err.response?.status || HttpStatus.BAD_REQUEST);
    }
  }
}
