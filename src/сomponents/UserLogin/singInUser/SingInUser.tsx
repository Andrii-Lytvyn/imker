import axios from "axios";
import css from "./SingInUser.module.css";
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
} from "@chakra-ui/react";
import { ISignInUser, initSingInUserData } from "./interface/ISingInUser";
import { ISingInForm } from "./interface/ISecretRestore";
import SecretAnswer from "./SecretAnswer/SecretAnswer";
import RestorePassword from "./RestorePassword/RestorePassword";

// const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";
const baseURL = "http://localhost:8080/api/users/login";

const singInUser = async (createNewUser: ISignInUser) => {
  try {
    const { data } = await axios.post(`${baseURL}`, createNewUser);
    console.log("🚀  data:", data);
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const SingInUser = ({ setSwichForm, swichForm }: ISingInForm): JSX.Element => {
  const [forgot, setForgot] = useState(true);
  const [restorePassword, setRestorePassword] = useState(true);
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
    onSubmit: (createNewUser) => {
      singInUser(createNewUser);

      console.log("🚀  LoginUser:", createNewUser); //Log для бека
      resetForm();
      toast.success("User Logined!");
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
      <h2 className={css.login_title}>Sing In</h2>
      {forgot ? (
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
                onClick={() => setForgot((prev) => !prev)}
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
              onClick={() => setSwichForm(!swichForm)}
            >
              Neues Konto registrieren
            </Button>
          </Flex>
        </form>
      ) : (
        <div className={css.title}>
          <h4>
            {restorePassword ? "Model your first car ?" : "Enter new password "}
          </h4>
          {restorePassword ? (
            <SecretAnswer
              forgot={forgot}
              setForgot={setForgot}
              setRestorePassword={setRestorePassword}
              restorePassword={restorePassword}
            />
          ) : (
            <RestorePassword
              setRestorePassword={setRestorePassword}
              restorePassword={restorePassword}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SingInUser;
