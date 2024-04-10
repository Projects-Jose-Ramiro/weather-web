// App.jsx
import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./LayoutFolder/DefaultLayout.jsx";
import { Login } from "./components/Routes/Login.jsx";
import { SignUp } from "./components/Routes/SignUp.jsx";
import { BasicInput } from "./components/BasicInput/BasicInput.jsx";
import { CityInput } from "./components/CityInput/CityInput";

function App() {
  return (

      <DefaultLayout>
            <h1 style={{ color: "white" }}>Weather web </h1>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/welcome" element={<CityInput />} />
          <Route path="/" element={<BasicInput />} />
        </Routes>
      </DefaultLayout>

  );
}

export default App;
