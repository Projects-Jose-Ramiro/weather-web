import React from "react";
import styles from "./WeatherCards.module.scss";
import { useWeatherCards } from "../CustomHooks/useWeatherCards";

export const WeatherCards = ({ lon, lat }) => {
  const { weatherData, error, loading } = useWeatherCards({ lon, lat });

  const fechaActual = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const days = Array.from({ length: 7 }, (_, i) => {
    const newDate = new Date(fechaActual);
    newDate.setDate(newDate.getDate() + i);
    return dayNames[newDate.getDay()];
  });

  const nextSixDays = days.filter(
    (day, index) => index !== 0 && index <= 6 && day !== dayNames[fechaActual.getDay()]
  );

  console.log('Data:', weatherData);

  return (
    <>
      {loading && <h3>Loading...</h3>}
      {error && <h3>There has been an error</h3>}
      {weatherData && (
        <div className={styles.weatherGeneralContainer}>
          
          <div className={styles.daysCardsGeneralContainer}>
            {nextSixDays.map((day, index) => (
              <div key={index} className={styles.dayCard}>
                <h3 className={styles.dayTitle}>{day}</h3>
                <h5>Image</h5>
                <h5>Temperature:</h5>
                <h5>Min/Max: {parseFloat(weatherData.daily.temperature_2m_min).toFixed(2)} / {parseFloat(weatherData.daily.temperature_2m_max).toFixed(2)} ºC</h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
