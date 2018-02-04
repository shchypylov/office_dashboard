import * as actions from "../actions"

export function fetchUsersReducer(state=[], action) {
  switch(action.type) {
    case (actions.FETCH_USERS):
      return {...state, ...action.payload};
    default:
      return state
  }
}