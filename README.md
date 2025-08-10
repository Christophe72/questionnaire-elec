# Questionnaire Élec

Application Next.js pour l’affichage et la gestion d’un questionnaire de diagnostic électrique et d’un QCM interactif.

## Fonctionnalités

- Liste de questions de diagnostic électrique (affichage détaillé)
- QCM interactif (une question à la fois, navigation, score final)
- Filtrage des questions par mots-clés
- UI moderne avec Material UI

## Structure du projet

```
questionnaire-elec/
├── public/
├── src/
│   └── app/
│       ├── components/
│       │   ├── QuestionsList.tsx
│       │   └── Qcm.tsx
│       ├── question.json
│       ├── page.tsx
│       └── ...
├── package.json
├── README.md
└── ...
```

## Installation

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
3. Accédez à l’application sur [http://localhost:3000](http://localhost:3000)

## Personnalisation

- Modifiez `src/app/question.json` pour ajouter ou éditer les questions et QCM.
- Les composants principaux sont dans `src/app/components/`.

## Technologies

- Next.js
- React
- TypeScript
- Material UI

## Auteur

Projet réalisé en août 2025.

---

Pour toute question ou suggestion, ouvrez une issue ou contactez le mainteneur.
