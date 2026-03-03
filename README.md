# Scénariothèque

> Votre bibliothèque de référence pour les scénarios de jeux de rôle

Scénariothèque est une application web de recensement et de gestion de scénarios JDR publiés (livres, magazines), avec moteur de recherche avancé et gestion de collection personnelle.

---

## Fonctionnalités

### Noyau — Recensement
- Référencement de scénarios publiés (livres, magazines, fanzines)
- Classement par contexte : Science-Fiction, Fantasy, Horreur
- Filtrage par système de jeu : D&D, Appel de Cthulhu, Pathfinder, etc.
- Moteur de recherche avancé : genre, type, auteur, année, système de jeu

### Bonus — Gestion de collection
- Suivi personnel : wishlist, possédés, joués, maîtrisés
- Notation et commentaires par scénario
- Gestion d'amis et système de recommandations

---

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React, JavaScript |
| Backend | Node.js, Express.js |
| Base de données | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | OAuth (à définir) |

---

## Structure du projet
```
Scenariotheque/
├── frontend/         # Application React
├── backend/          # Serveur Express
│   ├── src/
│   │   ├── config/       # Configuration (Prisma, etc.)
│   │   ├── controllers/  # Logique métier
│   │   ├── middlewares/  # Middlewares Express
│   │   └── routes/       # Définition des routes
│   └── prisma/           # Schéma & migrations
└── documentations/   # Diagrammes UML
```

---

## Installation

### Prérequis
- Node.js >= 18
- npm
- Un projet Supabase avec les variables d'environnement configurées

### Cloner le projet
```bash
git clone https://github.com/Skaykleo/Scenariotheque.git
cd Scenariotheque
```

### Backend
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

> Le serveur démarre sur `http://localhost:8000`
> Point de contrôle : `GET http://localhost:8000/api/health`

### Frontend
```bash
cd frontend
npm install
npm start
```

> L'application démarre sur `http://localhost:3000`

---

## Roadmap

- [x] Mise en place du serveur Express
- [x] Schéma Prisma & migrations initiales
- [ ] Couche DAO & métier
- [ ] Routes API (scénarios, genres, systèmes de jeu)
- [ ] Interface de consultation
- [ ] Système d'authentification
- [ ] Gestion de collection personnelle *(bonus)*
- [ ] Notation, commentaires, recommandations *(bonus)*

---

> Projet réalisé dans le cadre d'un sujet de conception
