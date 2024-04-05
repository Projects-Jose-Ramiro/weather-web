import React from "react";
import styles from "./WeatherCards.module.scss";
import { useWeatherCards } from "../CustomHooks/useWeatherCards";
import sun from "../../assets/images/Sunny.jpg";
import cloud from "../../assets/images/Cloudy.jpg";
import fog from "../../assets/images/fog.png";
import rain from "../../assets/images/Rainy.jpg";
import snow from "../../assets/images/snow.jpg";
import storm from "../../assets/images/Stormy.jpg";
import clear from "../../assets/images/Clear.jpg";

export const WeatherCards = ({ lon, lat }) => {
  const { weatherData, error, loading } = useWeatherCards({ lon, lat });

function changeImageCard(weather) {

  let imagen = "";

  if (weather === 0 || weather === 1 || weather === 2 || weather === 3) {
    imagen = clear;
    return imagen;
  } else if(weather === 45 || weather === 48) {
    imagen = fog;
    return imagen;
  }else{
    imagen = storm;
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

  // console.log("Data:", weatherData);

  return (
    <>
      {loading && <h3>Loading...</h3>}
      {error && <h3>There has been an error</h3>}
      {weatherData && (
        <div className={styles.weatherGeneralContainer}>
          <div className={styles.daysCardsGeneralContainer}>
            {nextSixDays.map((day, index) => {
              const rutaImagen = changeImageCard(weatherData.daily.weather_code[index+1]);
              return (
                <div key={index} className={styles.dayCard}>
                  <h3 className={styles.dayTitle}>{day}</h3>
                  <img src={rutaImagen} alt="Weather image" />
                  <h5>Temperature:</h5>
                  <h5>
                    Min/Max:{" "}
                    {parseFloat(weatherData.daily.temperature_2m_min).toFixed(2)}{" "}
                    /{" "}
                    {parseFloat(weatherData.daily.temperature_2m_max).toFixed(2)}{" "}
                    ºC
                  </h5>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  );
};
