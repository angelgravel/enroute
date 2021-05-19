import {
  PlayerColor,
  PlayerClient,
  PlayerTrackCards,
  GameRoutes,
  GameRoute,
  Ticket,
  Route,
} from "@typeDef/index";

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
  routes: GameRoutes;
};

export type ChosenRouteState = {
  id?: Route;
  builtBy?: PlayerColor | null;
  color?: RouteColor;
  bridges?: number;
  length?: number;
};
