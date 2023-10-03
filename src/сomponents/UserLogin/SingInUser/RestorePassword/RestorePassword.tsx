import { useFormik } from "formik";
import { toast } from "react-toastify";
// import { BiLeftArrowCircle } from "react-icons/bi";
import styles from "../SecretAnswer/SecretAnswer.module.css";

import { validationSchemaRestorePasswordYup } from "../../helpers/validationYupShema/validationSchemaYup";
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
import { useState } from "react";
import { initRestorePassword } from "./interface/IRestorePassword";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/dispatch.selector";
import { useUserSelector } from "../../../../redux/userStore/userSelector";

import {
  getUserData,
  restoreUserPassword,
  singInUser,
} from "../../helpers/userAuth/userOperation";
import {
  userDataInfo,
  userIsLogin,
} from "../../../../redux/userStore/userSlice";

const RestorePassword = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { question } = useUserSelector();
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
    initialValues: initRestorePassword,
    validationSchema: validationSchemaRestorePasswordYup,
    onSubmit: async ({ password }) => {
      const newPasswordObject = {
        id: question.id,
        newPassword: password,
      };
      const response = await restoreUserPassword(newPasswordObject);

      if (response?.status === 200) {
        const userSingIn = `username=${question.email}&password=${password}`;

        const singIn = await singInUser(userSingIn);
        if (singIn?.status === 200) {
          resetForm();
          toast.success("Welcome");
          const userInfo = await getUserData();
          dispatch(userDataInfo(userInfo?.data));
          dispatch(userIsLogin(true));
          navigate("/imker");
        }
        resetForm();
      }
    },
  });
  const inputSettings = {
    fontSize: "20",
    name: "password",
    mt: "2",
    p: "6",
    boxShadow: "2xl",
    bg: "white",
    border: "1px",
    placeholder: "New password",
    // borderRadius: "0",
    autoComplete: "on",
    onChange: handleChange,
    onBlur: handleBlur,
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h4>enter new password</h4>
        <ChakraProvider>
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={!!errors.password && touched.password}>
              <InputGroup size="md">
                <Input
                  value={values.password}
                  {...inputSettings}
                  focusBorderColor={
                    errors.password && touched.password ? "crimson" : "lime"
                  }
                  type={show ? "text" : "password"}
                />
                <InputRightElement
                  width="4.5rem"
                  pos="absolute"
                  top="22%"
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
              <Flex direction="row" gap="58">
                {/* <Button
                  colorScheme="red"
                  type="button"
                  onClick={() => navigate("/restore")}
                  borderRadius="50"
                  p="1"
                >
                  <BiLeftArrowCircle style={{ fontSize: "30px" }} />
                </Button> */}
                <Button colorScheme="red" type="submit">
                  Update Password
                </Button>
              </Flex>
            </WrapItem>
          </form>
        </ChakraProvider>
      </div>
    </div>
  );
};

export default RestorePassword;
