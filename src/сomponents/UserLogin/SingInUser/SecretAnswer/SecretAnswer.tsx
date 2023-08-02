import { BiLeftArrowCircle } from "react-icons/bi";
import { Button, Flex, FormControl, FormErrorMessage, Input, WrapItem } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { initSingInUserquestion } from "../interface/ISingInUser";
import { IRestoreAndForgot } from "../interface/ISecretRestore";

const SecretAnswer = ({setRestorePassword, restorePassword,setForgot ,forgot }:IRestoreAndForgot): JSX.Element => {
    const [{question}, setSecretWord] = useState(initSingInUserquestion);
    const [secretFlag, setSecretFlag] = useState(false);
    
    const handleSecretAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setSecretWord({ question: event.target.value });
    };
    
  const getSecretAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (question !== "") {
        console.log("question", { question });//Log для бека
        
    setSecretFlag(false);
    setRestorePassword(!restorePassword);
        
    } else {
      setSecretFlag(true);
    }
    setSecretWord(initSingInUserquestion);
  };
  return (
    <form onSubmit={getSecretAnswer}>
          <FormControl mt="2" isInvalid={secretFlag}>
            <Input
              value={question}
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
            <FormErrorMessage>{secretFlag ? "Required" : ""}</FormErrorMessage>
          </FormControl>
          <WrapItem mt="4">
            <Flex direction="row" gap="50">
              <Button
                colorScheme="red"
                type="button"
                onClick={() => setForgot(!forgot)}
                borderRadius="50"
                p="1"
              >
                <BiLeftArrowCircle style={{ fontSize: "30px" }} />
              </Button>
              <Button colorScheme="red" type="submit">
                Send
              </Button>
            </Flex>
          </WrapItem>
            </form>
  )
}

export default SecretAnswer
