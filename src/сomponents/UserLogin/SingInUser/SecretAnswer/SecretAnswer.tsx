import { BiLeftArrowCircle } from "react-icons/bi";
import styles from "./SecretAnswer.module.css";
import {
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  // FormErrorMessage,
  Input,
  WrapItem,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { initSingInUserEmail } from "../interface/ISingInUser";
import { useNavigate } from "react-router-dom";

const SecretAnswer = (): JSX.Element => {
  const navigate = useNavigate();
  const [{ email }, setSecretWord] = useState(initSingInUserEmail);

  const handleSecretAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setSecretWord({ email: event.target.value });
  };

  const getSecretAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email !== "") {
      console.log("email", { email }); //Log для бека
    }
    setSecretWord(initSingInUserEmail);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ChakraProvider>
          <h4>Enter email</h4>
          <form onSubmit={getSecretAnswer}>
            <FormControl
              mt="2"
              // isInvalid={secretFlag}
            >
              <Input
                value={email}
                placeholder="Enter email"
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
              {/* <FormErrorMessage>{secretFlag ? "Required" : ""}</FormErrorMessage> */}
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
                  colorScheme="red"
                  type="submit"
                  onClick={() => navigate("/restorePassword")}
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
