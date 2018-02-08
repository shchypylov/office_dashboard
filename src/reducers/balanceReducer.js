import * as  actions from "../actions"

export function balanceReducer(state = null, action) {
  switch (action.type) {
    case actions.FETCH_BALANCE:
      console.log('---', action.payload);
      return state;
    case actions.ADD_BALANCE: 
      return state = state + action.payload;
    default:
      return state
  }
}