import styles from "./FetchWeather.module.scss";
import { useFetchWeather } from "../CustomHooks/useFetchWeather";

export const FetchWeather = ({ cityName, check, handleCheck }) => {
  const { data, loading, error } = useFetchWeather(cityName);

  const handleControl = () => {
    handleCheck();
  }

  return (
    <div className={styles.cityInfoContainer}>
      <button
        className={styles.cityInfoButton}
        onClick={() => console.log(data)}
      >
        Load city info
      </button>
      {loading && <h3>Loading...</h3>}
      {error ||
        data === undefined ||
        (data.message && (
          <h3>There has been an error. Please try a valid city</h3>
        ))}
      {data && !data.message && (
        <div className={styles.cityInfoData}>
          <h2>{data?.name}</h2>
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
      <div className={styles.cityInfoData}>
        {data && !data.message && (
          <>
            <button className={styles.cityInfoDataBtn} onClick={handleControl}>
              More information
            </button>
            {check && (
              <div className={styles.cityInfoDataDetails}>
                <h3>General information:</h3>
                <h4>Country ID: {data?.sys.country}</h4>
                <h4>Country timezone: {data?.timezone}</h4>
                <h3>Weather details:</h3>
                <h4>Wind speed: {data?.wind.speed}</h4>
                <h3>Temperature:</h3>
                <h4>
                  Min temperature: {parseInt(data?.main?.temp_min - 273.15)}ºC
                </h4>
                <h4>
                  Max temperature: {parseInt(data?.main?.temp_max - 273.15)}ºC
                </h4>
                <h3>Visibility:</h3>
                <h4>
                Kilometers: {(data?.visibility)/1000}
                </h4>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
