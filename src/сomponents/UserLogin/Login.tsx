import css from "./Login.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import SingInUser from "./singInUser/SingInUser";

const Login = (): JSX.Element => {
  return (
    <ChakraProvider>
      <Header />
      <div className={css.container}>
        <div className={css.wrapper}>
          <div className={css.fields_container}></div>
          <SingInUser />
        </div>
      </div>
      <Footer />
    </ChakraProvider>
  );
};

export default Login;
