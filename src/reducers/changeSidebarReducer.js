import * as actions from "../actions"

export function changeSidebarReducer(state = true, action) {
  switch (action.type) {
    case actions.CHANGE_SIDEBAR:
      return !state;
    default:
      return state
  }
}