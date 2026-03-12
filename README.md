# CommitSensei

A GitHub profile analyzer built with a **Bauhaus design system** — geometric, bold, and unapologetically graphic.

![Bauhaus](https://img.shields.io/badge/Design-Bauhaus-D02020?style=flat-square)
![React](https://img.shields.io/badge/React-18-1040C0?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-F0C020?style=flat-square&logo=vite&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-3-1040C0?style=flat-square&logo=tailwindcss&logoColor=white)

---

## Features

- **Repo Statistics** — total stars, forks, followers, and public repos at a glance
- **Language Breakdown** — stacked bar chart with per-language repo counts
- **Contribution Graph** — 52-week activity heatmap from public GitHub events
- **Repo Explorer** — filterable and sortable grid of all public repositories
- **View Portfolio** — auto-detects portfolio links hosted on `.dev`, Netlify, Vercel, Render, or Railway

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 6 | Build tool & dev server |
| Tailwind CSS 3 | Styling with Bauhaus design tokens |
| Lucide React | Icons |
| GitHub REST API | Profile, repo, and event data |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/commitsensei.git
cd commitsensei
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your keys:

```env
# Optional — raises GitHub API rate limit from 60 to 5000 req/hr
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

**Getting a GitHub token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → select `public_repo` scope → copy

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and search any GitHub username.

---