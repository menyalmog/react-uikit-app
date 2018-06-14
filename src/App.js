import React, { Component } from 'react';
import {
  Route,
  Switch,
  Link,
  NavLink
} from 'react-router-dom';
import agent from './agent';
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

const CompanyPreview = ({ company }) => (
  <div className="company-preview">
    <Link to={'company/' + company.id}>
      {company.name}
    </Link>
  </div>
);

const CompanyList = ({ companies }) => {
  if (!companies) {
    return (
      <div className="company-preview">Loading...</div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="company-preview">
        No companies here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        companies.map(company => {
          return (
            <CompanyPreview company={company} key={company.id} />
          );
        })
      }
    </div>
  );
};

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = { companies: null };
  }

  componentDidMount() {
    agent.Companies.all().then(companies => {
      this.setState({ companies });
    });
  }

  render() {
    const { companies } = this.state;

    return (
      <div>
        <h2>Companies</h2>
        <CompanyList companies={companies} />
      </div>
    );
  }
}

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
  AppNav,
  Companies,
  CompanyList,
  CompanyPreview
};
