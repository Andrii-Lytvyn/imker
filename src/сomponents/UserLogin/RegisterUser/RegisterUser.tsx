import css from "./RegisterUser.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  WrapItem,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { IRegisterUser, initRegisterData } from "./interface/IRegisterUser";
import { validationSchemaRegistrationYup } from "../helpers/validationYupShema/validationSchemaYup";
import { useState } from "react";
import { ISingInForm } from "../SingInUser/interface/ISecretRestore";

const baseURL = "http://localhost:8080/api/register";
// const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";

const loginNewUser = async (createNewUser: IRegisterUser) => {
  try {
    const data = await axios.post(`${baseURL}`, createNewUser);
    console.log("🚀  data:", data);
  } catch (error) {
    toast.error(`Ошибка сервера ${error}`);
  }
};

const RegisterUser = ({
  setSwichForm,
  swichForm,
}: ISingInForm): JSX.Element => {
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
    onSubmit: (createNewUser) => {
      console.log("🚀  createNewUser:", createNewUser); //Log для бека
      loginNewUser(createNewUser);
      resetForm();
      toast.success("User create!");
    },
  });

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
      <h2 className={css.register_title}>Register</h2>
      <form onSubmit={handleSubmit}>
        <FormControl mt="4">
          <Input
            name="name"
            value={values.name}
            placeholder="Name"
            focusBorderColor="lime"
            {...inputSettings}
          />
        </FormControl>
        <FormControl mt="4" isInvalid={!!errors.plz && touched.plz}>
          <Input
            name="plz"
            value={values.plz}
            placeholder="PLZ"
            focusBorderColor="lime"
            {...inputSettings}
          />
          {errors.plz && touched.plz && (
            <FormErrorMessage>{errors.plz}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mt="4" isInvalid={!!errors.phone && touched.phone}>
          <Input
            name="phone"
            value={values.phone}
            placeholder="+49"
            focusBorderColor="lime"
            {...inputSettings}
          />
          {errors.phone && touched.phone && (
            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mt="4" isInvalid={!!errors.email && touched.email}>
          <Input
            // mt={errors.email && touched.email ? "4" : "4"}
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
            name="question"
            value={values.question}
            placeholder="Model your first car ?"
            focusBorderColor="lime"
            {...inputSettings}
          />
        </FormControl>
        <WrapItem mt={errors.password && touched.password ? "4" : "6"}>
          <Flex direction="row" gap="20" alignItems="flex-start">
            <Button
              colorScheme="red"
              type="submit"
            // _hover={{ bg: "#d3a863", color: "red" }}
            >
              Beitreten
            </Button>
            <Button
              type="button"
              mt="4"
              colorScheme="blue"
              variant="link"
              size="sm"
              onClick={() => setSwichForm(!swichForm)}
            >
              Einsingen
            </Button>
          </Flex>
        </WrapItem>
      </form>
    </>
  );
};

export default RegisterUser;
