import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherObject } from "@/types/weather";

export default function WeatherCard({ weatherData }: { weatherData: WeatherObject }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 pt-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{weatherData?.location}</h2>
          <p className="text-lg text-neutral-500">{weatherData?.conditionName}</p>
        </div>

        <div className="text-6xl">{weatherData?.condition}</div>
      </CardContent>

      <CardContent className="grid grid-cols-2 gap-4 pt-4">
        <div className="shadow rounded text-center p-4">
          <p className="text-2xl font-bold mb-1">{weatherData?.temperature}°C</p>
          <p className="text-base text-neutral-500">Current temperature</p>
        </div>

        <div className="shadow rounded text-center p-4">
          <p className="text-2xl font-bold mb-1">{weatherData?.temperature}°C</p>
          <p className="text-base text-neutral-500">Feels like</p>
        </div>

        <div className="shadow rounded text-center p-4">
          <p className="text-2xl font-bold mb-1">{weatherData?.humidity}%</p>
          <p className="text-base text-neutral-500">Humidity</p>
        </div>

        <div className="shadow rounded text-center p-4">
          <p className="text-2xl font-bold mb-1">{weatherData?.windSpeed} m/s</p>
          <p className="text-base text-neutral-500">Wind Speed</p>
        </div>
      </CardContent>

      <CardContent className="text-center pt-4">
        <p className="text-lg">
          <strong>Sunrise:</strong> {weatherData?.sunrise}
        </p>
        <p className="text-lg">
          <strong>Sunset:</strong> {weatherData?.sunset}
        </p>
      </CardContent>
    </Card>
  );
}
