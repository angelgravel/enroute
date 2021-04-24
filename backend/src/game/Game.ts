import { BroadcastOperator, Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
// import { DefaultEventsMap } from "socket.io/dist/typed-events";
import uniqid from "uniqid";

type GameOptions = {
  io: Server;
  creatorSocket: Socket;
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
  gameRoomSocket: BroadcastOperator<DefaultEventsMap>;
  joinable: boolean;

  players: Player[];
  gameCards: GameCards;

  constructor(_options: GameOptions) {
    this.gameToken = uniqid("game#");
    this.gameRoomSocket = _options.io.to(this.gameToken);
    this.creator = new Player(_options.creatorSocket);
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

  addPlayer(socket: Socket) {
    const newPlayer = new Player(socket);
    this.players.push(newPlayer);
    socket.join(this.gameToken);
    if (this.players.length > 4) this.joinable = false;

    return newPlayer.id;
  }

  pickCard() {
    // this.io.to(this.gameToken).emit("user ... picked a goddam card!");

  }

  gameLoop() {
    // this.socket.on("pick_card", this.pickCard);
  }
}

class Player {
  id: string;
  socket: Socket

  constructor(_socket: Socket) {
    this.id = uniqid("player#");
    this.socket = _socket;
  }
}

export default Game;
