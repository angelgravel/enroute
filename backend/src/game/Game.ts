import {
  Ticket,
  PlayerTrackCards,
  TrackColor,
  PlayerEmit,
  GameRoutes,
  RouteColor,
  Routes,
} from "@typeDef/index";
import { BroadcastOperator, Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import uniqid from "uniqid";
import cloneDeep from "lodash.clonedeep";

import {
  initialGameTrackCards,
  initialPlayerTrackCards,
  playerColors,
} from "./constants";
import { PlayerColor } from "../../../types/index";
import { initialShortTickets, initialLongTickets } from "./initialTickets";
import { shuffleArray } from "../utils/helpers";
import initialRoutes from "./initialRoutes";
import { SocketError } from "utils/SocketError";

class Game {
  gameToken: string;
  creator: Player;
  gameRoomSocket: BroadcastOperator<DefaultEventsMap>;
  joinable: boolean;
  gameStarted: boolean;

  players: Player[];
  trackCards: TrackColor[];
  openTrackCards: TrackColor[];
  discardedTrackCards: TrackColor[];
  availableShortTickets: Ticket[];
  availableLongTickets: Ticket[];
  routes: GameRoutes;

  constructor(creatorSocket: Socket, io: Server) {
    this.gameToken = uniqid("game#");
    this.gameRoomSocket = io.to(this.gameToken);
    this.creator = new Player(
      creatorSocket,
      playerColors[Math.floor(Math.random() * (playerColors.length - 1))],
    );
    this.joinable = true;
    this.gameStarted = false;

    this.players = [this.creator];

    this.trackCards = shuffleArray(initialGameTrackCards);
    this.openTrackCards = [];
    this.discardedTrackCards = [];
    this.routes = cloneDeep(initialRoutes);

    this.availableShortTickets = shuffleArray(initialShortTickets);
    this.availableLongTickets = shuffleArray(initialLongTickets);

    this.gameEvents(creatorSocket);
  }

  addPlayer(socket: Socket) {
    const playerAlreadyInGame = this.players.find(
      (p) => p.socket.id === socket.id,
    );
    if (playerAlreadyInGame) {
      throw new Error("join_game/already_in_game");
    }

    const newPlayer = new Player(socket, this.assignColor());
    this.players.push(newPlayer);
    socket.join(this.gameToken);
    this.gameEvents(socket);
    if (this.players.length > 4) this.joinable = false;

    this.emitPlayers();

    return {
      playerID: newPlayer.id,
      color: newPlayer.color,
      nickname: newPlayer.nickname,
      remainingTracks: newPlayer.remainingTracks,
      haveChosenTickets: newPlayer.haveChosenTickets,
    };
  }

  emitPlayers() {
    const _players: PlayerEmit[] = [];
    for (const player of this.players) {
      _players.push({
        playerID: player.id,
        color: player.color,
        nickname: player.nickname,
        remainingTracks: player.remainingTracks,
        haveChosenTickets: player.haveChosenTickets,
      });
    }
    this.gameRoomSocket.emit("players", _players);
  }

  assignColor(): PlayerColor {
    const gamePlayerColors = this.players.map((player) => player.color);
    const availableColors = playerColors.filter(
      (color) => !gamePlayerColors.includes(color),
    );

    if (!availableColors.length) {
      throw new Error("game/all_colors_taken");
    }
    return availableColors[0];
  }

  dealTicket(player: Player, availableTickets: Ticket[]) {
    const pickedTicket = availableTickets.shift();
    if (pickedTicket) {
      player.addTicket(pickedTicket);
    } else {
      throw new Error("game/no-available-tickets");
    }
  }

  dealTrackCard(player: Player) {
    if (!this.trackCards.length) {
      this.trackCards = shuffleArray(this.discardedTrackCards);
      this.discardedTrackCards = [];
    }

    const pickedTrackCard = this.trackCards.shift();

    if (pickedTrackCard) {
      player.addTrackCard(pickedTrackCard);
    } else {
      throw new Error("game/no-available-track-cards");
    }
  }

  async setupGame(socket: Socket) {
    if (socket.id !== this.creator.socket.id) {
      socket.emit("setup_game", {
        success: false,
        message: "Unauthorized: Only the creator of a game can start",
        code: "unauthorized/creator_only",
      });

      return;
    }

    if (this.players.length < 2) {
      socket.emit("setup_game", {
        success: false,
        message: "There are not enough players to start the game",
        code: "game/not_enough_players",
      });

      return;
    }

    this.joinable = false;

    // The code below is to deal 4 random track cards and
    // 4 tickets (including 1 long ticket)

    // Loop over all players
    for (const player of this.players) {
      // Loop 4 times (because we will deal 4 tickets and 4 track cards)
      for (let step = 0; step < 4; ++step) {
        // In the first iteration, a long ticket will be dealt
        if (step == 0) {
          this.dealTicket(player, this.availableLongTickets);
        } else {
          this.dealTicket(player, this.availableShortTickets);
        }

        // For each iteration deal a random track card to the player
        this.dealTrackCard(player);
      }

      player.socket.emit("tickets", player.tickets);
      player.socket.emit("track_cards", player.trackCards);
    }
    this.gameRoomSocket.emit("routes", this.routes);
  }

  pickInitialTickets(socket: Socket, chosenTickets: Ticket[]) {
    const player = this.players.find((p) => p.socket.id === socket.id);

    if (player) {
      // Player must keep 2 tickets
      if (chosenTickets.length < 2) {
        socket.emit("pick_initial_tickets", {
          success: false,
          message: "You must keep at least two tickets",
          code: "game/must_keep_two_tickets",
        });

        return;
      }

      //Chosen tickets must match the dealt tickets
      const correctlyChosenTickets = chosenTickets.filter(
        (ct) =>
          player.tickets.filter(
            (pt) => ct.start === pt.start && ct.end === pt.end,
          ).length,
      ).length;

      if (!correctlyChosenTickets) {
        socket.emit("pick_initial_tickets", {
          success: false,
          message: "The chosen tickets doesn't match the dealt tickets",
          code: "game/incorrectly_chosen_tickets",
        });

        return;
      }

      player.tickets = Array.from(chosenTickets);
      player.haveChosenTickets = true;
      player.socket.emit("tickets", player.tickets);

      // If all players have chosen tickets => start game
      if (!this.players.find((p) => !p.haveChosenTickets)) {
        this.gameStarted = true;

        // Send five open track cards to all players
        this.openTrackCards = Array.from(this.trackCards.splice(0, 5));
        this.gameRoomSocket.emit("open_track_cards", this.openTrackCards);
      }
    } else {
      socket.emit("pick_initial_tickets", {
        success: false,
        message: "Player not found in the game",
        code: "game/player_not_found",
      });
    }
  }

  buildRoute(socket: Socket, route: Routes, chosenTrackCards: TrackColor[]) {
    const player = this.players.find((p) => p.socket.id === socket.id);
    //Separate potential bridge cards and track cards of other colors.
    const chosenBridgeCards = chosenTrackCards.filter(
      (card) => card === "bridge",
    );
    const chosenColoredTrackCards = chosenTrackCards.filter(
      (card) => card !== "bridge",
    );

    //TODO: Add check: is it the player's turn.
    try {
      if (!player) {
        throw new SocketError(
          "Player not found in the game",
          "game/player_not_found",
        );
      }
      if (!this.routes.hasOwnProperty(route)) {
        // Route does not exist
        throw new SocketError(
          "Route not found on game map.",
          "game/route_not_found",
        );
      }
      // Check if all colored cards is the same color.
      if (
        chosenColoredTrackCards.every(
          (value) => value === chosenColoredTrackCards[0],
        )
      ) {
        throw new SocketError(
          "You can not build a route with multiple types of track cards",
          "game/multiple_colored_track_cards",
        );
      }
      // Does the player have enough chosen cards?
      if (this.routes[route].length > chosenTrackCards.length) {
        throw new SocketError(
          "Not enough chosen cards to build the chosen route.",
          "game/not_enough_chosen_cards",
        );
      }
      // Does the player have enough bridges?
      // Emit track cards to player
      if (
        this.routes[route].bridges > player.trackCards.bridge.amount &&
        chosenBridgeCards.length < player.trackCards.bridge.amount
      ) {
        player.socket.emit("track_cards", {
          success: true,
          message: `The amount of bridge cards are incorrect. The ${player.nickname}s track cards are updated`,
          payload: player.trackCards,
        });
        throw new SocketError(
          "Not enough bridge cards to build the chosen route.",
          "game/not_enough_bridge_cards",
        );
      }
      // Does the player have the chosen cards of the chosen color?
      if (
        chosenColoredTrackCards.length <
        player.trackCards[chosenColoredTrackCards[0]].amount
      ) {
        throw new SocketError(
          "Not enough cards of the chosen color to build the chosen route.",
          "game/not_enough_chosen_colored_cards",
        );
      }

      /******** BUILD ROUTE ********/
      // Update players trackCards
      player.trackCards["bridge"].amount =
        player.trackCards["bridge"].amount - chosenBridgeCards.length;
      player.trackCards[chosenColoredTrackCards[0]].amount =
        player.trackCards[chosenColoredTrackCards[0]].amount -
        chosenColoredTrackCards.length;
      // Mark route as taken
      this.routes[route].builtBy = player.color;
      //Add played cards to discardedTrackCards
      this.discardedTrackCards.push(...chosenTrackCards);

      this.gameRoomSocket.emit("routes", {
        success: true,
        message: `The route ${route} was build by ${player.nickname}`,
        payload: this.routes,
      });
      player.socket.emit("track_cards", {
        success: true,
        message: `The ${player.nickname}s track cards are updated`,
        payload: player.trackCards,
      });
      // TODO: player's turn over
    } catch (error) {
      socket.emit("build_route", {
        success: false,
        message: error.message,
        code: error.code,
      });
    }
  }

  gameEvents(socket: Socket) {
    // if (Object.keys(socket.rooms).includes(this.gameToken)) {
    socket.on("setup_game", () => this.setupGame(socket));
    socket.on("pick_initial_tickets", (data: Ticket[]) =>
      this.pickInitialTickets(socket, data),
    );
    socket.on("build_route", (route: Routes, data: TrackColor[]) =>
      this.buildRoute(socket, route, data),
    );
    // }
  }
}

class Player {
  id: string;
  socket: Socket;
  color: PlayerColor;
  nickname: string;
  tickets: Ticket[];
  trackCards: PlayerTrackCards;
  remainingTracks: number;
  haveChosenTickets: boolean;

  constructor(_socket: Socket, _color: PlayerColor) {
    this.id = uniqid("player#");
    this.socket = _socket;
    this.tickets = [];
    this.trackCards = cloneDeep(initialPlayerTrackCards);
    this.color = _color;
    this.nickname = `${_color[0].toUpperCase()}${_color.substring(1)}`;
    this.remainingTracks = 45;
    this.haveChosenTickets = false;

    this.socketListeners();
  }

  setNickname(newNickname: string): void {
    this.nickname = newNickname;
  }

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  addTrackCard(color: TrackColor) {
    ++this.trackCards[color].amount;
  }

  socketListeners() {
    this.socket.on("set_nickname", (newNickname: string) =>
      this.setNickname(newNickname),
    );
  }
}

export default Game;
