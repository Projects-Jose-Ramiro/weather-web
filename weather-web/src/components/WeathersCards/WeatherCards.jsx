import React from "react";
import { useState } from "react";
import styles from "./WeatherCards.module.scss";
import { useWeatherCards } from "../CustomHooks/useWeatherCards";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const WeatherCards = ({ lon, lat }) => {
  const [currentDay, setCurrentDay] = useState(null);
  const { weatherData, error, loading } = useWeatherCards({ lon, lat });

  const fechaActual = new Date();
  const days = [];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i = 0; i < 7; i++) {
    // Clone the current date so as not to modify it
    const newDate = new Date(fechaActual);
    // Adds i days to the cloned date
    newDate.setDate(newDate.getDate() + i);
    // Gets the day of the week and adds it to the array using the corresponding name
    days.push(dayNames[newDate.getDay()]);
  }

  const hours = [
    "00:00 am",
    "01:00 am",
    "02:00 am",
    "03:00 am",
    "04:00 am",
    "05:00 am",
    "06:00 am",
    "07:00 am",
    "08:00 am",
    "09:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "13:00 pm",
    "14:00 pm",
    "15:00 pm",
    "16:00 pm",
    "17:00 pm",
    "18:00 pm",
    "19:00 pm",
    "20:00 pm",
    "21:00 pm",
    "22:00 pm",
    "23:00 pm",
  ];

  console.log('Current day', currentDay);
  console.log('Data', weatherData);


  const handleDaySelect = (day) => {
    switch (day) {
      case 0:
        setCurrentDay({index: 0, temperature: weatherData.hourly.temperature_2m.slice(0, 24), precipitation_prob: weatherData.hourly.precipitation_probability.slice(0, 24)})
      break;
      case 1:
        setCurrentDay({index: 1, temperature: weatherData.hourly.temperature_2m.slice(24, 48), precipitation_prob: weatherData.hourly.precipitation_probability.slice(24, 48)})
      break;
      case 2:
        setCurrentDay({index: 2, temperature: weatherData.hourly.temperature_2m.slice(48, 72), precipitation_prob: weatherData.hourly.precipitation_probability.slice(48, 72)})
      break;
      case 3:
        setCurrentDay({index: 3, temperature: weatherData.hourly.temperature_2m.slice(72, 96), precipitation_prob: weatherData.hourly.precipitation_probability.slice(72, 96)})
      break;
      case 4:
        setCurrentDay({index: 4, temperature: weatherData.hourly.temperature_2m.slice(96, 120), precipitation_prob: weatherData.hourly.precipitation_probability.slice(96, 120)})
      break;
      case 5:
        setCurrentDay({index: 5, temperature: weatherData.hourly.temperature_2m.slice(120, 144), precipitation_prob: weatherData.hourly.precipitation_probability.slice(120, 144)})
      break;
      case 6:
        setCurrentDay({index: 6,temperature: weatherData.hourly.temperature_2m.slice(144, 168), precipitation_prob: weatherData.hourly.precipitation_probability.slice(144, 168)})
      break;
    }
  }

  return (
    <>
      {loading && <h3>Loading...</h3>}
      {error && <h3>There has been an error</h3>}
      {weatherData && (
        <div className={styles.weatherGeneralContainer}>
          <h3>Precipitation probability next 7 days:</h3>
          <div className={styles.daysGeneralContainer}>
            {days && days.map((day, index) => {
              return (<h3 className={currentDay.index === index ? `${styles.dayItem} ${styles.daySelected}` : styles.dayItem} key={index} onClick={() => handleDaySelect(index)}>{day}</h3>)
            })}
          </div>
          <div className={styles.swiperCont}>
            <Swiper
              slidesPerView={1}
              loop={true}
              spaceBetween={40}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className={styles.weatherSwiperGeneral}
            >{currentDay ? hours.map((hour, index) => {
              return (
                <SwiperSlide className={styles.swiperSlide}><div><h4>{hour}</h4><p>Temperature: {currentDay.temperature[index]}ºC</p><p>Precipitation: {currentDay.precipitation_prob[index]}%</p></div></SwiperSlide>
              )
            }) : <SwiperSlide className={styles.swiperSlide}>Please select a day</SwiperSlide>}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};
