import {
  Ticket,
  PlayerTrackCards,
  TrackColor,
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

  private async setupGame(socket: Socket) {
    if (socket.id !== this.creator.socket?.id) {
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
  }

  private pickInitialTickets(socket: Socket, chosenTickets: Ticket[]) {
    const player = this.players.find(
      (p) => p.socket && p.socket.id === socket.id,
    );

    if (!player) {
      socket.emit("pick_initial_tickets", {
        success: false,
        message: "Player not found in the game",
        code: "game/player_not_found",
      });
      return;
    }

    if (!player.socket) {
      socket.emit("pick_initial_tickets", {
        success: false,
        message: "Player inactive",
        code: "game/player_inactive",
      });
      return;
    }

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
      this.gameRoomSocket?.emit("open_track_cards", this.openTrackCards);
    }
  }

  gameEvents(socket: Socket) {
    socket.on("setup_game", () => this.setupGame(socket));
    socket.on("pick_initial_tickets", (data: Ticket[]) =>
      this.pickInitialTickets(socket, data),
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

  constructor(_color: PlayerColor) {
    this.id = uniqid("player#");
    // this.socket = _socket;
    this.tickets = [];
    this.trackCards = cloneDeep(initialPlayerTrackCards);
    this.color = _color;
    this.nickname = `${_color[0].toUpperCase()}${_color.substring(1)}`;
    this.remainingTracks = 45;
    this.haveChosenTickets = false;

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
