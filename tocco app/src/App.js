import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './components/HomePage';
import CustomerPage from './components/CustomerPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path = "/" component={HomePage}>
            </Route>
            <Route  path = "/CustomerPage" component={CustomerPage}>
            </Route>
          </Switch>

        </Router>
        
      </div>
    )
  }
}
