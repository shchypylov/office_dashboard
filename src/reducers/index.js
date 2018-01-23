import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import {submitUserReducer} from "./submitUserReducer"
import {renderSidebarReducer} from "./renderSidebarReducer";

export default combineReducers({
  form : formReducer,
  sidebar : renderSidebarReducer,
  user: submitUserReducer
});