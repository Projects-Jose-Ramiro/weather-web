import React from "react";
import { useFetchWeather } from "../CustomHooks/useFetchWeather";

export const FetchWeather = ({ cityName }) => {
  const { data, loading, error } = useFetchWeather(cityName);

  return (
    <>
      <button onClick={() => console.log(data)}>Load city info</button>
      {loading && <h3>Loading...</h3>}
      {error || data === undefined || data.message && <h3>There has been an error. Please try a valid city</h3>}
      {data && !data.message && (
        <div>
          <h2>City: {data?.name}</h2>
          <h3>Temperature: {parseInt(data?.main?.temp - 273.15)}ºC</h3>
          <h3>Weather description:</h3>
          <h4> Main: {data?.weather[0]?.main}</h4>
          <h4>Details: {data?.weather[0]?.description}</h4>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </>
  );
};
