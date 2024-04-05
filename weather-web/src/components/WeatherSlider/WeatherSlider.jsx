import React, { useState } from "react";
import styles from "./WeatherSlider.module.scss";
import { useWeatherCards } from "../CustomHooks/useWeatherCards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const WeatherSlider = ({ lon, lat }) => {
  const [currentDay, setCurrentDay] = useState(null);
  const { weatherData, error, loading } = useWeatherCards({ lon, lat });

  const fechaActual = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const days = Array.from({ length: 7 }, (_, i) => {
    const newDate = new Date(fechaActual);
    newDate.setDate(newDate.getDate() + i);
    return dayNames[newDate.getDay()];
  });

  const hours = Array.from({ length: 24 }, (_, i) => `Hour: ${i < 10 ? "0" + i : i}:00`);

  const handleDaySelect = (day) => {
    switch (day) {
      case 0:
        setCurrentDay({ index: 0, temperature: weatherData.hourly.temperature_2m.slice(0, 24), precipitation_prob: weatherData.hourly.precipitation_probability.slice(0, 24) });
        break;
      case 1:
        setCurrentDay({ index: 1, temperature: weatherData.hourly.temperature_2m.slice(24, 48), precipitation_prob: weatherData.hourly.precipitation_probability.slice(24, 48) });
        break;
      case 2:
        setCurrentDay({ index: 2, temperature: weatherData.hourly.temperature_2m.slice(48, 72), precipitation_prob: weatherData.hourly.precipitation_probability.slice(48, 72) });
        break;
      case 3:
        setCurrentDay({ index: 3, temperature: weatherData.hourly.temperature_2m.slice(72, 96), precipitation_prob: weatherData.hourly.precipitation_probability.slice(72, 96) });
        break;
      case 4:
        setCurrentDay({ index: 4, temperature: weatherData.hourly.temperature_2m.slice(96, 120), precipitation_prob: weatherData.hourly.precipitation_probability.slice(96, 120) });
        break;
      case 5:
        setCurrentDay({ index: 5, temperature: weatherData.hourly.temperature_2m.slice(120, 144), precipitation_prob: weatherData.hourly.precipitation_probability.slice(120, 144) });
        break;
      case 6:
        setCurrentDay({ index: 6, temperature: weatherData.hourly.temperature_2m.slice(144, 168), precipitation_prob: weatherData.hourly.precipitation_probability.slice(144, 168) });
        break;
      default:
        setCurrentDay(null);
    }
  };

  return (
    <>
      {loading && <h3>Loading...</h3>}
      {error && <h3>There has been an error</h3>}
      {weatherData && (
        <div className={styles.weatherGeneralContainer}>
          <h3>Precipitation probability next 7 days:</h3>
          <div className={styles.daysGeneralContainer}>
            {days.map((day, index) => (
              <h3
                className={currentDay?.index === index ? `${styles.dayItem} ${styles.daySelected}` : styles.dayItem}
                key={index}
                onClick={() => handleDaySelect(index)}
              >
                {day}
              </h3>
            ))}
          </div>
          <div className={styles.swiperCont}>
            <Swiper
              slidesPerView={1}
              loop={true}
              spaceBetween={40}
              centeredSlides={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className={styles.weatherSwiperGeneral}
            >
              {currentDay
                ? hours.map((hour, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                      <div className={styles.slideCont}>
                        <h4>{hour}</h4>
                        <p>Temperature: {currentDay.temperature[index]}ºC</p>
                        <p>Precipitation: {currentDay.precipitation_prob[index]}%</p>
                      </div>
                    </SwiperSlide>
                  ))
                : <SwiperSlide className={styles.swiperSlide}>Please select a day</SwiperSlide>}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};
