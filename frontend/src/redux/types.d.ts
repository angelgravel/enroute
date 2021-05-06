import {
  PlayerColor,
  PlayerClient,
  PlayerTrackCards,
  Routes,
  Ticket,
} from "../../../types";

export type GameState = {
  gameToken: string;
  playerId: string;
  nickname: string;
  color: PlayerColor | "";
  trackCards: PlayerTrackCards;
  tickets: Ticket[];
  tracks: number;
  points: number;
  players: PlayerClient[];
  routes: Routes;
};
