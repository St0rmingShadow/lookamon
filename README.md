# Lookamon 🎮⚡

A responsive **Pokémon database** built with **Angular 22**, pulling live data from [PokéAPI](https://pokeapi.co/). Browse, search, and sort Pokémon with a clean UI and a built-in dark mode.

---

## ✨ Features

- 🔍 **Search** Pokémon by name
- ↕️ **Sort** by name, ID, or type
- 🌙 **Dark mode** theme toggle
- 📱 **Fully responsive** layout (mobile → desktop)
- ⚡ **Live data** from PokéAPI
- 🎨 Clean, component-driven UI

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Angular 22 |
| Language | TypeScript |
| Data source | [PokéAPI](https://pokeapi.co/) |
| State / Async | RxJS |
| Styling | SCSS |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS)
- Angular CLI: `npm install -g @angular/cli`

### Installation

```bash
# Clone the repo
git clone https://github.com/St0rmingShadow/lookamon.git
cd lookamon

# Install dependencies
npm install

# Start the dev server
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Build

```bash
ng build
```

Build artifacts go to `dist/`.

## 🗺 Roadmap

- [ ] Pokémon detail page / modal
- [ ] Filter by type
- [ ] Favorites (localStorage)
- [ ] Live demo deployment

---

## 📄 License

This project is open source. See the repository for details.

---

## 🙏 Acknowledgements

- [PokéAPI](https://pokeapi.co/) for the free public data
- Pokémon is © Nintendo / Game Freak / Creatures Inc. This is a fan project for learning purposes.