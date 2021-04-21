import crypto from "crypto";
import { Socket } from "socket.io";

type GameOptions = {
  socket: Socket;
  players: string[];
};

type GameCard = { count: number };
type GameCards = {
  wild: GameCard;
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
  creator: string;
  socket: Socket;
  joinable: boolean;

  players: Player[];
  gameCards: GameCards;

  constructor(_creator: string, _options: GameOptions) {
    this.creator = _creator;
    this.gameToken = this.generateGameToken();
    this.socket = _options.socket;
    this.joinable = true;

    this.players = [];
    for (const player of _options.players) {
      this.players.push(new Player(player));
    }
    this.gameCards = {
      wild: { count: 14 },
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

  generateGameToken(): string {
    return crypto
      .createHmac("sha256", process.env.HASH_SALT as any)
      .update(this.creator)
      .digest("hex");
  }

  addPlayer(playerId: string) {
    this.players.push(new Player(playerId));

    if (this.players.length > 4) this.joinable = false;
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
