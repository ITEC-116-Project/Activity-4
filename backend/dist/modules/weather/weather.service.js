"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let WeatherService = class WeatherService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async fetchByCity(city) {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        if (!apiKey) {
            throw new common_1.HttpException('OPENWEATHER_API_KEY not set', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        try {
            const resp = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            return resp.data;
        }
        catch (err) {
            const msg = err.response?.data?.message || 'Error fetching weather';
            throw new common_1.HttpException(msg, err.response?.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map