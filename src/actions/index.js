import axios from "axios";
import fire from "../firebase";
import cookie from "react-cookies";

export const SUBMIT_USER = "SUBMIT_USER";
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const RENDER_SIDEBAR = "RENDER_SIDEBAR";
export const CHANGE_SIDEBAR = "CHANGE_SIDEBAR";
export const ADD_BALANCE = "ADD_BALANCE";
export const FETCH_BALANCE = "FETCH_BALANCE";
export const RENDER_NOTES = "RENDER_NOTES";

export const renderNotes = (user, users) => dispatch => {
  Object.keys(users).forEach(async element => {
    if (user === users[element].login) {
      const elements = await fire
        .database()
        .ref("users/" + element + "/notes/");
      return dispatch({
        type: RENDER_NOTES,
        payload: elements
      });
    }
  });
};

export const fetchBalance = user => async dispatch => {
  let messagesRef = await fire
    .database()
    .ref("users")
    .on("value", function(snapshot) {
      // console.log(user);
      // console.log(snapshot.val());

      let users = snapshot.val();
      Object.keys(users).map(element => {
        if (user === users[element].login) {
          console.log(user);
          console.log(users[element].cash);
          return dispatch({
            type: FETCH_BALANCE,
            payload: users[element].cash
          });
        }
      });
      //
      // return dispatch({
      //   type: FETCH_BALANCE,
      //   payload: [user, snapshot.val()]
      // });
    });
};

export const fetchUsers = () => async dispatch => {
  let messagesRef = await fire
    .database()
    .ref("users")
    .on("value", function(snapshot) {
      dispatch({
        type: FETCH_USERS,
        payload: snapshot.val()
      });
    });
};

export const addNote = (element, val) => async dispatch => {
  let cash = await fire
    .database()
    .ref("users/" + element + "/notes/")
    .push(val);
};

export const addBalance = (element, val, prevBalance) => async dispatch => {
  let cash = await fire
    .database()
    .ref("users/" + element)
    .update({
      cash: prevBalance + val
    });
  return dispatch({
    type: ADD_BALANCE,
    payload: val
  });
};

export const editUser = (key, login, password, props) => async dispatch => {
  fire
    .database()
    .ref("users/" + key)
    .update({
      login: login,
      password: password,
      name: props.name,
      surname: props.surname
    });
};

export const submitUser = user => {
  fire
    .database()
    .ref("users")
    .push(user)
    .set({
      login: user.login,
      password: user.password,
      name: "",
      surname: "",
      cash: 0
    });
  return {
    type: SUBMIT_USER,
    payload: user
  };
};

export const renderSidebar = () => async dispatch => {
  let res = await axios.get("/data.json");
  return dispatch({
    type: RENDER_SIDEBAR,
    payload: res.data.sidebar
  });
};

export const fetchNotifications = () => async dispatch => {
  let res = await axios.get("/data.json");
  return dispatch({
    type: FETCH_NOTIFICATIONS,
    payload: res.data.top_menu
  });
};

export const changeSidebar = e => {
  e.preventDefault();
  return {
    type: CHANGE_SIDEBAR
  };
};
