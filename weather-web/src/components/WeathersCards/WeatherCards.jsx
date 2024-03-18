import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import styles from "./WeatherCards.module.scss";
import { useWeatherCards } from "../CustomHooks/useWeatherCards";

export const WeatherCards = ({ lon, lat }) => {
  const { weatherData, error, loading } = useWeatherCards({ lon, lat });

  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

  return (
    <>
      {loading && <h3>Loading...</h3>}
      {error && <h3>There has been an error</h3>}
      {weatherData && (
        <div className={styles.weatherGeneralContainer}>
          <h3>Precipitation probability next 7 days:</h3>
          {/* <div className={styles.swiper_container}> */}
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            className={styles.swiper}
            spaceBetween={10}
            slidesPerView={3}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }} // Detener autoplay al interactuar
          >
            {days.map((day, index) => {
              const startHourIndex = index * 24;
              const endHourIndex = (index + 1) * 24;
              const weatherHours =
                weatherData.hourly.precipitation_probability.slice(
                  startHourIndex,
                  endHourIndex
                );
              const temperatureHours = weatherData.hourly.temperature_2m.slice(
                startHourIndex,
                endHourIndex
              );

              return (
                <SwiperSlide key={index} className={styles.swiper_slide}>
                  <div className={styles.weatherHoursContainer}>
                    <h3>{day}</h3>
                    {weatherHours.map((porcHora, hourIndex) => (
                      <div key={hourIndex} className={styles.weather_container}>
                        <p>Hour {hourIndex + 1}:</p>
                        <p>Precipitation prob.: {porcHora}%</p>
                        <p>Temperature: {temperatureHours[hourIndex]}ºC</p>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* </div> */}
        </div>
      )}
    </>
  );
};
