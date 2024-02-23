# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Pokémon API React App

This React application allows users to explore Pokémon characters using the [PokéAPI](https://pokeapi.co/). Users can view details about each Pokémon, including images, stats, and types. The app features a game mode where users can test their knowledge by guessing Pokémon based on images and hints.

## Features

- **Guessing Game:** A game mode where users try not to click the same Pokémon twice in same level.
- **High Score Tracking:** Keep track of your highest scores.
- **Score Tracking:** Keep track of current score.
- **5 Levels:** Each level doubles number of Pokémon.
- **Responsive Design:** Optimized for both desktop and mobile viewing.

## Live Preview
    https://main--pokemon-click-memory-game.netlify.app/

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 12 or newer)
- npm (normally comes with Node.js)

### Installation

1. Clone the repository to your local machine:
    git clone https://github.com/dielawn/memory_game
2. Navigate to the cloned repository:
    cd your-pokemon-dir
3. Install the necessary npm packages:
    npm install
4. Start the development server:
    npm start
The application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- **Playing the Game:** Click any Pokémon but be careful because the order of Pokémon shuffle with each click! Automatic level up on level compleation. New Game button on game over.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [PokéAPI](https://pokeapi.co/) - API for fetching Pokémon data

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to the PokéAPI for providing a free and open API for Pokémon data.
- This project was inspired by my love for Pokémon, The Odin Project and learning React.


