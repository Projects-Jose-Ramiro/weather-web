import { useState } from "react";
import { FetchWeather } from "../FetchWeather/FetchWeather";
import styles from "./CityInput.module.scss";
import { WeatherCards } from "../WeathersCards/WeatherCards";

export const CityInput = () => {
  const [cityInput, setCityInput] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [control, setControl] = useState(false);
  const [coords, setCoords] = useState({ longitud: "", latitud: "" });

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };
  const handleInputReset = () => {
    setCityInput("");
    setIsSubmited(false);
    setControl(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentCity(cityInput);
    setIsSubmited(true);
    setCityInput("");
  };

  const handleShowMoreInfo = (data) => {
    setControl(true);
    setCoords({ longitud: data.coord.lon, latitud: data.coord.lat });
  };

  return (
    <>
      <div className={styles.appContainer}>
        <h1>Weather web</h1>

        <div className={styles.inputInfoContainer}>
          <form
            className={styles.cityInputContainer}
            onSubmit={handleFormSubmit}
          >
            <h2>Select the city</h2>
            <div className={styles.inputBtns}>
              <input
                className={styles.inputText}
                type="text"
                name="city"
                value={cityInput}
                onChange={handleInputChange}
              />
              <button className={styles.inputButton} type="submit">
                Submit
              </button>
              <button
                className={styles.inputButton}
                type="button"
                onClick={handleInputReset}
              >
                Reset
              </button>
            </div>
          </form>
          {isSubmited && (
            <FetchWeather
              cityName={currentCity}
              check={control}
              handleCheck={handleShowMoreInfo}
            />
          )}
        </div>
        {isSubmited && control && (
          <WeatherCards lon={coords.longitud} lat={coords.latitud} />
        )}
      </div>
    </>
  );
};
