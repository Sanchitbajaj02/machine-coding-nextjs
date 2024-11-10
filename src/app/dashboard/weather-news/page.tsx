"use client";
import { useCallback, useState, useEffect } from "react";
import WeatherCard from "@/components/core/WeatherCard";
import NewsCard from "@/components/core/NewsCard";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { getWeather, getNewsData } from "./action";
import { useWeather } from "@/hooks/useWeather";

import { List, Grid3X3, Loader2 } from "lucide-react";
import { NewsObject } from "@/types/news";

export default function WeatherNewsPage() {
  const { weatherData, parseWeatherData } = useWeather();

  const [currentNewsView, setCurrentNewsView] = useState<boolean>(true);
  const [newsData, setNewsData] = useState<NewsObject[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSearchSubmit = useCallback(
    async (formData: FormData) => {
      const city = formData.get("city") as string;
      const weather = await getWeather(city);
      if (weather) {
        parseWeatherData(weather);
      }
    },
    [parseWeatherData],
  );

  const fetchNews = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getNewsData();

      if (response) {
        setNewsData(response["World"] || []);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();

    return () => setNewsData([]);
  }, [fetchNews]);

  return (
    <div className="min-h-screen p-8">
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
                <Input
                  type="search"
                  placeholder="Search..."
                  className="flex-1"
                  name="city"
                  aria-label="Enter city name"
                />
                <Button type="submit">Get Weather</Button>
              </form>
            </CardContent>

            <CardContent>{weatherData && <WeatherCard weatherData={weatherData} />}</CardContent>
          </Card>

          <Card>
            <CardHeader className="xl:flex-row items-center justify-between gap-2">
              <CardTitle>What's happening around the world?</CardTitle>

              <div className="flex space-x-2">
                <Label htmlFor="news-grid-toggle" className="flex items-center">
                  <List className="mr-2 w-4 h-4" />
                  <span className="text-lg font-medium">List view</span>
                </Label>

                <Switch
                  id="news-grid-toggle"
                  className=""
                  checked={currentNewsView}
                  onCheckedChange={(checked) => setCurrentNewsView(checked)}
                />

                <Label htmlFor="news-grid-toggle" className="flex items-center">
                  <Grid3X3 className="mr-2 w-4 h-4" />
                  <span className="text-lg font-medium">Grid view</span>
                </Label>
              </div>
            </CardHeader>

            {isLoading ? (
              <CardContent className="flex flex-row justify-center items-center">
                <Loader2 size={40} className="animate-spin" />
              </CardContent>
            ) : (
              <CardContent>
                {newsData && newsData.length > 0 && (
                  <NewsCard newsData={newsData} isGridView={currentNewsView} />
                )}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
