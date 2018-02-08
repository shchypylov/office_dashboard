import * as actions from "../actions";

export function submitUserReducer(state = [], action) {
  switch (action.type) {
    case actions.SUBMIT_USER:
      return [...state, action.payload];
    default:
      return state;
  }
}
