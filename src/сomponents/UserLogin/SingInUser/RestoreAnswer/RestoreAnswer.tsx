import { toast } from "react-toastify";
import { BiLeftArrowCircle } from "react-icons/bi";
import styles from "../SecretAnswer/SecretAnswer.module.css";
import {
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  Input,
  InputGroup,
  WrapItem,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { initRestoreAnswer } from "./interface/IRestoreAnswer";
import { useNavigate } from "react-router-dom";
import { useUserSelector } from "../../../../redux/userStore/userSelector";
import { shuffleQuestion } from "./helpers/shuffleQuestion";
import { answerToRestore } from "../../helpers/userAuth/userOperation";

const RestoreAnswer = (): JSX.Element => {
  const navigate = useNavigate();
  const { question } = useUserSelector();

  const [restoreAnswer, setRestoreAnswer] = useState(initRestoreAnswer);

  console.log("🚀  restoreAnswer:", restoreAnswer);
  const handleSecretAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRestoreAnswer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const restoreAnswerRequest = {
      ...restoreAnswer,
      id: question.id,
      email: question.email,
    };

    const response = await answerToRestore(restoreAnswerRequest);

    if (response?.status === 200) {
      navigate("/restorePassword");
    } else {
      toast.warning("Incorect answer");
    }
    console.log("🚀  response:", response);
  };

  const inputSettings = {
    fontSize: "20",
    name: "password",
    mt: "2",
    p: "6",
    boxShadow: "2xl",
    bg: "white",
    border: "1px",
    placeholder: "answer",
    // borderRadius: "0",
    autoComplete: "on",
  };
  const shuffledQuestions = useMemo(
    () => shuffleQuestion([...question.secretQuestions]),
    [question.secretQuestions]
  );
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h4>enter right answer</h4>
        <div>
          <ul>
            {shuffledQuestions.map((item, index) => (
              <label key={index} className={styles.question}>
                <input
                  type="radio"
                  name="secretQuestions"
                  onChange={handleSecretAnswer}
                  value={item}
                  checked={restoreAnswer.secretQuestions === item}
                />
                {item}
              </label>
            ))}
          </ul>
        </div>
        <ChakraProvider>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <InputGroup size="md">
                <Input
                  value={restoreAnswer.answer}
                  {...inputSettings}
                  type="text"
                  name="answer"
                  onChange={handleSecretAnswer}
                />
              </InputGroup>
            </FormControl>
            <WrapItem mt="6">
              <Flex direction="row" gap="58">
                <Button
                  colorScheme="red"
                  type="submit"
                  onClick={() => navigate("/restore")}
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
        </ChakraProvider>
      </div>
    </div>
  );
};

export default RestoreAnswer;
