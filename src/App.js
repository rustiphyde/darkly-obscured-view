import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import jwtDecode from "jwt-decode";
import axios from 'axios';
import logo from './imgs/DO-Logo.png';

// Firebase Imports
import firebase from 'firebase/app';
import { config } from './util/config';
import 'firebase/firestore';
import 'firebase/auth';

// Redux Imports
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from './redux/types';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { logoutInvest, getInvestDetails } from './redux/actions/investActions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Util Imports
import AuthRoute from "./util/AuthRoute";
import themeFile from './util/theme';

// MUI Components
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Components
import Footer from './components/Footer';
// Pages
import welcome from "./pages/welcome";
import login from "./pages/login";
import signup from "./pages/signup";
import reset from "./pages/reset";

axios.defaults.baseURL = "https://us-central1-mostlyghostly-21021.cloudfunctions.net/api";

library.add(fab);

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutInvest());
    window.location.href = '/'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getInvestDetails());
  }
}

firebase.initializeApp(config);
firebase.firestore();

const rrfConfig = {
  userProfile: 'Users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
        <div className="header">
        <img src={logo} alt="Darkly Obscured Logo" width="160" height="160" className="main-logo"/>
        </div>
        
          {/* <Navbar /> */}
          <div className="container">
            <hr/>
            <Switch>
                {/* <Route exact path="/home" component={home} /> */}
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                />
                <AuthRoute
                exact
                path="/"
                component={welcome}
                />
                <AuthRoute
                exact
                path="/reset"
                component={reset}
                />
                {/* <Route exact path="/:email" component={user} /> */}
              </Switch>
              <hr/>
            </div>
            <Footer />
        </BrowserRouter>
        </ReactReduxFirebaseProvider>
        </Provider>        
      </MuiThemeProvider>
    );
  }
  
}

export default App;
