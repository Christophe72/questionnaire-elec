import QuestionsList from "./components/QuestionsList";
import questions from "./question.json";

export default function Home() {
  return (
    <div>
      <QuestionsList questions={questions} />
    </div>
  );
}
