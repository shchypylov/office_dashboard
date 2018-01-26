import axios from "axios"

export const SUBMIT_USER = "SUBMIT_USER";
export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const RENDER_SIDEBAR = "RENDER_SIDEBAR";
export const CHANGE_SIDEBAR = "CHANGE_SIDEBAR";

export const submitUser = (user) => {
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

