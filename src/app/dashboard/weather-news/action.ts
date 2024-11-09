"use server";
import axios from "axios";

const weatherAPIAppId = String(process.env.NEXT_PUBLIC_WEATHER_API_APPID);

export const getWeather = async (city: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPIAppId}`;
  try {
    const { data: apiResponse } = await axios.get(url);

    return apiResponse;
  } catch (error) {
    console.log(error);
  }
};
