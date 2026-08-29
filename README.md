# 🎲 Tenzies Game

A modern, interactive **Tenzies dice game** built with **React and Vite**, featuring multiple difficulty levels, real-time scoring, a stopwatch, persistent leaderboards, accessibility improvements, and animated win feedback.

🎮 **[Play the Game](https://tenzies-tu-7422.vercel.app/)**

---

## 🎯 About the Game

**Tenzies** is a dice game where the goal is to get every die to show the same value.

Hold dice between rolls to keep the numbers you want, then roll the remaining dice until you have a matching set.

This version expands on the traditional Tenzies concept with:

- 🎚️ Multiple difficulty levels
- ⏱️ A real-time game timer
- 🧮 Dynamic scoring
- 🏆 Persistent leaderboards
- 🎊 Win animations
- ♿ Accessibility improvements
- 📱 Responsive interface

---

## ✨ Features

### 🎲 Core Gameplay

- Roll multiple dice at once
- Hold individual dice between rolls
- Held dice maintain their values when rolling
- Automatic win detection
- Start a new game after winning
- Roll counter

### 🎚️ Difficulty Levels

Choose between three difficulty levels:

| Difficulty | Dice | Multiplier |
|------------|------|------------|
| 🟢 Easy | 8 | ×1 |
| 🟡 Normal | 10 | ×1.5 |
| 🔴 Hard | 12 | ×2 |

The number of dice changes dynamically when the difficulty is changed.

---

### ⏱️ Real-Time Timer

The game includes a millisecond-based stopwatch that tracks how long it takes to complete a game.

The timer:

- Starts when the player begins interacting with the dice
- Updates continuously during gameplay
- Stops automatically when the game is won
- Resets when starting a new game or changing difficulty

Time is displayed in:

```text
MM:SS.mmm
```

---

### 🧮 Dynamic Scoring

Your final score is calculated using the selected difficulty, completion time, and number of rolls.

The scoring system uses:

```text
Base Score × Difficulty Multiplier
            - Time Penalty
            - Roll Penalty
```

#### Difficulty Multipliers

```text
Easy    → ×1
Normal  → ×1.5
Hard    → ×2
```

#### Penalties

```text
Time Penalty → -20 points / second
Roll Penalty → -100 points / roll
```

The final score cannot fall below zero.

---

### 🏆 Persistent Leaderboard

The game keeps track of player performance using **browser `localStorage`**.

For each difficulty, the leaderboard stores:

- 🥇 Top 3 highest scores
- 🎯 Top 3 games with the fewest rolls

Leaderboard data remains available even after refreshing the page.

The leaderboard is separated by difficulty, allowing players to compete against their own best performance in each mode.

---

### 🎊 Win Celebration

Winning a game triggers an animated confetti effect using:

```text
react-confetti-boom
```

The game also displays the player's final score after completing a round.

---

### ♿ Accessibility

Accessibility was considered during development.

The game includes:

- Semantic interactive elements
- Keyboard-focusable controls
- `aria-live` status announcements
- Focus management after winning
- Clear game instructions
- Accessible difficulty controls

After winning, focus is automatically moved to the **New Game** button so the player can immediately start another round.

---

## 🕹️ How to Play

### 1. Choose a Difficulty

Select:

```text
Easy → 8 dice
Normal → 10 dice
Hard → 12 dice
```

### 2. Roll the Dice

Click **Roll** to generate random values.

### 3. Hold Dice

Click a die to hold it.

Held dice will not change during the next roll.

### 4. Keep Rolling

Continue holding matching values while rolling the remaining dice.

### 5. Win

You win when:

```text
All dice have the same value
+
All dice are held
```

### 6. Beat Your Score

Once you win, your score is calculated and your result can be added to the leaderboard.

Try to:

- Use fewer rolls
- Finish faster
- Choose a harder difficulty

---

## 🧠 Game Logic

Each die is represented as an object containing its value, held state, and a unique ID.

Conceptually:

```js
{
  value: 4,
  isheld: false,
  id: "unique-id"
}
```

A win is detected when every die is held and every die has the same value:

```js
dice.every(die => die.isheld) &&
dice.every(die => die.value === dice[0].value)
```

When rolling, held dice remain unchanged while unheld dice receive a new random value.

---

## 🏆 Leaderboard Logic

Leaderboard data is stored in the browser using:

```js
localStorage
```

The application maintains separate records for:

```text
Easy
├── Least Rolls
└── Highest Score

Normal
├── Least Rolls
└── Highest Score

Hard
├── Least Rolls
└── Highest Score
```

Only the top three results are retained for each category.

This means the leaderboard works without requiring a backend or external database.

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| ⚛️ React 19 | UI and application state |
| ⚡ Vite 8 | Development and production build tooling |
| 🟨 JavaScript | Game logic and state management |
| 🎨 CSS | Styling and responsive layout |
| 💾 localStorage | Persistent leaderboard data |
| 🎊 react-confetti-boom | Win celebration |
| 🆔 Nanoid | Unique dice identifiers |
| 🔍 Oxlint | Code linting |

The current project dependencies include React 19, React DOM, `react-confetti-boom`, Vite, Nanoid, and Oxlint.

---

## 📁 Project Structure

```text
Tenzies-Game/
│
├── public/
│   ├── dice.svg
│
├── src/
│   ├── components/
│   │   ├── css/
│   │   │   └── app.css
│   │   │
│   │   └── pages/
│   │       ├── App.jsx
│   │       ├── die.jsx
│   │       └── LeaderBoard.jsx
│   │
│   ├── utils/
│   │   └── leaderboard.js
│   │
│   └── main.jsx
│
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

The current repository separates the main game, individual dice, leaderboard UI, styling, and leaderboard persistence logic into different files.

---

## 💻 Getting Started

### Prerequisites

Make sure you have:

- Node.js
- npm
- A modern web browser

### Clone the Repository

```bash
git clone https://github.com/TanayUmre/Tenzies-Game.git
```

### Navigate to the Project

```bash
cd Tenzies-Game
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Preview Production Build

```bash
npm run preview
```

Runs the production build locally for testing.

### Lint

```bash
npm run lint
```

Runs Oxlint against the project.

These scripts are defined in the project's current `package.json`.

---

## 🌐 Deployment

The application is deployed using **Vercel**.

### Live Application

🎮 **[https://tenzies-tu-7422.vercel.app/](https://tenzies-tu-7422.vercel.app/)**

The production deployment is connected to the GitHub repository, allowing the application to be built and deployed for web access.

---

## 🧩 Key React Concepts Used

This project makes use of several React concepts, including:

### State Management

```js
useState()
```

Used for managing:

- Dice
- Difficulty
- Timer
- Score
- Rolls
- Leaderboard
- Timer state

### Side Effects

```js
useEffect()
```

Used for:

- Running the game timer
- Detecting completed games
- Managing post-win focus
- Saving completed scores

### References

```js
useRef()
```

Used for:

- Managing button focus
- Preventing duplicate score submissions

### Component-Based Architecture

The application separates responsibilities into components such as:

```text
App
├── Die
└── LeaderBoard
```

This keeps the main game logic separate from individual UI elements.

---

## 📚 What I Learned

While building this project, I practiced and strengthened my understanding of:

- React functional components
- React Hooks
- State management
- Derived state
- `useEffect` and cleanup functions
- `useRef` for DOM focus management
- Component composition
- Immutable state updates
- Conditional rendering
- Event handling
- Random number generation
- Timers with `setInterval`
- Browser `localStorage`
- Client-side persistence
- Accessibility with ARIA
- Responsive UI design
- Game-state management
- Score calculation
- Frontend deployment with Vercel
- Code quality and linting with Oxlint

---

## 🔮 Future Improvements

Some ideas for future versions:

- 🌎 Online global leaderboard
- 👤 Player names for leaderboard entries
- ☁️ Backend/database-powered scores
- 🔐 User accounts
- 🎨 Additional themes
- 🌙 Dark mode
- 🔊 Sound effects
- ✨ Dice roll animations
- 📊 More detailed player statistics
- 🥇 Personal best indicators
- 📱 Further mobile UI improvements

---

## 🙏 Acknowledgements

This project was created as part of my journey learning and building applications with React.

The project started from the basic Tenzies concept and was expanded with additional gameplay systems, scoring, difficulty levels, persistence, accessibility, and deployment.

---

## 👨‍💻 Author

**Tanay Umre**

GitHub: [@TanayUmre](https://github.com/TanayUmre)

---

## ⭐ Support

If you enjoyed the game or found the project interesting, consider giving the repository a ⭐ on GitHub.

### 🎲 Roll. Hold. Match. Compete.

Built with ❤️ using **React + Vite**.
