import { PlayerColor } from "@typeDef/types";

type MapPlayerColorToHex = {
  [color in PlayerColor]: {
    color: string;
  };
};
const mapPlayerColorToHex: MapPlayerColorToHex = {
  black: {
    color: "",
  },
  blue: {
    color: "",
  },
  red: {
    color: "",
  },
  green: {
    color: "",
  },
  yellow: {
    color: "",
  },
};

export default mapPlayerColorToHex;
