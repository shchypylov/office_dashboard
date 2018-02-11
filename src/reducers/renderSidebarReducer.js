import * as actions from "../actions"

export function renderSidebarReducer(state = {}, action) {
  switch (action.type) {
    case actions.RENDER_SIDEBAR:
      return action.payload;
    default:
      return state
  }
}