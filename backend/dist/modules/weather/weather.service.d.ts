import { HttpService } from '@nestjs/axios';
export declare class WeatherService {
    private readonly httpService;
    constructor(httpService: HttpService);
    fetchByCity(city: string): Promise<any>;
}
