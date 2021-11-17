import { Reducer } from "redux";
import type { GameRoutes, PlayerClient, PlayerTrackCards, Ticket, TrackColor } from "@typeDef/types";

import type { GameState } from "@redux/types";
import actions from "@redux/actions";
import { AppThunk } from "@redux/store";

import initialRoutes from "./initialRoutes";
import initialTrackCards from "./initialTrackCards";

const initialState: GameState = {
  gameToken: "",
  playerId: "",
  nickname: "",
  color: "",
  trackCards: initialTrackCards,
  tickets: [],
  remainingTracks: 0,
  points: 0,
  players: [],
  currentPlayer: "",
  routes: initialRoutes,
  openTrackCards: [],
};

export const setInitGame =
  (newState: Partial<GameState>): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_INIT_GAME,
      payload: newState,
    });
  };

export const setNickname =
  (newState: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_NICKNAME,
      payload: newState,
    });
  };

export const setTrackCards =
  (newState: PlayerTrackCards): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_TRACK_CARDS,
      payload: newState,
    });
  };

export const setTickets =
  (newState: Ticket[]): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_TICKETS,
      payload: newState,
    });
  };

export const setRemainingTracks =
  (newState: number): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_REMAINING_TRACKS,
      payload: newState,
    });
  };

export const setPoints =
  (newState: number): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_POINTS,
      payload: newState,
    });
  };

export const setPlayers =
  (newState: PlayerClient[]): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_PLAYERS,
      payload: newState,
    });
  };

export const setCurrentPlayer =
  (newState: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_CURRENT_PLAYER,
      payload: newState,
    });
  };

export const setRoutes =
  (newState: GameRoutes): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_ROUTES,
      payload: newState,
    });
  };

export const setOpenTrackCards =
  (newState: TrackColor[]): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_OPEN_TRACK_CARDS,
      payload: newState,
    });
  };

export const unsetGame = (): AppThunk<Promise<void>> => async (dispatch) => {
  dispatch({
    type: actions.UNSET_GAME,
  });
};

const gameReducer: Reducer<GameState> = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.SET_INIT_GAME:
      return {
        ...state,
        gameToken: action.payload.gameToken,
        playerId: action.payload.playerId,
        color: action.payload.color,
        nickname: action.payload.nickname,
        remainingTracks: action.payload.remainingTracks,
      };
    case actions.SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload,
      };
    case actions.SET_TRACK_CARDS:
      return {
        ...state,
        trackCards: action.payload,
      };
    case actions.SET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };
    case actions.SET_REMAINING_TRACKS:
      return {
        ...state,
        remainingTracks: action.payload,
      };
    case actions.SET_POINTS:
      return {
        ...state,
        points: action.payload,
      };
    case actions.SET_PLAYERS:
      return {
        ...state,
        players: action.payload,
      };
    case actions.SET_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: action.payload,
      };
    case actions.SET_ROUTES:
      return {
        ...state,
        routes: action.payload,
      };
    case actions.SET_OPEN_TRACK_CARDS:
      return {
        ...state,
        openTrackCards: action.payload,
      };
    case actions.UNSET_GAME:
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;
