export const SUBMIT_USER = "SUBMIT_USER";

export const submitUser = (user) => {
  return {
    type: SUBMIT_USER,
    payload: user
  }
};