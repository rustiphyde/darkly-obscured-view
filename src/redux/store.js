// store file "stores" the application state
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { config } from '../util/config';
import { firestoreReducer, getFirestore, reduxFirestore } from 'redux-firestore';
import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import investigatorReducer from "./reducers/investigatorReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const middleware = [thunk.withExtraArgument({ getFirestore, getFirebase })];

// Actual state 
const reducers = combineReducers({
  // Everything that comes from investigatorReducer.js will be stored inside the investigator object
  invest: investigatorReducer,
  // Everything that comes from dataReducer.js will be stored inside the data object
  data: dataReducer,
  // Everything that comes from uiReducer.js will be stored inside the UI object
  UI: uiReducer,
  // Everything that comes from firebaseReducer will be stored inside the firebase object
  firebase: firebaseReducer,
  // Everything that comes from firestoreReducer will be stored inside the firestore object
  firestore: firestoreReducer
});



const enhancer = composeWithDevTools(applyMiddleware(...middleware), reduxFirestore(config));
const store = createStore(reducers, initialState, enhancer);

export default store;
