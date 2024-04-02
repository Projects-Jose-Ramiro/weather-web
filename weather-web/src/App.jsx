// App.jsx
import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./LayoutFolder/DefaultLayout.jsx";
import { Login } from "./components/Routes/Login.jsx";
import { SignUp } from "./components/Routes/SignUp.jsx";
import { BasicInput } from "./components/BasicInput/BasicInput.jsx";
import { CityInput } from "./components/CityInput/CityInput";
import { SignOut } from "./components/Routes/SignOut.jsx";

function App() {
  return (
    
      <DefaultLayout>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/bienvenido" element={<CityInput />} />
          <Route path="/" element={<BasicInput />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </DefaultLayout>
    
  );
}

export default App;
