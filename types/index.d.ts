export type SocketResponse<T> = {
  success: boolean;
  message?: string;
  payload: T;
};

type CreateJoinSocketPayload = {
  gameToken: string;
  player: PlayerClient;
};

export type AddSocketEmit = {
  gameToken: string;
  playerId: string;
};

export type AddSocketPayload = string;

type PlayerClient = {
  playerId: string;
  color: PlayerColor;
  nickname: string;
  remainingTracks: number;
  haveChosenTickets: boolean;
};

export type SocketEvent =
  | "add_socket"
  | "pick_initial_tickets"
  | "open_track_cards"
  | "tickets"
  | "track_cards"
  | "setup_game"
  | "players";

export type PlayerTrackCard = {
  color: TrackColor;
  amount: number;
};

export type PlayerTrackCards = {
  [color in TrackColor]: PlayerTrackCard;
};

export type Ticket = {
  start: City;
  end: City;
  points: number;
};

export type TrackColor =
  | "blue"
  | "orange"
  | "red"
  | "black"
  | "white"
  | "green"
  | "yellow"
  | "pink"
  | "bridge";

export type PlayerColor = "black" | "blue" | "red" | "green" | "yellow";

export type City =
  | "edinburgh"
  | "warszawa"
  | "gdansk"
  | "copenhagen"
  | "stockholm"
  | "riga"
  | "moscow"
  | "voronezh"
  | "kharkiv"
  | "smolensk"
  | "rostov"
  | "kyiv"
  | "vilnius"
  | "sochi"
  | "sevastopol"
  | "erzurum"
  | "ankara"
  | "izmir"
  | "athens"
  | "istanbul"
  | "sofia"
  | "bucharest"
  | "budapest"
  | "vienna"
  | "sarajevo"
  | "zagreb"
  | "venice"
  | "bari"
  | "palermo"
  | "rome"
  | "marseille"
  | "zurich"
  | "paris"
  | "brest"
  | "le_havre"
  | "brussels"
  | "amsterdam"
  | "london"
  | "pamplona"
  | "barcelona"
  | "madrid"
  | "lisbon"
  | "malaga"
  | "munich"
  | "frankfurt"
  | "berlin"
  | "bremen";
