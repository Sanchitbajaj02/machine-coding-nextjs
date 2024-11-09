export type WeatherObject = {
  location: string;
  temperature: number;
  feelsLike: number;
  seaLevel: number;
  windSpeed: number;
  humidity: number;
  conditionName: string;
  condition: JSX.Element;
  sunrise: string;
  sunset: string;
};

export interface WeatherResponse {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    sea_level: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    main: string;
  }>;
}
