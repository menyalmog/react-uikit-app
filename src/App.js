import React, { Component } from 'react';
import {
  Route,
  Switch,
  Link,
  NavLink
} from 'react-router-dom';
import './App.css';

const AppNav = () => (
  <ul className="App-nav">
    <li><NavLink to="/companies">Companies</NavLink></li>
    <li><NavLink to="/discover">Discover</NavLink></li>
  </ul>
);

const Company = ({ match }) => (
  <div>
    <h3>{match.params.companyId}</h3>
  </div>
);

const Companies = ({ match }) => (
  <div>
    <h2>Companies</h2>
    <ul>
      <li>
        <Link to="company/company1">
          Company 1
        </Link>
      </li>
      <li>
        <Link to="company/company2">
          Company 2
        </Link>
      </li>
    </ul>
  </div>
);

const Discover = () => (
  <div>
    <h2>Discover</h2>
  </div>
);

const App = () => (
  <div className="App">
    <header className="App-header">
      <AppNav/>
    </header>

    <Switch>
      <Route path="/companies" component={Companies}/>
      <Route path="/company/:companyId" component={Company}/>
      <Route path="/discover" component={Discover}/>
      <Route component={Companies}/>
    </Switch>
  </div>
);

export {
  App as default,
  AppNav
};
