import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config'; // ✅ only if you really have this file
import { WeatherModule } from './modules/weather/weather.module'; // ✅ your weather feature module

@Module({
  imports: [
    // ✅ loads environment variables from .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ include your database config (optional, only if you made it)
    DatabaseConfig,

    // ✅ weather feature (controller + service)
    WeatherModule,
  ],
})
export class AppModule {}
