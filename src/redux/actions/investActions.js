import {
    SET_ERRORS,
    SET_INVEST,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_INV,
    SET_SUCCESS
  } from "../types";
  
  import adminUser from '../../util/adminUser';
  
  import axios from "axios";
  
  export const loginInvest = (investData, history) => (dispatch, getState, { getFirebase }) => {
    dispatch({ type: LOADING_UI });
    const firebase = getFirebase();
    firebase.login({ email: adminUser.email, password: adminUser.password });
    axios
      .post("/investigator-login", investData)
      .then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getInvestDetails());
        dispatch({ type: CLEAR_ERRORS });
        history.push("/home");
      })
      .catch(err => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  export const signupInvest = (newInvData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
      .post("/investigator-signup", newInvData)
      .then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getInvestDetails());
        dispatch({ type: CLEAR_ERRORS });
        history.push("/home");
      })
      .catch(err => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  export const logoutInvest = (history) => dispatch => {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
    window.location.href = "/";
  };
  
  export const getInvestDetails = () => dispatch => {
    dispatch({ type: LOADING_INV })
    axios
      .get("/investigator")
      .then(res => {
        dispatch({
          type: SET_INVEST,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
  
  export const uploadImage = formData => dispatch => {
    dispatch({ type: LOADING_INV });
    axios
      .post("/investigator/image", formData)
      .then(res => {
        dispatch(getInvestDetails());
      })
      .catch(err => console.log(err));
  };
  
  export const editInvestDetails = investDetails => dispatch => {
    dispatch({ type: LOADING_INV });
    axios
      .post("/investigator", investDetails)
      .then(() => {
        dispatch(getInvestDetails());
      })
      .catch(err => console.log(err));
  };
  
  export const resetPassword = (InvData) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
    .post("/investigator-reset", InvData)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
  };
  
  
  // Helper fxn for setting authorization header in various places
  const setAuthorizationHeader = token => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
  };
  