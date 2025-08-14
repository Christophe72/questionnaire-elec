"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
} from "@mui/material";

// On suppose que chaque question a un champ 'etapes' qui sert de choix, et le premier est la bonne réponse
export type QcmQuestion = {
  id: string;
  titre: string;
  etapes: { numero: number | string; description: string; details: string }[];
};

type Props = {
  questions: QcmQuestion[];
};

export default function Qcm({ questions }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const correctAnswer = question.etapes[0]?.description;

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    if (selected === correctAnswer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1]);
    }
  };

  if (finished) {
    return (
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5">QCM terminé !</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Score : {score} / {questions.length}
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Question {current + 1} / {questions.length}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {question.titre}
      </Typography>
      <RadioGroup
        value={selected || ""}
        onChange={(e) => handleSelect(e.target.value)}
      >
        {question.etapes.map((etape) => (
          <FormControlLabel
            key={etape.numero}
            value={etape.description}
            control={<Radio />}
            label={etape.description}
          />
        ))}
      </RadioGroup>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handlePrev}
          disabled={current === 0}
        >
          Précédent
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={!selected}>
          {current < questions.length - 1 ? "Suivant" : "Terminer"}
        </Button>
      </Box>
    </Box>
  );
}
