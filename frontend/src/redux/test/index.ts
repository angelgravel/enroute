import { Dispatch } from "redux";

export const testActions = {
  SET_TEST: "setTest",
};

type TestState = {
  testName: string;
  testAge: number;
};

const initialState: TestState = {
  testName: "",
  testAge: 0,
};

export const setTest = (newState: TestState) => (dispatch: Dispatch) => {
  return dispatch({
    type: testActions.SET_TEST,
    payload: newState,
  });
};

const reducer = (state: TestState = initialState, action: any) => {
  switch (action.type) {
    case testActions.SET_TEST:
      return {
        testName: action.payload.newTestName,
        testAge: action.payload.newTestAge,
      };
    default:
      return state;
  }
};

export default reducer;
