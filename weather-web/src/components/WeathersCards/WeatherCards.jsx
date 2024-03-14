import React from "react";
import styles from "./WeatherCards.module.scss";
import { useWeatherCards } from "../CustomHooks/useWeatherCards";

export const WeatherCards = ({ lon, lat }) => {
  const { weatherData, error, loading } = useWeatherCards({ lon, lat });

  console.log("Open Meteo data: ", weatherData);

  const renderWeatherContainers = () => {
    const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
    const containers = [];

    for (let i = 0; i < days.length; i++) {
      const startHourIndex = i * 24;
      const endHourIndex = (i + 1) * 24;

      const weatherHours = weatherData.hourly.precipitation_probability.slice(startHourIndex, endHourIndex);
      const temperatureHours = weatherData.hourly.temperature_2m.slice(startHourIndex, endHourIndex);

      const dayContainer = (
        <div key={i} className={styles.weatherHoursContainer}>
          <h3>{days[i]}</h3>
          {weatherHours.map((porcHora, index) => (
            <div key={index}>
              <p>Hour {index + 1}:</p>
              <p>Precipitation prob.: {porcHora}%</p>
              <p>Temperature: {temperatureHours[index]}ºC</p>
            </div>
          ))}
        </div>
      );

      containers.push(dayContainer);
    }

    return containers;
  };

  return (
    <>
      {loading && <h3>Loading...</h3>}
      {error && <h3>There has been an error</h3>}
      {weatherData && (
        <div className={styles.weatherGeneralContainer}>
          <h3>Precipitation probability next 7 days:</h3>
          <div className={styles.weatherDaysContainer}>
            {renderWeatherContainers()}
          </div>
        </div>
      )}
    </>
  );
};
