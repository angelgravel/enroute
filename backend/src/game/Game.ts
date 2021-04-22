import { Socket } from "socket.io";
import uniqid from "uniqid";

type GameOptions = {
  socket: Socket;
};

type GameCard = { count: number };
type GameCards = {
  bridge: GameCard;
  blue: GameCard;
  white: GameCard;
  red: GameCard;
  black: GameCard;
  orange: GameCard;
  pink: GameCard;
  green: GameCard;
  yellow: GameCard;
};

class Game {
  gameToken: string;
  creator: Player;
  socket: Socket;
  joinable: boolean;

  players: Player[];
  gameCards: GameCards;

  constructor(_options: GameOptions) {
    this.creator = new Player(uniqid("player#"));
    this.gameToken = uniqid("game#");
    this.socket = _options.socket;
    this.joinable = true;


    this.players = [this.creator];

    this.gameCards = {
      bridge: { count: 14 },
      blue: { count: 12 },
      white: { count: 12 },
      red: { count: 12 },
      black: { count: 12 },
      orange: { count: 12 },
      pink: { count: 12 },
      green: { count: 12 },
      yellow: { count: 12 },
    };

    this.gameLoop();
  }

  addPlayer() {
    const newPlayer = new Player(uniqid("player#"));
    this.players.push(newPlayer);

    if (this.players.length > 4) this.joinable = false;

    return newPlayer.id;
  }

  pickCard() {}

  gameLoop() {
    this.socket.on("pick_card", this.pickCard);
  }
}

class Player {
  id: string;

  constructor(_id: string) {
    this.id = _id;
  }
}

export default Game;
