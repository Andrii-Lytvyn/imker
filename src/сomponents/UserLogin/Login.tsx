import { useState } from "react";
import css from "./Login.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import SingInUser from "./SingInUser/SingInUser";
import RegisterUser from "./RegisterUser/RegisterUser";

const Login = (): JSX.Element => {
  const [swichForm, setSwichForm] = useState(true);

  return (
    <ChakraProvider>
      <div className={css.container}>
        <div className={css.wrapper}>
          {swichForm ? (
            <SingInUser setSwichForm={setSwichForm} swichForm={swichForm} />
          ) : (
            <RegisterUser setSwichForm={setSwichForm} swichForm={swichForm} />
          )}
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Login;
