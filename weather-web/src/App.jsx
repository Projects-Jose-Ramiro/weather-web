import "./App.scss";
import { CityInput } from "./components/CityInput/CityInput";

function App() {
  return (
    <>
      <div className="appContainer">
        <h1>Weather web</h1>
        <CityInput />
      </div>
    </>
  );
}

export default App;
