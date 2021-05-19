import { City } from "@typeDef/index";

export const cityFirstCap = (word: City): string => {
  return String(word.charAt(0).toUpperCase() + word.slice(1));
};
