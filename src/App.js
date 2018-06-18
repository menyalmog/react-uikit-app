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
  <nav className="uk-navbar-container" uk-navbar="true">
    <div className="uk-navbar-left">
      <ul className="uk-navbar-nav">
        <li><NavLink activeClassName="uk-active" to="/companies">Companies</NavLink></li>
        <li><NavLink activeClassName="uk-active" to="/discover">Discover</NavLink></li>
      </ul>
    </div>
  </nav>
);

const CompanyView = ({ company }) => (
  <div className="uk-padding">
    <h3>
      <a href={window.location.pathname.startsWith('/company') ? 'http://' + company.website : 'company/' + company.id}>
        <img className="uk-logo" src={company.logo} alt="Logo" />
        <br />
        {company.name}
      </a>
    </h3>
    <h4 className="uk-margin-remove-top">
      {company.overview}
    </h4>
    <ul className="uk-list uk-list-striped uk-width-1-2">
      <li>
        Industry: {company.industry.name}
      </li>
      <li>
        Size: {company.size}
      </li>
      <li>
        Location: {company.location}
      </li>
      <li>
        Plan: {company.plan}
      </li>
      <li>
        Opened Jobs: {company.jobs_count.opened_count}
      </li>
      <li>
        Website:&nbsp;
        <a href={'http://' + company.website}>
          {company.website}
        </a>
      </li>
    </ul>
    <p>
      {company.about}
    </p>
    {company.binary &&
      <video className="uk-width-1-1" controls uk-video="autoplay: inview" poster={company.video_still}>
        <source src={company.binary} type="video/mp4" />
      </video>
    }
  </div>
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
        <div className="uk-padding">Loading...</div>
      );
    }

    return (
      <CompanyView company={company} />
    );
  }
}

const CompanyList = ({ companies }) => {
  if (!companies) {
    return (
      <div className="uk-padding">Loading...</div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="uk-padding">
        No companies here... yet.
      </div>
    );
  }

  return (
    <ul className="uk-list uk-list-large uk-list-divider">
      {
        companies.map(company => {
          return (
            <li key={company.id}>
              <CompanyView company={company} />
            </li>
          );
        })
      }
    </ul>
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
        <h2 className="uk-heading-primary uk-padding uk-padding-remove-bottom">Companies</h2>
        <CompanyList companies={companies} />
      </div>
    );
  }
}

const DiscoverView = ({ discoverObject }) => {
  const discoverHeader = (
    <span>
      <img className="uk-logo" src={discoverObject.logo} alt="Logo" />
      <br />
      {discoverObject.title}
    </span>
  );
  const discoverLink = (
    <Link to={'company/' + discoverObject.action.id}>
      {discoverHeader}
    </Link>
  );

  return (
    <div className="uk-padding">
      <h3>
        {discoverObject.video ? discoverLink : discoverHeader}
      </h3>
      <h4 className="uk-margin-remove-top">
        {discoverObject.subtitle}
      </h4>
      <ul className="uk-list uk-list-striped uk-width-1-2">
        <li>
          Opened Jobs: {discoverObject.company_info.jobs_count.opened_count}
        </li>
        <li>
          Updated at: {new Date(discoverObject.updated_at).toLocaleString()}
        </li>
      </ul>
      {discoverObject.binary &&
        <video className="uk-width-1-1" controls uk-video="autoplay: inview" poster={discoverObject.video_still}>
          <source src={discoverObject.binary} type="video/mp4" />
        </video>
      }
    </div>
  );
}

const DiscoverList = ({ discoverList }) => {
  if (!discoverList) {
    return (
      <div className="uk-padding">Loading...</div>
    );
  }

  if (discoverList.length === 0) {
    return (
      <div className="uk-padding">
        Nothing to discover... yet.
      </div>
    );
  }

  return (
    <ul className="uk-list uk-list-large uk-list-divider">
      {
        discoverList.map(discoverObject => {
          if (discoverObject.video) {
            return (
              <li key={discoverObject.id}>
                <DiscoverView discoverObject={discoverObject} />
              </li>
            );
          } else {
            return '';
          }
        })
      }
    </ul>
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
        <h2 className="uk-heading-primary uk-padding uk-padding-remove-bottom">Discover</h2>
        <DiscoverList discoverList={discoverList} />
      </div>
    );
  }
}

const App = () => (
  <div className="uk-container">
    <header>
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
  CompanyView,
  CompanyList,
  Companies,
  DiscoverView,
  DiscoverList,
  Discover
};
