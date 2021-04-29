import {} from "";

type PlayerId = string;
type GameToken = string;

type Route = {
  routeId: string; // "amst_lond_1"
  takenBy: PlayerColor | null;
  length: number;
  color: TrackColor;
};

type Routes = {
  [routeId: string]: Route;
};
/*
routes: Routes = {
  "amst_lond_1": {
    ...
  },
};
*/

type Player = {
  nickname: string;
  color: PlayerColor;
};

type TrackCard = {
  color: TrackColor;
  amount: number;
};

type TrackCards = {
  [color: TrackColor]: TrackCard;
};

type Ticket = {
  start: string;
  end: string;
  points: number;
};

type GameState = {
  gameToken: GameToken;
  playerId: PlayerId;
  nickname: string;
  color: PlayerColor;
  trackCards: TrackCards;
  tickets: Ticket[];
  tracks: number;
  points: number;
  players: Player[];
  routes: Routes;
};
