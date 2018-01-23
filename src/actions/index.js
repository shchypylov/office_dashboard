import axios from "axios"

export const SUBMIT_USER = "SUBMIT_USER";
export const RENDER_SIDEBAR = "RENDER_SIDEBAR";

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
    payload: res.data[0].sidebar
  })
};

