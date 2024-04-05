import styles from "./FetchWeather.module.scss";
import { useFetchWeather } from "../CustomHooks/useFetchWeather";
import { useFormattedDate } from "../CustomHooks/useFormattedDate";

export const FetchBasic = ({ cityName, check, handleCheck }) => {
  const { data, loading, error } = useFetchWeather(cityName);
  const formattedDate = useFormattedDate();

  return (
    <div className={styles.cityInfoContainer}>
      {loading && <h3>Loading...</h3>}
      {error ||
        data === undefined ||
        (data.message && (
          <h3>There has been an error. Please try a valid city</h3>
        ))}
      {data && !data.message && (
        <div className={styles.cityInfoData}>
          <div className={styles.infoDataTitle}>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <h3>{parseInt(data?.main?.temp - 273.15)}ºC</h3>
          </div>
          <h4 className={styles.infoDataSubtitle}>
            {data?.weather[0]?.main}, {data?.weather[0]?.description}
          </h4>
          <h2 className={styles.infoDataName}>
            {data?.name}, {data?.sys.country}
          </h2>
          <h4>{formattedDate}</h4>
          <div className={styles.infoDataCards}>
            <div className={styles.windCard}>
              <h4>Wind Speed</h4>
              <h5>{data?.wind.speed} m/s</h5>
            </div>
            <div className={styles.humidityCard}>
              <h4>Humidity</h4>
              <h5>{data?.main?.humidity}%</h5>
            </div>
          </div>
          <div className={styles.heatIndexCont}>
            <h4>Heat index</h4>
            <h4>{parseInt(data?.main?.feels_like - 273.15)}ºC</h4>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};
