import { loadStaticPaths } from "next/dist/server/dev/static-paths-worker";
import { useEffect, useState } from "react";

type difficulty = "easy" | "medium" | "hard";

export interface IQuestion {
  category: string;
  type: string;
  difficulty: difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface res {
  response_code: number;
  results: IQuestion[];
}

interface useQuestionsProps {
  amount?: number;
  difficulty?: difficulty;
}

export const useQuestions = ({
  difficulty = "easy",
  amount = 5,
}: useQuestionsProps): [
  { loading: boolean; questions: IQuestion[] },
  () => void
] => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getQuestions = () => {
    setLoading(true);
    fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=9&type=multiple&difficulty=${difficulty}`
    )
      .then((res) => res.json())
      .then((d: res) => {
        setQuestions(d.results);
        setLoading(false);
      })
      .catch((err) => console.log);
  };

  useEffect(() => {
    getQuestions();
  }, [difficulty, amount]);
  return [{ loading: loading, questions: questions }, getQuestions];
};

export default useQuestions;
