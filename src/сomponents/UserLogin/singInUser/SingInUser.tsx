import axios from "axios";
import styles from "./SingInUser.module.css";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { validationSchemaSingUpYup } from "../helpers/validationYupShema/validationSchemaYup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  InputGroup,
  Input,
  InputRightElement,
  WrapItem,
  Flex,
  ChakraProvider,
} from "@chakra-ui/react";
import { initSingInUserData } from "./interface/ISingInUser";
import { useNavigate } from "react-router-dom";
import linkToServer from "../../globalLinkToServer";

const singInUser = async (userSingIn: string) => {
  try {
    const data = await axios.post(`${linkToServer}/login`, userSingIn);
    console.log("🚀  data:", data);
    return data;
  } catch (error) {
    console.log("🚀  error:", error);
  }
};
const getUserData = async () => {
  try {
    const data = await axios.get(`${linkToServer}/api/me`);
    console.log("🚀  getUserData:", data);
    // return data;
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const SingInUser = (): JSX.Element => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  //Валинация полей формы с помощью validationSchemaYup
  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: initSingInUserData,
    validationSchema: validationSchemaSingUpYup,
    onSubmit: async ({ email, password }) => {
      const userSingIn = `username=${email}&password=${password}`;

      const autorizedUser = await singInUser(userSingIn);
      if (autorizedUser?.status === 200) {
        resetForm();
        toast.success("User Logined!");
        await getUserData();
      }
    },
  });

  // Обьект одинаковых настроек для всех инпутов
  const inputSettings = {
    fontSize: "20",
    p: "6",
    boxShadow: "2xl",
    bg: "white",
    border: "1px",
    // borderRadius: "0",
    autoComplete: "on",
    onChange: handleChange,
    onBlur: handleBlur,
  };

  return (
    <>
      <ChakraProvider>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h2 className={styles.login_title}>Sing In</h2>
            <form onSubmit={handleSubmit}>
              <FormControl mt="4" isInvalid={!!errors.email && touched.email}>
                <Input
                  name="email"
                  value={values.email}
                  placeholder="Email"
                  focusBorderColor={
                    errors.email && touched.email ? "crimson" : "lime"
                  }
                  {...inputSettings}
                />
                {errors.email && touched.email && (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <InputGroup size="md">
                  <Input
                    name="password"
                    mt={errors.email && touched.email ? "4" : "10"}
                    value={values.password}
                    placeholder="Password"
                    {...inputSettings}
                    focusBorderColor={
                      errors.password && touched.password ? "crimson" : "lime"
                    }
                    type={show ? "text" : "password"}
                  />
                  <InputRightElement
                    mt={errors.email && touched.email ? "5" : "10"}
                    width="4.5rem"
                    pos="absolute"
                    top={errors.email && touched.email ? "1%" : "6%"}
                    right="0.5%"
                  >
                    <Button h="2.4rem" size="sm" onClick={() => setShow(!show)}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && touched.password && (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
              </FormControl>
              <WrapItem mt={errors.password && touched.password ? "4" : "6"}>
                <Flex direction="row" gap="10px">
                  <Button colorScheme="red" type="submit">
                    Beitreten
                  </Button>
                  <Button
                    colorScheme="red"
                    type="button"
                    onClick={() => navigate("/restore")}
                  >
                    Passwort vergessen ?
                  </Button>
                </Flex>
              </WrapItem>
              <Flex justifyContent="end">
                <Button
                  type="button"
                  mt="4"
                  colorScheme="blue"
                  variant="link"
                  size="sm"
                  onClick={() => navigate("/register")}
                >
                  Neues Konto registrieren
                </Button>
              </Flex>
            </form>
          </div>
        </div>
      </ChakraProvider>
    </>
  );
};

export default SingInUser;
