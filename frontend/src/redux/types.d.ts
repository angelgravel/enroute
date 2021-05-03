import { TrackColor, PlayerColor } from "../../../types";

export type PlayerId = string;
export type GameToken = string;

export type Route = {
  routeId: string; // "amst_lond_1"
  takenBy: PlayerColor | null;
  length: number;
  color: TrackColor;
};

export type Routes = {
  [routeId: string]: Route;
};

/*
routes: Routes = {
  "amst_lond_1": {
    ...
  },
};
*/

export type Player = {
  nickname: string;
  color: PlayerColor;
  playerId: string;
};

export type TrackCard = {
  color: TrackColor;
  amount: number;
};

export type TrackCards = {
  [color in TrackColor]?: TrackCard;
};

export type Ticket = {
  start: string;
  end: string;
  points: number;
};

export type GameState = {
  gameToken: GameToken;
  playerId: PlayerId;
  nickname: string;
  color: PlayerColor | "";
  trackCards: TrackCards;
  tickets: Ticket[];
  tracks: number;
  points: number;
  players: Player[];
  routes: Routes;
};
