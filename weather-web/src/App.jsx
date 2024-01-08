import styles from "./App.module.scss";
import { CityInput } from "./components/CityInput/CityInput";

function App() {
  return (
    <>
      <div className={styles.appContainer}>
        <h1>Weather web</h1>
        <CityInput />
      </div>
    </>
  );
}

export default App;
