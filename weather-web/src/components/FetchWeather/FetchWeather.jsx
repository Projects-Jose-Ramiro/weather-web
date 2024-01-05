import React from "react";
import { useFetchWeather } from "../CustomHooks/useFetchWeather";

export const FetchWeather = ({ cityName }) => {

  const { data, loading, error } = useFetchWeather(cityName)

  return <>
    <button onClick={() => console.log(data)}>Load city info</button>
    {loading && <h3>Loading...</h3>}
    {error && <h3>There has been an error</h3>}
    {data &&
    <div> 
    <h2>City: {cityName}</h2>
    <h3>Weather description:</h3>
    <h4> Main: {data.weather[0].main}; Description: {data.weather[0].description}</h4>
    </div>}  
  </>;
};