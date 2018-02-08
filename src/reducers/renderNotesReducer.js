import * as actions from "../actions"

export function renderNotesReducer(state = [], action) {
  switch (action.type) {
    case actions.RENDER_NOTES:
      return [...state, action.payload];
    default:
      return state
  }
}