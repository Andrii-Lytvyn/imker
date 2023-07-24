import { FC, useState } from "react";
import css from "./Login.module.css";
import { useFormik } from "formik";
import {
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  WrapItem,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { IFormData, initialFormData } from "./interface/IFormData";
import { validationSchemaYup } from "./helpers/validationYupShema/validationSchemaYup";

import axios from "axios";
const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";

const loginNewUser = async (createNewUser: IFormData) => {
  try {
    const { data } = await axios.post(`${baseURL}/user_login`, createNewUser);
    console.log("🚀  data:", data);
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const Login: FC = () => {
  const [show, setShow] = useState(false);
  const [wait, setWait] = useState(false);

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
    initialValues: initialFormData,
    validationSchema: validationSchemaYup,
    onSubmit: (createNewUser) => {
      loginNewUser(createNewUser);
      resetForm();
      setWait(true);
    },
  });

  // Обьект одинаковых настроек для всех инпутов
  const inputSettings = {
    fontSize: "20",
    p: "6",
    boxShadow: "2xl",
    bg: "white",
    border: "1px",
    // borderColor: "black.200",
    autoComplete: "on",
    onChange: handleChange,
    onBlur: handleBlur,
  };

  //использую библиотеку Chakra UI для формы
  return (
    <ChakraProvider>
      <div className={css.container}>
        <div className={css.wrapper}>
          <h2 className={css.login_title}>{wait ? "" : "Login"}</h2>
          <div className={css.fields_container}>
            {wait ? (
              <div className={css.image_gnom}>
                <h3 className={css.image_gnom_title}>
                  Adminisration contact you
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormControl mt="4" isInvalid={!!errors.name && touched.name}>
                  <Input
                    name="name"
                    value={values.name}
                    placeholder="Name"
                    focusBorderColor={
                      errors.name && touched.name ? "crimson" : "lime"
                    }
                    {...inputSettings}
                  />
                  {errors.name && touched.name && (
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  mt={errors.name && touched.name ? "4" : "10"}
                  isInvalid={!!errors.email && touched.email}
                >
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
                      <Button
                        h="2.4rem"
                        size="sm"
                        onClick={() => setShow(!show)}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && touched.password && (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  )}
                </FormControl>
                <WrapItem mt={errors.password && touched.password ? "4" : "10"}>
                  <Button colorScheme="red" type="submit">
                    Join Us
                  </Button>
                </WrapItem>
              </form>
            )}
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Login;
