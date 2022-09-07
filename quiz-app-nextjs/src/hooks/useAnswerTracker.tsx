import { useState } from "react";
import { IQuestion } from "./useQuestions";

export const useAnswerTracker = (
  numberOfAnswers: number
): [
  string[],
  (idx: number, answer: string) => void,
  (questions: IQuestion[]) => number
] => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    new Array<string>(5)
  );

  const setSelectedAnswer = (idx: number, answer: string) => {
    const tmp = [...selectedAnswers];
    tmp[idx] = answer;
    setSelectedAnswers(tmp);
  };

  const calculateAnswers = (questions: IQuestion[]): number => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correct_answer === selectedAnswers[i]) {
        score++;
      }
    }
    return score;
  };
  return [selectedAnswers, setSelectedAnswer, calculateAnswers];
};

export default useAnswerTracker;
