# Lookamon

A responsive, modern Pokémon database built with Angular 22. Lookamon allows users to search for Pokémon by name or ID, explore a curated list of popular creatures, and view detailed stats, abilities, and habitat information.

**Live Demo:** [https://lookamon.vercel.app/](https://lookamon.vercel.app/)

## Features

-   **Live Search:** Filter through over 1000 Pokémon by name or Pokédex ID.
-   **Sorting:** Sort search results by ID or name (ascending or descending).
-   **Detailed Profiles:** View official artwork, base stats, abilities (with descriptions), height, weight, and habitat data.
-   **Explore Page:** Browse a curated grid of 20 popular Pokémon, clickable for quick access to their details.
-   **Dark Mode:** Fully themed light and dark modes that persist across sessions using `localStorage`.
-   **Responsive Design:** Optimized for mobile, tablet, and desktop, featuring a custom bottom navigation tab bar on mobile screens.
-   **Modern UI:** Built with CSS Grid, Flexbox, CSS Variables, and a custom inline SVG logo.
-   **Data Source:** Powered by [PokéAPI](https://pokeapi.co/).

## Tech Stack

-   **Framework:** Angular 22 (Standalone components, Signals, `httpResource`)
-   **Styling:** SCSS (BEM naming convention), CSS Variables
-   **API:** PokéAPI
-   **Deployment:** Vercel
-   **Fonts:** Nunito Sans ` Inter (via Google Fonts)

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

You need to have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/St0rmingShadow/lookamon.git
    ```

2.  Navigate into the project directory:
    ```bash
    cd lookamon
    ```

3.  Install the dependencies:
    ```bash
    npm install
    ```

4.  Start the development server:
    ```bash
    ng serve
    ```

5.  Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

To build the project for production, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Project Architecture

The project follows a standard Angular architecture, separating core logic from UI components:

-   `src/app/core/`: Contains the `CreatureService`, `ThemeService`, and TypeScript models/interfaces.
-   `src/app/components/`: Contains all standalone UI components (Pages, Layouts, and Shared components like Badges, Cards, and Stat Bars).
-   `src/styles.scss`: Global styles, CSS resets, and the light/dark mode CSS variable palettes.

## License

This is a fan-made project. Pokémon and all respective names and images are trademarks of Nintendo, Game Freak, and The Pokémon Company. This project is not affiliated with or endorsed by them. It is intended for educational and portfolio purposes only.