import * as actions from "../actions";

export function notesReducer(state = [], action) {
  switch (action.type) {
    case actions.RENDER_NOTES:
      return action.payload;
    default:
      return state;
  }
}
