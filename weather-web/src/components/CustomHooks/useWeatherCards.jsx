import { useState, useEffect } from 'react';

export function useWeatherCards({ lat, lon }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m&hourly=weather_code,temperature_2m,precipitation_probability,rain,visibility,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,daylight_duration,precipitation_sum&timezone=auto&forecast_days=7`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  return { weatherData, error, loading };
}
