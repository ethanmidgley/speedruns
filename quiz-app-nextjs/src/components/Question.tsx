import React, { useMemo, useState } from "react";
import { IQuestion } from "../hooks/useQuestions";
import { Box, Button, Text } from "@chakra-ui/react";
import { unescape } from "he";

interface props {
  question: IQuestion;
  onAnswer: (answer: string) => void;
}

export const Question: React.FC<props> = ({ question, onAnswer }) => {
  const answers = useMemo(() => {
    let a = [...question.incorrect_answers, question.correct_answer];
    a.sort(() => 0.5 - Math.random());
    return a;
  }, [question]);
  const [selected, setSelected] = useState<string>("");

  return (
    <Box mb={2}>
      <Text>{unescape(question.question)}</Text>
      {answers.map((ans) => (
        <Button
          mr={2}
          onClick={() => {
            onAnswer(ans);
            setSelected(ans);
          }}
          colorScheme={selected === ans ? "orange" : null}
        >
          {unescape(ans)}
        </Button>
      ))}
    </Box>
  );
};
