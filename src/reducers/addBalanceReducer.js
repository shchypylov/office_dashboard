import * as  actions from "../actions"

export function addBalanceReducer(state = 0, action) {
  switch (action.type) {
    case actions.ADD_BALANCE:
      return state = state + action.payload;
    default:
      return state
  }
}