# CommitSensei

**CommitSensei** lets you analyze any GitHub profile and get a clear picture of what a developer has built, what languages they use, and how active they are — all in one page.

---

## What it does

Enter any GitHub username and CommitSensei pulls together:

### Profile Overview
Displays the developer's avatar, bio, location, and a direct link to their GitHub profile.

### Statistics
A quick summary of their total repositories, stars earned, forks received, and follower count.

### Language Breakdown
Shows which programming languages appear across their repositories, visualized as a proportional bar with per-language repo counts.

### Contribution Graph
A 52-week heatmap of their public GitHub activity — pushes, pull requests, issues, and more — so you can see how consistently they've been contributing.

### Repository Explorer
Browse all their public repositories with filtering by name or language and sorting by stars, forks, or last updated. Each card shows the repo description, topics, language, and links directly to GitHub.

### Portfolio Link
If the developer has a portfolio site deployed on Netlify, Vercel, Render, Railway, or a `.dev` domain, a **View Portfolio** button appears automatically — no manual searching required.

---

## Setup

```bash
npm install
cp .env.example .env   # add your VITE_GITHUB_TOKEN
npm run dev
```

A GitHub token is optional but recommended — without one, the GitHub API limits you to 60 requests per hour.
