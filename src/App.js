import React, { Component } from 'react';
import './App.css'

import RegisterPage from './components/RegisterPage'
import ModifyPage from './components/ModifyPage'

import { BrowserRouter, NavLink, Switch, Route, Redirect } from "react-router-dom";

import homePageIcon from "./images/home-icon.png";

import Cards from "./containters/pages/Cards";
import Stores from "./containters/pages/Stores";
import Users from "./containters/pages/Users";
import Infos from "./containters/pages/Infos";

// LIFF app

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <BrowserRouter>
            <Switch >
              {/* <Route exact path="/" component={Stores}/> */}
              <Route exact path="/infos/:status?/:id?" component={Infos} />
              <Route exact path="/cards" component={Cards} />
              <Route exact path="/stores" component={Cards} />
              <Route exact path="/users" component={Cards} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/memberpage" component={ModifyPage} />
              <Route render={() => <h1>Data Not Found.</h1>} />
            </Switch>
      </BrowserRouter>
    )
  }
}
export default App;