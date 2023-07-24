import "./index.css";
import "./App.css";
// import Contacts from './сomponents/Сontacts/Contacts'
import Login from "./сomponents/UserLogin/Login";
import Contacts from "./сomponents/Сontacts/Contacts";

function App(): JSX.Element {
  return (
    <>
      <Contacts />
      <Login />
    </>
  );
}

export default App;
