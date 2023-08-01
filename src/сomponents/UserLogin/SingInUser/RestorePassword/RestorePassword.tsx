import { useFormik } from "formik";
import { toast } from "react-toastify";
import { BiLeftArrowCircle } from "react-icons/bi";
import { IRestore } from "../interface/ISecretRestore";
import { validationSchemaRestorePasswordYup } from "../../helpers/validationYupShema/validationSchemaYup";
import { Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement, WrapItem } from "@chakra-ui/react";
import { useState } from "react";
import { initRestorePassword } from "./interface/IRestorePassword";

const RestorePassword = ({setRestorePassword, restorePassword}: IRestore): JSX.Element => {
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
    onSubmit: (newPassword) => {
      // loginNewUser(createNewUser);

      console.log("🚀  newPassword:", newPassword);//Log для бека
      
      resetForm();
      toast.success("Rassword refreshed!");
    },
  });
     const inputSettings = {
    fontSize: "20",
    name:"password",
    mt:"2",
    p: "6",
    boxShadow: "2xl",
    bg: "white",
    border: "1px",
    placeholder:"New password",
    // borderRadius: "0",
    autoComplete: "on",
    onChange: handleChange,
    onBlur: handleBlur,
     };
  return (
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
                <Button
                colorScheme="red"
                type="button"
                onClick={() => setRestorePassword(!restorePassword)}
                borderRadius="50"
                p="1"
              >
                <BiLeftArrowCircle style={{ fontSize: "30px" }} />
              </Button>
              <Button colorScheme="red" type="submit">
                Wiederherstellen  
            </Button>
            </Flex>
          </WrapItem>
          </form>
  )
}

export default RestorePassword
