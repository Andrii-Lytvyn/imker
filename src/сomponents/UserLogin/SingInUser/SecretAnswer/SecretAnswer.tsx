import { BiLeftArrowCircle } from "react-icons/bi";
import styles from "./SecretAnswer.module.css";
import {
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormErrorMessage,
  // FormErrorMessage,
  Input,
  WrapItem,
} from "@chakra-ui/react";

import { initSingInUserEmail } from "../interface/ISingUser";
import { useNavigate } from "react-router-dom";
import { getQuestion } from "../../../../redux/userStore/userSlice";
import { useAppDispatch } from "../../../../hooks/dispatch.selector";
import { emailToRestore } from "../../helpers/userAuth/userOperation";
import { useFormik } from "formik";
import { validationSchemaRestoreEmailYup } from "../../helpers/validationYupShema/validationSchemaYup";

const SecretAnswer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: initSingInUserEmail,
    validationSchema: validationSchemaRestoreEmailYup,
    onSubmit: async (email) => {
      console.log("🚀  email:", email);
      const response = await emailToRestore(email);

      if (response?.status === 200) {
        dispatch(getQuestion(response.data));
        navigate("/restoreAnswer");
      }

      resetForm();
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

  // const getSecretAnswer = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log("email", email);
  //   const response = await emailToRestore(email);

  //   if (response?.status === 200) {
  //     dispatch(getQuestion(response.data));
  //     navigate("/restoreAnswer");
  //   }

  //   setRestoreEmail(initSingInUserEmail);
  // };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ChakraProvider>
          <h4>Enter email</h4>
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
            <WrapItem mt="4">
              <Flex direction="row" gap="50">
                <Button
                  colorScheme="red"
                  type="button"
                  onClick={() => navigate("/singUp")}
                  borderRadius="50"
                  p="1"
                >
                  <BiLeftArrowCircle style={{ fontSize: "30px" }} />
                </Button>
                <Button
                  isDisabled={values.email === "" ? true : false}
                  colorScheme="red"
                  type="submit"
                >
                  Send
                </Button>
              </Flex>
            </WrapItem>
          </form>
        </ChakraProvider>
      </div>
    </div>
  );
};

export default SecretAnswer;
