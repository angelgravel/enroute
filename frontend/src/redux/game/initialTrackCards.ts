import { TrackColor } from "@typeDef/types";

type InitialTrackCards = {
  [color in TrackColor]: {
    color: TrackColor;
    amount: number;
  };
};
// TODO: Change back amount to zero
const initialTrackCards: InitialTrackCards = {
  blue: {
    color: "blue",
    amount: 1,
  },
  orange: {
    color: "orange",
    amount: 1,
  },
  red: {
    color: "red",
    amount: 1,
  },
  black: {
    color: "black",
    amount: 1,
  },
  white: {
    color: "white",
    amount: 1,
  },
  green: {
    color: "green",
    amount: 1,
  },
  yellow: {
    color: "yellow",
    amount: 1,
  },
  pink: {
    color: "pink",
    amount: 1,
  },
  bridge: {
    color: "bridge",
    amount: 1,
  },
};

export default initialTrackCards;
