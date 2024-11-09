"use client";

import { useState, useCallback } from "react";
import dayjs from "dayjs";
import { Cloud, Sun, Haze, CloudRain, CloudFog } from "lucide-react";
import { WeatherObject, WeatherResponse } from "@/types/weather";

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherObject | null>(null);

  const parseWeatherData = useCallback((weatherData: WeatherResponse) => {
    const getWeatherIcon = (condition: string) => {
      switch (condition) {
        case "Clear":
          return <Sun className="h-20 w-20 text-amber-400" />;
        case "Clouds":
          return <Cloud className="h-20 w-20 text-gray-200" />;
        case "Rain":
          return <CloudRain className="h-20 w-20 text-blue-200" />;
        case "Haze":
          return <Haze className="h-20 w-20 text-gray-400" />;
        case "Fog":
          return <CloudFog className="h-20 w-20 text-gray-400" />;
        default:
          return <Sun className="h-20 w-20 text-amber-400" />;
      }
    };

    const weatherObject: WeatherObject = {
      location: `${weatherData?.name}, ${weatherData?.sys?.country}`,
      temperature: weatherData?.main?.temp,
      feelsLike: weatherData?.main?.feels_like,
      seaLevel: weatherData?.main?.sea_level,
      windSpeed: weatherData?.wind?.speed,
      humidity: weatherData?.main?.humidity,
      conditionName: weatherData?.weather[0]?.main,
      condition: getWeatherIcon(weatherData?.weather[0]?.main),
      sunrise: dayjs(new Date(weatherData?.sys?.sunrise * 1000)).format("hh:mm:ss A"),
      sunset: dayjs(new Date(weatherData?.sys?.sunset * 1000)).format("hh:mm:ss A"),
    };

    setWeatherData(weatherObject);
  }, []);

  return {
    weatherData,
    parseWeatherData,
  };
};
