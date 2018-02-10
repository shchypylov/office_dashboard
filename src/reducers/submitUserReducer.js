import * as actions from "../actions";

export function submitUserReducer(state = [], action) {
  switch (action.type) {
    case actions.SUBMIT_USER:
      console.log('---', action.payload);
      return action.payload;
    default:
      return state;
  }
}
