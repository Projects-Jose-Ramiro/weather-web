import React from "react";
import styles from "./WeatherCards.module.scss";
import { useWeatherCards } from "../CustomHooks/useWeatherCards";
import sun from "../../assets/icons/sun.png";
import cloud from "../../assets/icons/cloud.png";
import fog from "../../assets/icons/fog.png";
import rain from "../../assets/icons/rain.png";
import snow from "../../assets/icons/snow.png";
import storm from "../../assets/icons/storm.png";

export const WeatherCards = ({ lon, lat }) => {
  const { weatherData, error, loading } = useWeatherCards({ lon, lat });

  function changeImageCard(weather) {
    let imagen = "";

    if (weather === 1 || weather === 2 || weather === 3) {
      imagen = cloud;
      return imagen;
    } else if (weather === 45 || weather === 48) {
      imagen = fog;
      return imagen;
    } else if (
      weather === 85 ||
      weather === 86 ||
      weather === 77 ||
      weather === 71 ||
      weather === 75 ||
      weather === 73
    ) {
      imagen = snow;
      return imagen;
    } else if (
      weather === 80 ||
      weather === 81 ||
      weather === 82 ||
      weather === 61 ||
      weather === 65 ||
      weather === 63 ||
      weather === 66 ||
      weather === 67
    ) {
      imagen = rain;
      return imagen;
    } else if (weather === 96 || weather === 95 || weather === 99) {
      imagen = storm;
      return imagen;
    } else {
      imagen = sun;
      return imagen;
    }
  }

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
    (day, index) =>
      index !== 0 && index <= 6 && day !== dayNames[fechaActual.getDay()]
  );

  return (
    <>
      {loading && <h3>Loading...</h3>}
      {error && <h3>There has been an error</h3>}
      {weatherData && (
        <div className={styles.weatherGeneralContainer}>
          <div className={styles.daysCardsGeneralContainer}>
            {nextSixDays.map((day, index) => {
              const rutaImagen = changeImageCard(
                weatherData.daily.weather_code[index + 1]
              );
              return (
                <div key={index} className={styles.dayCard}>
                  <h3 className={styles.dayTitle}>{day}</h3>
                  <img src={rutaImagen} alt="Weather image" />
                  <h5>Temperature:</h5>
                  <h5>
                    Min:{" "}
                    {parseFloat(weatherData.daily.temperature_2m_min).toFixed(
                      2
                    )}{" "}
                    ºC
                  </h5>
                  <h5>
                    Max:{" "}
                    {parseFloat(weatherData.daily.temperature_2m_max).toFixed(
                      2
                    )}{" "}
                    ºC
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
