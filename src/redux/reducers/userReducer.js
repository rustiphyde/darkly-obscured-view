import {
    SET_USER,
    SET_AUTHENTICATED_USER,
    SET_UNAUTHENTICATED_USER,
    LOADING_USER,
  } from "../types";
  
  const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
  };
  
  export default function(state = initialState, action) {
    // perform appropriate actions according to type
    switch (action.type) {
      //catch the various type cases
      case SET_AUTHENTICATED_USER:
        return {
          // spreads the state as it already exists and then changes certain elements as specified
          ...state,
          authenticated: true
        };
      case SET_UNAUTHENTICATED_USER:
        return initialState;
      case SET_USER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
      case LOADING_USER:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
