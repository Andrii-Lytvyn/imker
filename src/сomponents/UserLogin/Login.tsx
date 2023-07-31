import css from "./Login.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import SingInUser from "./SingInUser/SingInUser";
import { useState } from "react";
import RegisterUser from "./RegisterUser/RegisterUser";

const Login = (): JSX.Element => {
  const [swichForm, setSwichForm] = useState(true);
  return (
    <ChakraProvider>
      <Header />
      <div className={css.container}>
        <div className={css.wrapper}>
          <div className={css.fields_container}></div>
          {swichForm ?
            <SingInUser setSwichForm={setSwichForm} swichForm={swichForm} />
            :
            <RegisterUser  setSwichForm={setSwichForm} swichForm={swichForm}/>}
          
          
        </div>
      </div>
      <Footer />
    </ChakraProvider>
  );
};

export default Login;
