"use client"
import { useCallback } from "react"
import WeatherCard from "@/components/core/WeatherCard"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { getWeather } from './action'
import { useWeather } from "@/hooks/useWeather"

export default function WeatherNewsPage() {
  const { weatherData, parseWeatherData } = useWeather()

  const handleSearchSubmit = useCallback(async (formData: FormData) => {
    const city = formData.get('city') as string;
    const weather = await getWeather(city);
    if (weather) {
      parseWeatherData(weather);
    }
  }, [parseWeatherData]);


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-screen-xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Master Ji Live Dashboard</h1>
        </header>

        <div className="grid gap-8 md:grid-flow-col">
          <Card>
            <CardHeader>
              <CardTitle>How's the weather today?</CardTitle>
            </CardHeader>

            <CardContent>
              <form className="flex w-full items-center gap-4" action={handleSearchSubmit}>
                <Input type="search" placeholder="Search..." className="flex-1" name='city' aria-label="Enter city name" />
                <Button type="submit">
                  Get Weather
                </Button>
              </form>
            </CardContent>

            <CardContent>
              {weatherData && <WeatherCard weatherData={weatherData} />}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="xl:flex-row items-center justify-between gap-2">
              <CardTitle>What's happening around the world?</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}