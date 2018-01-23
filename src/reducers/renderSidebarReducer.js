import * as actions from "../actions"

export function renderSidebarReducer(state = [], action) {
  switch (action.type) {
    case actions.RENDER_SIDEBAR:
      console.log('---', action.payload);
      return [...state, ...action.payload];
    default: 
      return state
  }
}