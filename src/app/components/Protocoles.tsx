"use client";
import React, { useState } from "react";
import protocoles from "../protocoles.json";
import "../globals.css";

interface Protocole {
  id: string;
  titre: string;
  etapes: string[];
}

const Protocoles = () => {
  const [selectedProtocole, setSelectedProtocole] = useState<Protocole | null>(
    null
  );

  const handleSelectProtocole = (id: string) => {
    const protocole = protocoles.find((p) => p.id === id) as
      | Protocole
      | undefined;
    if (protocole) {
      setSelectedProtocole(protocole);
    }
  };

  return (
    <div className="protocoles-container">
      <h1 className="title">Protocoles</h1>
      {!selectedProtocole ? (
        <ul className="protocoles-list">
          {protocoles.map((protocole: Protocole) => (
            <li key={protocole.id} className="protocoles-item">
              <button
                className="protocoles-button"
                onClick={() => handleSelectProtocole(protocole.id)}
              >
                {protocole.titre}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="protocole-details">
          <h2 className="protocole-title">{selectedProtocole.titre}</h2>
          <ol className="etapes-list">
            {selectedProtocole.etapes.map((etape: string, index: number) => (
              <li key={index} className="etapes-item">
                {etape}
              </li>
            ))}
          </ol>
          <div className="navigation-buttons">
            {protocoles.map((protocole: Protocole) => (
              <button
                key={protocole.id}
                className="navigation-button"
                onClick={() => handleSelectProtocole(protocole.id)}
              >
                {protocole.titre}
              </button>
            ))}
          </div>
          <button
            className="back-button"
            onClick={() => setSelectedProtocole(null)}
          >
            Retour
          </button>
        </div>
      )}
    </div>
  );
};

export default Protocoles;
