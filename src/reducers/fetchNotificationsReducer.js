import * as actions from "../actions"

export function fetchNotificationsReducer(state = [], action) {
  switch (action.type) {
    case actions.FETCH_NOTIFICATIONS:
      return action.payload;
    default:
      return state
  }
}