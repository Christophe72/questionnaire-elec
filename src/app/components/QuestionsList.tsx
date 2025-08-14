"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Typography,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
  Chip,
  //   Divider,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

type Etape = {
  numero: number | string;
  description: string;
  details: string;
};

type Question = {
  id: string;
  titre: string;
  categorie: string;
  niveau: string;
  symptomes: string[];
  outils_requis: string[];
  etapes: Etape[];
  normes_referencees: string[];
  precautions: string[];
  tags: string[];
};

type Props = {
  questions: Question[];
};

export default function QuestionsList({ questions }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const filteredQuestions = useMemo(() => {
    if (!filter.trim()) return questions;
    const f = filter.toLowerCase();
    return questions.filter(
      (q) =>
        q.titre.toLowerCase().includes(f) ||
        q.categorie.toLowerCase().includes(f) ||
        q.niveau.toLowerCase().includes(f) ||
        q.tags.some((tag) => tag.toLowerCase().includes(f))
    );
  }, [filter, questions]);

  if (!mounted) {
    return <div>Chargement...</div>;
  }

  return (
    <Box maxWidth={900} mx="auto" p={2}>
      <Typography variant="h4" gutterBottom>
        Questions de diagnostic électrique
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Recherche par titre, catégorie, niveau, tags..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        margin="normal"
      />

      {filteredQuestions.length === 0 ? (
        <Typography variant="body1" mt={4}>
          Aucune question trouvée.
        </Typography>
      ) : (
        <List>
          {filteredQuestions.map((q) => (
            <Box
              key={q.id}
              mb={3}
              borderBottom={1}
              borderColor="divider"
              pb={2}
            >
              <ListItem disablePadding>
                <ListItemButton onClick={() => toggleSelect(q.id)}>
                  <ListItemText
                    primary={
                      <>
                        {q.titre}{" "}
                        <Chip
                          label={`${q.categorie} - ${q.niveau}`}
                          size="small"
                          color="primary"
                          sx={{ ml: 1 }}
                        />
                      </>
                    }
                  />
                  {selectedId === q.id ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              <Collapse in={selectedId === q.id} timeout="auto" unmountOnExit>
                <Box pl={4} pt={1}>
                  <Typography variant="h6" gutterBottom>
                    Symptômes
                  </Typography>
                  <List dense>
                    {q.symptomes.map((s, i) => (
                      <ListItem key={i} sx={{ pl: 2 }}>
                        <ListItemText primary={s} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="h6" gutterBottom mt={2}>
                    Outils requis
                  </Typography>
                  <List dense>
                    {q.outils_requis.map((o, i) => (
                      <ListItem key={i} sx={{ pl: 2 }}>
                        <ListItemText primary={o} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="h6" gutterBottom mt={2}>
                    Étapes
                  </Typography>
                  <List dense component="ol" sx={{ pl: 4 }}>
                    {q.etapes
                      .sort((a, b) =>
                        typeof a.numero === "number" &&
                        typeof b.numero === "number"
                          ? a.numero - b.numero
                          : 0
                      )
                      .map((e) => (
                        <ListItem
                          key={e.numero}
                          component="li"
                          sx={{ display: "list-item" }}
                        >
                          <ListItemText
                            primary={<strong>{e.description}</strong>}
                            secondary={e.details}
                          />
                        </ListItem>
                      ))}
                  </List>

                  <Typography variant="h6" gutterBottom mt={2}>
                    Normes référencées
                  </Typography>
                  <List dense>
                    {q.normes_referencees.map((n, i) => (
                      <ListItem key={i} sx={{ pl: 2 }}>
                        <ListItemText primary={n} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="h6" gutterBottom mt={2}>
                    Précautions
                  </Typography>
                  <List dense>
                    {q.precautions.map((p, i) => (
                      <ListItem key={i} sx={{ pl: 2 }}>
                        <ListItemText primary={p} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Collapse>
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
}
