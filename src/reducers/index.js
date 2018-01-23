import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import {submitUserReducer} from "./submitUserReducer"

export default combineReducers({
  form : formReducer,
  user: submitUserReducer
});