import {IsNotEmpty } from "class-validator";

export class SearchWeatherDto {

  @IsNotEmpty({ message: "city should not be empty" })
  city: string;
}