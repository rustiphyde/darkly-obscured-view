import {
    SET_INVEST,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_INV,
  } from "../types";
  
  const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
  };
  
  const investigatorReducer = (state = initialState, action) => {
    // perform appropriate actions according to type
    switch (action.type) {
      //catch the various type cases
      case SET_AUTHENTICATED:
        return {
          // spreads the state as it already exists and then changes certain elements as specified
          ...state,
          authenticated: true
        };
      case SET_UNAUTHENTICATED:
        return initialState;
      case SET_INVEST:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
      case LOADING_INV:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }

  export default investigatorReducer;