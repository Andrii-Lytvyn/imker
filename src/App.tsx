import "./index.css";
import "./App.css";
import MainPage from "./сomponents/MainPage/MainPage";
import { Route, Routes} from "react-router-dom";
import Login from "./сomponents/UserLogin/Login";
import Contacts from "./сomponents/Сontacts/Contacts";
import AboutUs from "./сomponents/AboutUs/AboutUs";

function App(): JSX.Element {
  return (
          <Routes>
              <Route path="/imker" element={<MainPage />} />
              <Route path="/imker/login" element={<Login />} />
              <Route path="/imker/contact" element={<Contacts />} />
              <Route path="/imker/about" element={<AboutUs />} />
          </Routes>
  );
}

export default App;
