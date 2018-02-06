import axios from "axios"
import fire from "../firebase"

export const SUBMIT_USER = "SUBMIT_USER";
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const RENDER_SIDEBAR = "RENDER_SIDEBAR";
export const CHANGE_SIDEBAR = "CHANGE_SIDEBAR";


export const fetchUsers = () => async dispatch => {
  let messagesRef = await fire.database().ref('users').on('value', function (snapshot) {
    dispatch({
      type: FETCH_USERS,
      payload: snapshot.val()
    })
  });
};

export const editUser = (key, login, password, props) => async dispatch => {
  
  fire.database().ref('users/' + key).set({
    login: login,
    password: password,
    name: props.name,
    surname: props.surname
  });
  
}

export const submitUser = (user) => {
  fire.database().ref('users').push(user);
  return {
    type: SUBMIT_USER,
    payload: user
  }
};

export const renderSidebar = () => async dispatch => {
  let res = await axios.get("/data.json");
  return dispatch({
    type: RENDER_SIDEBAR,
    payload: res.data.sidebar
  })
};

export const fetchNotifications = () => async dispatch => {
  let res = await axios.get("/data.json");
  return dispatch({
    type: FETCH_NOTIFICATIONS,
    payload: res.data.top_menu
  })
};


export const changeSidebar = () => {
  return {
    type: CHANGE_SIDEBAR,
  }
};

