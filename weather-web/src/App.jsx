import "./App.css";
import { FetchWeather } from "./components/FetchWeather/FetchWeather";

function App() {

  return (
    <>
      <h1>Weather web</h1>
      <FetchWeather cityName={"Madrid"} />
    </>
  );
}

export default App;
