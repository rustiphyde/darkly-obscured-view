import {
    SET_INVEST,
    SET_AUTHENTICATED_INV,
    SET_UNAUTHENTICATED_INV,
    LOADING_INV,
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
      case SET_AUTHENTICATED_INV:
        return {
          // spreads the state as it already exists and then changes certain elements as specified
          ...state,
          authenticated: true
        };
      case SET_UNAUTHENTICATED_INV:
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