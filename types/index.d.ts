export type SocketResponse = {
  success: boolean;
  message: string;
  payload: {
    gameToken: string;
    playerID: string;
  };
};

export type SocketEvent =
  | "create_game"
  | "join_game"
  | "player_joined"
  | "game_created";

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
