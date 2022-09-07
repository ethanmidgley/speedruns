import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { Question } from "../components/Question";
import useAnswerTracker from "../hooks/useAnswerTracker";
import useQuestions from "../hooks/useQuestions";

const NUMBER_OF_QUESTIONS = 5;

const Index = () => {
  const [{ questions, loading }, refetch] = useQuestions({
    amount: NUMBER_OF_QUESTIONS,
  });
  const [_, setAnswer, checkScore] = useAnswerTracker(NUMBER_OF_QUESTIONS);
  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<"started" | "idle" | "finished">(
    "idle"
  );

  const startGame = () => {
    if (gameState === "finished") {
      refetch();
    }
    setGameState("started");
  };

  const endGame = () => {
    setGameState("finished");
  };

  let body = null;
  if (loading) {
    body = <Spinner />;
  } else if (gameState === "finished") {
    body = (
      <>
        <Heading>
          Well done you got a score of {score} out of {NUMBER_OF_QUESTIONS}
        </Heading>
        <Button onClick={startGame}>Click here to play again</Button>
      </>
    );
  } else if (gameState === "idle") {
    body = <Button onClick={startGame}>Play</Button>;
  } else if (gameState === "started") {
    body = (
      <>
        {questions.map((q, idx) => (
          <Question
            onAnswer={(ans) => setAnswer(idx, ans)}
            question={q}
            key={idx}
          />
        ))}
        <Button
          onClick={() => {
            setScore(checkScore(questions));
            endGame();
          }}
        >
          Check score
        </Button>
      </>
    );
  }

  return (
    <Box textAlign={"center"} mx={"auto"}>
      <Heading>Super fun quiz</Heading>
      {body}
    </Box>
  );
};

export default Index;
