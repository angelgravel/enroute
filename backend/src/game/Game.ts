import {
  Ticket,
  PlayerTrackCards,
  TrackColor,
  GameRoutes,
  RouteColor,
  Route,
  PlayerAction,
  PlayerClient,
  SocketResponse,
  AddSocketPayload,
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
import { SocketError } from "../utils/SocketError";

class Game {
  gameToken: string;
  creator: Player;
  gameRoomSocket: BroadcastOperator<DefaultEventsMap> | undefined;
  joinable: boolean;
  gameStarted: boolean;

  players: Player[];
  trackCards: TrackColor[];
  openTrackCards: TrackColor[];
  discardedTrackCards: TrackColor[];
  availableShortTickets: Ticket[];
  availableLongTickets: Ticket[];
  routes: GameRoutes;

  constructor() {
    this.gameToken = uniqid("game#");
    this.gameRoomSocket = undefined;
    this.creator = new Player(
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
  }

  addSocket(_socket: Socket, _io: Server, playerId: string) {
    if (playerId == this.creator.id) {
      this.gameRoomSocket = _io.to(this.gameToken);
    }

    const playerIdx = this.players.findIndex(
      (_player) => _player.id === playerId,
    );
    if (playerIdx !== -1) {
      _socket.join(this.gameToken);
      this.players[playerIdx].setSocket(_socket);
      this.gameEvents(_socket);
    }

    this.emitPlayers();
  }

  addPlayer() {
    // const playerAlreadyInGame = this.players.find(
    //   (p) => p.id === socket.id,
    // );
    // if (playerAlreadyInGame) {
    //   throw new Error("join_game/already_in_game");
    // }

    const newPlayer = new Player(this.assignColor());
    this.players.push(newPlayer);
    if (this.players.length > 4) this.joinable = false;

    return {
      playerId: newPlayer.id,
      color: newPlayer.color,
      nickname: newPlayer.nickname,
      remainingTracks: newPlayer.remainingTracks,
      haveChosenTickets: newPlayer.haveChosenTickets,
    };
  }

  emitPlayers() {
    if (this.gameRoomSocket) {
      const _players: PlayerClient[] = [];
      for (const player of this.players) {
        _players.push({
          playerId: player.id,
          color: player.color,
          nickname: player.nickname,
          remainingTracks: player.remainingTracks,
          haveChosenTickets: player.haveChosenTickets,
        });
      }
      this.gameRoomSocket.emit("players", _players);
    }
  }

  assignColor(): PlayerColor {
    const gamePlayerColors = this.players.map((player) => player.color);
    const availableColors = playerColors.filter(
      (color) => !gamePlayerColors.includes(color),
    );

    if (!availableColors.length) {
      throw new SocketError("All colors are taken", "game/all_colors_taken");
    }
    return availableColors[0];
  }

  dealTicket(player: Player, availableTickets: Ticket[]) {
    const pickedTicket = availableTickets.shift();
    if (pickedTicket) {
      player.addTicket(pickedTicket);
    } else {
      throw new SocketError(
        "No available tickets",
        "game/no-available-tickets",
      );
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
      throw new SocketError(
        "No available track cards",
        "game/no-available-track-cards",
      );
    }
  }

  pickTrackCard() {
    if (!this.trackCards.length) {
      this.trackCards = shuffleArray(this.discardedTrackCards);
      this.discardedTrackCards = [];
    }

    const pickedTrackCard = this.trackCards.shift();

    if (pickedTrackCard) {
      return pickedTrackCard;
    } else {
      throw new SocketError(
        "No available track cards",
        "game/no-available-track-cards",
      );
    }
  }

  private async setupGame(socket: Socket) {
    try {
      if (socket.id !== this.creator.socket?.id) {
        throw new SocketError(
          "Unauthorized: Only the creator of a game can start",
          "unauthorized/creator_only",
        );
      }

      // TODO: Uncomment
      // Disabled so you don't need >=2
      // players to test funcitonality
      // if (this.players.length < 2) {
      //   throw new SocketError(
      //     "There are not enough players to start the game",
      //     "game/not_enough_players",
      //   );
      // }

      this.joinable = false;

      // The code below is to deal 4 random track cards and
      // 4 tickets (including 1 long ticket)

      // Loop over all players
      for (const player of this.players) {
        // Check if player is connected
        if (player.socket) {
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
      }
      this.gameRoomSocket?.emit("routes", this.routes);
    } catch (error) {
      socket.emit("setup_game", {
        success: false,
        message: error.message,
        code: error.code,
      });
    }
  }

  private pickInitialTickets(socket: Socket, chosenTickets: Ticket[]) {
    try {
      const player = this.players.find(
        (p) => p.socket && p.socket.id === socket.id,
      );

      if (!player) {
        throw new SocketError(
          "Player not found in the game",
          "game/player_not_found",
        );
      }

      if (!player.socket) {
        throw new SocketError("Player inactive", "game/player_inactive");
      }

      // Player must keep 2 tickets
      if (chosenTickets.length < 2) {
        throw new SocketError(
          "You must keep at least two tickets",
          "game/must_keep_two_tickets",
        );
      }

      //Chosen tickets must match the dealt tickets
      const correctlyChosenTickets = chosenTickets.filter(
        (ct) =>
          player.tickets.filter(
            (pt) => ct.start === pt.start && ct.end === pt.end,
          ).length,
      ).length;

      if (!correctlyChosenTickets) {
        throw new SocketError(
          "The chosen tickets doesn't match the dealt tickets",
          "game/incorrectly_chosen_tickets",
        );
      }

      player.tickets = Array.from(chosenTickets);
      player.haveChosenTickets = true;
      player.socket.emit("tickets", player.tickets);

      // If all players have chosen tickets => start game
      if (!this.players.find((p) => !p.haveChosenTickets)) {
        this.gameStarted = true;

        // Send five open track cards to all players
        this.openTrackCards = Array.from(this.trackCards.splice(0, 5));
        this.gameRoomSocket?.emit("open_track_cards", this.openTrackCards);
      }
    } catch (error) {
      socket.emit("pick_initial_tickets", {
        success: false,
        message: error.message,
        code: error.code,
      });
    }
  }

  private buildRoute(
    socket: Socket,
    route: Route,
    chosenTrackCards: TrackColor[],
  ) {
    const player = this.players.find(
      (p) => p.socket && p.socket.id === socket.id,
    );
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
        socket.emit("track_cards", {
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

      this.gameRoomSocket?.emit("routes", {
        success: true,
        message: `The route ${route} was build by ${player.nickname}`,
        payload: this.routes,
      });
      socket.emit("track_cards", {
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

  private pickCardFromOpenTracksCards(
    socket: Socket,
    pickedTrackCard: TrackColor,
  ) {
    const player = this.players.find(
      (p) => p.socket && p.socket.id === socket.id,
    );
    try {
      if (!player) {
        throw new SocketError(
          "Player not found in the game",
          "game/player_not_found",
        );
      }
      //TODO: Check so its this players turn
      //Does the pickedTrackCard exist in openTrackCards
      if (!this.openTrackCards.includes(pickedTrackCard)) {
        throw new SocketError(
          "The picked track card does not exist in the openTrackCards array",
          "game/openTrackCard_not_found",
        );
      }
      //If the player built a route on the same turn its the next players turn
      if (player.previousAction === "built_route") {
        // TODO: Next players turn
        throw new SocketError(
          "No more actions left after built route.",
          "game/no_actions_left",
        );
      }
      // If
      if (
        player.previousAction === "picked_track_card" &&
        pickedTrackCard === "bridge"
      ) {
        // TODO: Next players turn
        throw new SocketError(
          "You can not pick up a Bridge card on this move",
          "game/not_able_to_pick_up_bridge",
        );
      }
      /******* Update openTrackCards ******/
      let index = this.openTrackCards.indexOf(pickedTrackCard);
      this.openTrackCards.splice(index, 1);
      let newTrackCard = this.pickTrackCard();
      this.openTrackCards.push(newTrackCard);
      /******* Update players previousAction state ******/
      if (player.previousAction === "none") {
        if (pickedTrackCard === "bridge") {
          player.previousAction = "none";
          // TODO: Next players turn
        } else {
          player.previousAction = "picked_track_card";
        }
      }
      /******* Update players trackCards ******/
      player.trackCards[pickedTrackCard].amount =
        player.trackCards[pickedTrackCard].amount + 1;
      socket.emit("track_cards", {
        success: true,
        message: `Player ${player.nickname} picked up a card from open track cards`,
        payload: player.trackCards,
      });
    } catch (error) {
      socket.emit("pick_card_from_openTrackCards", {
        success: false,
        message: error.message,
        code: error.code,
      });
    }
  }

  private pickCardFromTracksCards(socket: Socket) {
    const player = this.players.find(
      (p) => p.socket && p.socket.id === socket.id,
    );
    try {
      if (!player) {
        throw new SocketError(
          "Player not found in the game",
          "game/player_not_found",
        );
      }
      //TODO: Check so its this players turn

      /******* Update players previousAction state ******/
      if (player.previousAction === "none") {
        player.previousAction = "picked_track_card";
      } else {
        player.previousAction = "none";
        //TODO: New players turn
      }
      /******* Update players trackCards ******/
      let newTrackCard = this.pickTrackCard();
      player.trackCards[newTrackCard].amount =
        player.trackCards[newTrackCard].amount + 1;

      socket.emit("track_cards", {
        success: true,
        message: `The ${player.nickname} picked up a card`,
        payload: player.trackCards,
      });
    } catch (error) {
      socket.emit("pick_card_from_TrackCards", {
        success: false,
        message: error.message,
        code: error.code,
      });
    }
  }

  gameEvents(socket: Socket) {
    socket.on("setup_game", () => this.setupGame(socket));
    socket.on("pick_initial_tickets", (data: Ticket[]) =>
      this.pickInitialTickets(socket, data),
    );
    socket.on("build_route", (route: Route, data: TrackColor[]) =>
      this.buildRoute(socket, route, data),
    );
    socket.on("pick_card_from_openTrackCards", (data: TrackColor) =>
      this.pickCardFromOpenTracksCards(socket, data),
    );
    socket.on("pick_card_from_TrackCards", () =>
      this.pickCardFromTracksCards(socket),
    );

    const response: SocketResponse<AddSocketPayload> = {
      success: true,
      message: "add_socket/added",
      payload: "You are now connected to the game",
    };
    socket.emit("add_socket", response);
  }
}

class Player {
  id: string;
  socket?: Socket;
  color: PlayerColor;
  nickname: string;
  tickets: Ticket[];
  trackCards: PlayerTrackCards;
  remainingTracks: number;
  haveChosenTickets: boolean;
  previousAction: PlayerAction;

  constructor(_color: PlayerColor) {
    this.id = uniqid("player#");
    // this.socket = _socket;
    this.tickets = [];
    this.trackCards = cloneDeep(initialPlayerTrackCards);
    this.color = _color;
    this.nickname = `${_color[0].toUpperCase()}${_color.substring(1)}`;
    this.remainingTracks = 45;
    this.haveChosenTickets = false;
    this.previousAction = "none";

    this.socketListeners();
  }

  setSocket(_socket: Socket) {
    this.socket = _socket;
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
    if (this.socket) {
      this.socket.on("set_nickname", (newNickname: string) =>
        this.setNickname(newNickname),
      );
    }
  }
}

export default Game;
