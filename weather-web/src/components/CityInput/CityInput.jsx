import { useState } from "react";
import { FetchWeather } from "../FetchWeather/FetchWeather";
import styles from "./CityInput.module.scss"

export const CityInput = () => {
  const [cityInput, setCityInput] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [control, setControl] = useState(false);

  const handleInputChange = (e) => {
    setCityInput(e.target.value)
  };
  const handleInputReset = () => {
    setCityInput("");
    setIsSubmited(false);
    setControl(false);
  }

  const handleFormSubmit = (e) => {
        e.preventDefault();
        setCurrentCity(cityInput);
        setIsSubmited(true);
        setCityInput("");
  }

  return (
    <div className={styles.inputInfoContainer}>
      <form className={styles.cityInputContainer} onSubmit={handleFormSubmit}>
          <h2>Select the city</h2>
          <input className={styles.inputText} type="text" name="city" value={cityInput} onChange={handleInputChange} />
          <button className={styles.inputButton} type="submit">Submit</button>
          <button className={styles.inputButton} type="button" onClick={handleInputReset}>Reset</button>
      </form>
      {isSubmited && <FetchWeather cityName={currentCity} check={control} handleCheck={() => setControl(true)} />}
    </div>
  );
};
