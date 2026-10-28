<div align="center">

# DevConnect

### Discover developers. Explore projects. Build together.

A lightweight, responsive developer-community prototype built with HTML, CSS, and vanilla JavaScript.

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure)

</div>

---

## 🌟 About the Project

**DevConnect** is a developer directory and community landing page designed to help people discover talent, explore projects, and connect with fellow builders in one place.

Built with **plain HTML, CSS, and JavaScript**, DevConnect is a frontend-only prototype. It demonstrates a developer-network experience without requiring a backend or database.

## ✨ Features

- 👩‍💻 **Developer Directory** — browse sample developer profiles.
- 🔎 **Search & Filters** — discover people by role or skill.
- 🧩 **Project Discovery** — explore community project ideas and technology stacks.
- 🌓 **Theme Toggle** — switch between dark and light themes.
- 🤝 **Join Community Form** — submit profile details, stored in browser local storage.
- 📱 **Responsive Layout** — designed for desktop and mobile screens.

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure |
| CSS3 | Styling and responsive layouts |
| Vanilla JavaScript | Interactions and application logic |
| JSON | Sample developer and project data |

## 📁 Project Structure

```text
DevConnect/
├── index.html              # Home page
├── profile.html            # Developer listing/profile page
├── projects.html           # Community projects page
├── search.html             # Search and discovery page
├── assets/                 # SVG and static assets
├── css/                    # Stylesheets
├── data/
│   ├── developers.json     # Sample developer profiles
│   └── projects.json       # Sample community projects
├── js/
│   ├── app.js              # App bootstrap
│   ├── developers.js       # Developer page logic
│   ├── projects.js         # Project page logic
│   ├── profile.js          # Profile interactions
│   ├── search.js           # Search logic
│   ├── register.js         # Registration modal logic
│   ├── storage.js          # Local storage helpers
│   ├── theme.js            # Theme switching logic
│   └── ...
└── README.md               # Project documentation
```

## 🚀 Getting Started

Because DevConnect fetches JSON files from the `data/` directory, run it through a local web server rather than opening the HTML file directly in your browser.

### 1. Get the project files

Clone your repository:

```bash
git clone <repository-url>
cd DevConnect
```

Replace `<repository-url>` with your repository's URL. If you already have the project files, open the project folder in your terminal.

### 2. Start a local server

From the project root, run:

```bash
py -m http.server 8000
```

### 3. Open DevConnect

Visit this address in your browser:

```text
http://localhost:8000
```

To stop the server, press `Ctrl + C` in the terminal.

## 🧭 Pages Overview

| Page | What you'll find |
| --- | --- |
| **Home** | Landing page, hero section, and featured community highlights |
| **Developers** | Developer profiles and specialization filters |
| **Projects** | Community project ideas and technology stacks |
| **Search** | Search and discovery across people and projects |

## 🔐 Demo Data & Privacy

The prototype uses sample content from:

- `data/developers.json`
- `data/projects.json`

Profile details submitted through the join form are saved **only in the current browser's local storage**. They are not sent to a server or automatically shared with other users.

> **Please note:** DevConnect is a frontend demo. It does not currently include user authentication, a backend API, or real account management.

## 🗺️ Roadmap

Potential future improvements include:

- [ ] Backend integration and authentication
- [ ] Database-backed developer profiles
- [ ] Project submissions and collaboration tools
- [ ] Messaging and connection requests
- [ ] Improved search and filtering with real data

## 🎯 Project Purpose

DevConnect is a learning and prototyping project focused on building a clean, responsive interface for a developer community. It provides a foundation for experimenting with frontend design, JavaScript interactions, and data-driven UI features.

---

<div align="center">

**Made for developers who want to discover, connect, and build.**

</div>
