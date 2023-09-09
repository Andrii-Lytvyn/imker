import css from "./RegisterUser.module.css";
import { toast } from "react-toastify";
import {
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  WrapItem,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { initRegisterData } from "./interface/IRegisterUser";
import { validationSchemaRegistrationYup } from "../helpers/validationYupShema/validationSchemaYup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerNewUser } from "../helpers/userAuth/userOperation";

const RegisterUser = (): JSX.Element => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: initRegisterData,
    validationSchema: validationSchemaRegistrationYup,
    onSubmit: async (createNewUser) => {
      console.log("🚀  createNewUser:", createNewUser); //Log для бека
      const dataNewUser = await registerNewUser(createNewUser);
      if (dataNewUser?.status === 201 && dataNewUser?.data !== "") {
        toast.success(`Success`);
        resetForm();
        navigate("/singUp");
      } else {
        toast.info(" неправильное имя или пароль");
      }
    },
  });

  const inputSettings = {
    fontSize: "20",
    p: "6",
    boxShadow: "2xl",
    bg: "white",
    border: "1px",
    autoComplete: "on",
    onChange: handleChange,
    onBlur: handleBlur,
  };
  return (
    <>
      <ChakraProvider>
        <div className={css.container}>
          <div className={css.wrapper}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <FormControl mt="4">
                <Input
                  name="name"
                  maxLength={30}
                  value={values.name.trim()}
                  placeholder="Name"
                  focusBorderColor="lime"
                  {...inputSettings}
                />
              </FormControl>
              <FormControl mt="4" isInvalid={!!errors.plz && touched.plz}>
                <Input
                  name="plz"
                  maxLength={5}
                  value={values.plz.trim()}
                  placeholder="PLZ"
                  focusBorderColor="lime"
                  {...inputSettings}
                />
                {errors.plz && touched.plz && (
                  <FormErrorMessage>{errors.plz}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt="4">
                <Input
                  name="phone"
                  maxLength={20}
                  value={values.phone.trim()}
                  placeholder="+49"
                  focusBorderColor="lime"
                  {...inputSettings}
                />
              </FormControl>
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
                    mt={errors.password && touched.password ? "4" : "4"}
                    value={values.password}
                    placeholder="Password"
                    {...inputSettings}
                    focusBorderColor={
                      errors.password && touched.password ? "crimson" : "lime"
                    }
                    type={show ? "text" : "password"}
                  />
                  <InputRightElement
                    mt="5"
                    width="4.5rem"
                    pos="absolute"
                    top={errors.email && touched.email ? "1%" : "2%"}
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
              <FormControl mt="4">
                <Input
                  name="secretQuestion"
                  value={values.secretQuestion.trim()}
                  placeholder="Your question to restore "
                  focusBorderColor="lime"
                  {...inputSettings}
                />
              </FormControl>
              <FormControl mt="4">
                <Input
                  name="answerSecretQuestion"
                  value={values.answerSecretQuestion.trim()}
                  placeholder="Your answer to restore "
                  focusBorderColor="lime"
                  {...inputSettings}
                />
              </FormControl>
              <WrapItem mt={errors.password && touched.password ? "4" : "6"}>
                <Flex direction="row" gap="20" alignItems="flex-start">
                  <Button
                    type="submit"
                    color={"#fff"}
                    bg={"rgb(199,72,23)"}
                    _hover={{ bg: "#d3a863", color: "#fff" }}
                  >
                    Beitreten
                  </Button>
                  <Button
                    type="button"
                    mt="4"
                    colorScheme="blue"
                    variant="link"
                    size="sm"
                    onClick={() => navigate("/singUp")}
                  >
                    Einsingen
                  </Button>
                </Flex>
              </WrapItem>
            </form>
          </div>
        </div>
      </ChakraProvider>
    </>
  );
};

export default RegisterUser;
