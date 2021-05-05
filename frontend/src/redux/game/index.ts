import { Dispatch } from "redux";
import { GameState } from "../types";

export const gameActions = {
  SET_INIT_GAME: "setInitGame",
  SET_NICKNAME: "setNickname",
  SET_TRACK_CARDS: "setTrackCards",
  SET_TICKETS: "setTickets",
  SET_TRACKS: "setTracks",
  SET_POINTS: "setPoints",
  SET_PLAYERS: "setPlayers",
  SET_ROUTES: "setRoutes",
};

const initialState: GameState = {
  gameToken: "",
  playerId: "",
  nickname: "",
  color: "",
  trackCards: {},
  tickets: [],
  tracks: 0,
  points: 0,
  players: [],
  routes: {},
};

export const setInitGame = (newState: Partial<GameState>) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_INIT_GAME,
    payload: newState,
  });
};

export const setNickname = (newState: Partial<GameState>) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_NICKNAME,
    payload: newState,
  });
};

export const setTrackCards = (newState: Partial<GameState>) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_TRACK_CARDS,
    payload: newState,
  });
};

export const setTickets = (newState: Partial<GameState>) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_TICKETS,
    payload: newState,
  });
};

export const setTracks = (newState: Partial<GameState>) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_TRACKS,
    payload: newState,
  });
};

export const setPoints = (newState: Partial<GameState>) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_POINTS,
    payload: newState,
  });
};

export const setPlayers = (newState: Partial<GameState>) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_TRACK_CARDS,
    payload: newState,
  });
};

export const setRoutes = (newState: Partial<GameState>) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_ROUTES,
    payload: newState,
  });
};

const gameReducer = (state: Partial<GameState> = initialState, action: any) => {
  switch (action.type) {
    case gameActions.SET_INIT_GAME:
      return {
        gameToken: action.payload.gameToken,
        playerId: action.payload.playerId,
        color: action.payload.color,
        nickname: action.payload.nickname,
      };
    case gameActions.SET_NICKNAME:
      return {
        nickname: action.payload.nickname,
      };
    case gameActions.SET_TRACK_CARDS:
      return {
        trackCards: action.payload.trackCards,
      };
    case gameActions.SET_TICKETS:
      return {
        tickets: action.payload.tickets,
      };
    case gameActions.SET_TRACKS:
      return {
        tracks: action.payload.tracks,
      };
    case gameActions.SET_POINTS:
      return {
        points: action.payload.points,
      };
    case gameActions.SET_PLAYERS:
      return {
        players: action.payload.players,
      };
    case gameActions.SET_ROUTES:
      return {
        routes: action.payload.routes,
      };
    default:
      return state;
  }
};

export default gameReducer;
