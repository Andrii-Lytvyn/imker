import axios from "axios";
import css from "./SingInUser.module.css";
import { BiLeftArrowCircle } from "react-icons/bi";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
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
import { ISignInUser,initSingInUserData } from "./interface/ISingInUser";


const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";

const loginNewUser = async (createNewUser: ISignInUser) => {
  try {
    const { data } = await axios.post(`${baseURL}/user_login`, createNewUser);
    console.log("🚀  data:", data);
  } catch (error) {
    console.log("🚀  error:", error);
  }
};
export interface IForm {
  swichForm: boolean
  setSwichForm: (newValue: boolean) => void;
}

const SingInUser = ({setSwichForm ,swichForm}:IForm): JSX.Element => {
  const [forgot, setForgot] = useState(true);
  const [secretWord, setSecretWord] = useState("");
  const [flag, setFlag] = useState(false);
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
      // loginNewUser(createNewUser);

      console.log("🚀  createNewUser:", createNewUser);
      
      resetForm();
      toast.success("User Logined!");
    },
  });

  const handleSecretAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setSecretWord(event.target.value);
  };
  const getSecretAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (secretWord !== "") {
      console.log(secretWord);
      setFlag(false);
    } else {
      setFlag(true);
    }

    setSecretWord("");
  };

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
            <Button type="button" mt="4" colorScheme='blue'
              variant='link' size='sm'
              onClick={()=> setSwichForm(!swichForm)}>
              Neues Konto registrieren
            </Button>
            </Flex>
        </form>
      ) : (
          <div className={css.title}>
            <h4>Model your first car ?</h4> 
        <form onSubmit={getSecretAnswer}>
          <FormControl mt="2" isInvalid={flag}>
            <Input
              value={secretWord}
              placeholder="Enter secret answer"
              fontSize="20"
              p="6"
              boxShadow="2xl"
              bg="white"
              border="1px"
              //   borderRadius="2"
              autoComplete="on"
              focusBorderColor="lime"
              onChange={handleSecretAnswer}
            />
            <FormErrorMessage>{flag ? "Required" : ""}</FormErrorMessage>
          </FormControl>
          <WrapItem mt="4">
            <Flex direction="row" gap="50">
              <Button
                colorScheme="red"
                type="button"
                onClick={() => setForgot((prev) => !prev)}
                borderRadius="50"
                p="1"
              >
                <BiLeftArrowCircle style={{ fontSize: "30px" }} />
              </Button>
              <Button colorScheme="red" type="submit">
                Join Us
              </Button>
            </Flex>
          </WrapItem>
            </form>
            </div>
      )}
    </>
  );
};

export default SingInUser;
