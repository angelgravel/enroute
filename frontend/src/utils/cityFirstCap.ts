import { City } from "../../../types/index";

export const cityFirstCap = (word: City): string => {
  return String(word.charAt(0).toUpperCase() + word.slice(1));
};
