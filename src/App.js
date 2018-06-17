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

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = { company: {} };
  }

  componentDidMount() {
    const { companyID } = this.props.match.params;

    agent.Companies.byID(companyID).then(company => {
      this.setState({ company });
    });
  }

  render() {
    const { company } = this.state;

    if (!company.name) {
      return (
        <div className="company-view">Loading...</div>
      );
    }

    return (
      <div className="company-view">
        <h3>{company.name}</h3>
      </div>
    );
  }
}

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
    agent.Companies.all().then(response => {
      const companies = response.results;

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

const DiscoverView = ({ discoverObject }) => (
  <div className="discover-view">
    <Link to={'company/' + discoverObject.action.id}>
      {discoverObject.title}
    </Link>
  </div>
);

const DiscoverList = ({ discoverList }) => {
  if (!discoverList) {
    return (
      <div className="discover-view">Loading...</div>
    );
  }

  if (discoverList.length === 0) {
    return (
      <div className="discover-view">
        Nothing to discover... yet.
      </div>
    );
  }

  return (
    <div>
      {
        discoverList.map(discoverObject => {
          if (discoverObject.video) {
            return (
              <DiscoverView discoverObject={discoverObject} key={discoverObject.id} />
            );
          } else {
            return '';
          }
        })
      }
    </div>
  );
};

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = { discoverList: null };
  }

  componentDidMount() {
    agent.Discover.all().then(response => {
      const discoverList = response.results;

      this.setState({ discoverList });
    });
  }

  render() {
    const { discoverList } = this.state;

    return (
      <div>
        <h2>Discover</h2>
        <DiscoverList discoverList={discoverList} />
      </div>
    );
  }
}

const App = () => (
  <div className="App">
    <header className="App-header">
      <AppNav/>
    </header>

    <Switch>
      <Route path="/companies" component={Companies}/>
      <Route path="/company/:companyID" component={Company}/>
      <Route path="/discover" component={Discover}/>
      <Route component={Companies}/>
    </Switch>
  </div>
);

export {
  App as default,
  AppNav,
  Company,
  CompanyPreview,
  CompanyList,
  Companies,
  DiscoverView,
  DiscoverList,
  Discover
};
