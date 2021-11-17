import { Reducer } from "redux";

import actions from "@redux/actions";
import { ChosenRouteState } from "@redux/types";
import { AppThunk } from "@redux/store";

const initialState: ChosenRouteState = {};

export const setChosenRoute =
  (newState: ChosenRouteState): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch({
      type: actions.SET_CHOSEN_ROUTE,
      payload: newState,
    });
  };

export const unsetChosenRoute = (): AppThunk<Promise<void>> => async (dispatch) => {
  dispatch({
    type: actions.UNSET_CHOSEN_ROUTE,
  });
};

const chosenRouteReducer: Reducer<ChosenRouteState> = (state = initialState, action: any): ChosenRouteState => {
  switch (action.type) {
    case actions.SET_CHOSEN_ROUTE:
      return action.payload;
    case actions.UNSET_CHOSEN_ROUTE:
      return initialState;
    default:
      return state;
  }
};

export default chosenRouteReducer;
