# EnRoute

## Mid course screencast

https://drive.google.com/drive/folders/130smoF7Di2d60U_NpGAZwllunFjOx_Kw?usp=sharing

## Background

We are going to build a game inspired by the board game Ticket to Ride. The game can be played by 2-5 players and the goal of the game is to collect points by building train Track routes on a map. The player with the highest score at the end of the game wins. Points can be collected through:

- Building a Track route between two destinations on the map
- Completing a path between to destinations given on a Destination Card
- Hold the longest path
- (Train stations kept at end of the game)

When a player has less than 3 Tracks left, the final round begins. The game ends when that same player finishes it’s turn of the final round.

## Functionalities

### Create game

- A person can create a game and becomes Game Master
- GM chooses a color to play with and..
- Generate URL to share for people to join
- GM decides when game begins after 1-4 people have joined the game

### Join game (share URL for people to join)

- Choose color (max 5 players in one room)

### Deal destination cards

- Each player get 1 long and 3 short destinations.
- Each player has to keep at least 2 destination cards.

### The Track Deck

- Shuffle and refill deck.
- Deal cards to players and keep track of actions

### Make a move (the player have three options)

1. Pick two cards from the Track deck
2. Build a Track
3. Pick up new destination cards

### Keep track (and show) each players points

- Routes built by a player
- Route between the cities on the Destination Ticket(s)
- (Current Longest route)
- (Train stations kept at end of game)

### The games ending

- When a player has less than 3 Tracks left, the final round begins

## Technologies

### Frontend

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Material UI](https://material-ui.com/)

### Backend

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Socket.io](https://socket.io/)

### Technical specification

The user interface will be built using `React` and `Material UI`. This will be done in `Typescript`. `Redux` will be used to keep track of the game state, player state and the different deck states.

`Socket.io` will be used as an bi-directional communication channel between the server and the user interface.

The server will be built using `Express.js` and `Node.js`. `MySQL` will be used to regularly store backups of the game state, in case the server crashes.

## Code Standards

The code in this repository will mostly follow the [`Airbnb JavaScript Style Guide`](https://github.com/airbnb/javascript#readme), except for their function declarations, where this repository uses arrow functions instead of the keyword
`function`
