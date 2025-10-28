import { Test, TestingModule } from '@nestjs/testing';
import { WeatherPinModuleService } from './weather-pin-module.service';

describe('WeatherPinModuleService', () => {
  let service: WeatherPinModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherPinModuleService],
    }).compile();

    service = module.get<WeatherPinModuleService>(WeatherPinModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
