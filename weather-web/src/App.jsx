import styles from "./App.module.scss";
import { CityInput } from "./components/CityInput/CityInput";
import { Login } from './components/Routes/Login.jsx'
import { SignUp } from './components/Routes/SignUp.jsx'
import { Dashboard } from './components/Routes/Dashboard.jsx'
import { ProtectedRoute } from './components/Routes/ProtectedRoute.jsx'
import { Route, Routes } from "react-router-dom";
import { BasicInput } from "./components/BasicInput/BasicInput.jsx";
import { DefaultLayout } from "./LayoutFolder/DefaultLayout.jsx";

function App() {
  return (
    <>
    <DefaultLayout />
    <Routes>
    <Route path="/Login" element={<Login />} />
    <Route path="/SignUp" element={<SignUp />} />
    <Route path="/" element={<BasicInput />} />
    <Route path="/bienvenido" element={< CityInput/>} />
    </Routes>

    </>
  );
}

export default App;
