import { Test, TestingModule } from '@nestjs/testing';
import { WeatherPinModuleController } from './weather-pin-module.controller';

describe('WeatherPinModuleController', () => {
  let controller: WeatherPinModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherPinModuleController],
    }).compile();

    controller = module.get<WeatherPinModuleController>(WeatherPinModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
