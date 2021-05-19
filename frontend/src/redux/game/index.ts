import { Dispatch } from "redux";
import {
  GameRoutes,
  PlayerClient,
  PlayerTrackCards,
  Ticket,
  TrackColor,
} from "@typeDef/index";

import { GameState } from "../types";

import initialRoutes from "./initialRoutes";
import initialTrackCards from "./initialTrackCards";

export const gameActions = {
  SET_INIT_GAME: "setInitGame",
  SET_NICKNAME: "setNickname",
  SET_TRACK_CARDS: "setTrackCards",
  SET_TICKETS: "setTickets",
  SET_TRACKS: "setTracks",
  SET_POINTS: "setPoints",
  SET_PLAYERS: "setPlayers",
  SET_ROUTES: "setRoutes",
  SET_OPEN_TRACK_CARDS: "setOpenTrackCards",
};

const initialState: GameState = {
  gameToken: "",
  playerId: "",
  nickname: "",
  color: "",
  trackCards: initialTrackCards,
  tickets: [],
  tracks: 0,
  points: 0,
  players: [],
  routes: initialRoutes,
  openTrackCards: [],
};

export const setInitGame = (newState: Partial<GameState>) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_INIT_GAME,
    payload: newState,
  });
};

export const setNickname = (newState: string) => (dispatch: Dispatch) => {
  return dispatch({
    type: gameActions.SET_NICKNAME,
    payload: newState,
  });
};

export const setTrackCards = (newState: PlayerTrackCards) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_TRACK_CARDS,
    payload: newState,
  });
};

export const setTickets = (newState: Ticket[]) => (dispatch: Dispatch) => {
  return dispatch({
    type: gameActions.SET_TICKETS,
    payload: newState,
  });
};

export const setTracks = (newState: number) => (dispatch: Dispatch) => {
  return dispatch({
    type: gameActions.SET_TRACKS,
    payload: newState,
  });
};

export const setPoints = (newState: number) => (dispatch: Dispatch) => {
  return dispatch({
    type: gameActions.SET_POINTS,
    payload: newState,
  });
};

export const setPlayers = (newState: PlayerClient[]) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_PLAYERS,
    payload: newState,
  });
};

export const setRoutes = (newState: GameRoutes) => (dispatch: Dispatch) => {
  return dispatch({
    type: gameActions.SET_ROUTES,
    payload: newState,
  });
};

export const setOpenTrackCards = (newState: TrackColor[]) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: gameActions.SET_OPEN_TRACK_CARDS,
    payload: newState,
  });
};

const gameReducer = (state: Partial<GameState> = initialState, action: any) => {
  switch (action.type) {
    case gameActions.SET_INIT_GAME:
      return {
        ...state,
        gameToken: action.payload.gameToken,
        playerId: action.payload.playerId,
        color: action.payload.color,
        nickname: action.payload.nickname,
      };
    case gameActions.SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload,
      };
    case gameActions.SET_TRACK_CARDS:
      return {
        ...state,
        trackCards: action.payload,
      };
    case gameActions.SET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };
    case gameActions.SET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      };
    case gameActions.SET_POINTS:
      return {
        ...state,
        points: action.payload,
      };
    case gameActions.SET_PLAYERS:
      return {
        ...state,
        players: action.payload,
      };
    case gameActions.SET_ROUTES:
      return {
        ...state,
        routes: action.payload,
      };
    case gameActions.SET_OPEN_TRACK_CARDS:
      return {
        ...state,
        openTrackCards: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
