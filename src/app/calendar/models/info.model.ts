import { WeatherAPI } from './weather-api.model';

export class Info {
  title: string;
  time: string;
  color: string;
  description: string;
  city: string;
  id: number;
  monthDay: number;
  weather?: WeatherAPI;
  success?: boolean;
  error?: string;
}
