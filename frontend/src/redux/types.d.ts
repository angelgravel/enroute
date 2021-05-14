import {
  PlayerColor,
  PlayerClient,
  PlayerTrackCards,
  GameRoutes,
  Ticket,
} from "@typeDef/types";

export type GameState = {
  gameToken: string;
  playerId: string;
  nickname: string;
  color: PlayerColor | "";
  trackCards: PlayerTrackCards;
  tickets: Ticket[];
  remainingTracks: number;
  points: number;
  players: PlayerClient[];
  routes: GameRoutes;
};
