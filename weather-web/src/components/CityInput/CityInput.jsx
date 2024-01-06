import { useState } from "react";
import { FetchWeather } from "../FetchWeather/FetchWeather";

export const CityInput = () => {
  const [cityInput, setCityInput] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [isSubmited, setIsSubmited] = useState(false)

  const handleInputChange = (e) => {
    setCityInput(e.target.value)
  };
  const handleInputReset = () => {
    setCityInput("")
    setIsSubmited(false)
  }

  const handleFormSubmit = (e) => {
        e.preventDefault()
        setCurrentCity(cityInput)
        setIsSubmited(true)
        setCityInput("")
  }

  return (
    <>
    <form onSubmit={handleFormSubmit}>
        <h2>Select the city</h2>
        <input type="text" name="city" value={cityInput} onChange={handleInputChange} />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleInputReset}>Reset</button>
    </form>
    {isSubmited && <FetchWeather cityName={currentCity} />}
    </>
  );
};
