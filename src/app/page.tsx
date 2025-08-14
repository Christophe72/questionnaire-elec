import QuestionsList from "./components/QuestionsList";
import questions from "./question.json";
import protocoles from "./protocoles.json";
import pannes from "./pannes.json";
import couleursFils from "./couleurs-fils.json";

import Qcm from "./components/Qcm";
// import QcmProtocoles from "./components/QcmProtocoles";
// import QcmPannes from "./components/QcmPannes";
// import QcmCouleursFils from "./components/QcmCouleursFils";
import Protocoles from "./components/Protocoles";

export default function Home() {
  return (
    <div>
      <QuestionsList questions={questions} />
      <Qcm questions={questions} />
      {/* <QcmProtocoles protocoles={protocoles} />
      <QcmPannes pannes={pannes} protocoles={protocoles} />
      <QcmCouleursFils couleursFils={couleursFils} /> */}
      <Protocoles />
    </div>
  );
}
