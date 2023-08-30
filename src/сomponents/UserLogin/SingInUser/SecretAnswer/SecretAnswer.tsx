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
import { IEmail, initSingInUserEmail } from "../interface/ISingInUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import linkToServer from "../../../globalLinkToServer";

const emailToRestore = async (email: string) => {
  console.log("🚀  emailToRestore:", { email });
  try {
    const data = await axios.post(`${linkToServer}/api/questions`, { email });
    console.log("🚀  data:", data);

    // return data;
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const SecretAnswer = (): JSX.Element => {
  const navigate = useNavigate();
  const [{ email }, setRestoreEmail] = useState<IEmail>(initSingInUserEmail);

  console.log("🚀  email:", email);

  const handleSecretAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setRestoreEmail({ email: event.target.value });
  };

  const getSecretAnswer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("email", { email }); //Log для бека
    const response = await emailToRestore(email);

    console.log("🚀  response:", response);

    setRestoreEmail(initSingInUserEmail);
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
                value={email.trim()}
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
                  // onClick={() => navigate("/restorePassword")}
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
