import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter as Router } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import App, {
  AppNav,
  Company,
  CompanyPreview,
  CompanyList,
  Companies,
  DiscoverView,
  DiscoverList,
  Discover
} from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('should mount without crashing', () => {
    expect(mount(
      <Router>
        <App/>
      </Router>
    ).find('.App').length).toBe(1);
  });

  it('should render <AppNav /> component', () => {
    expect(shallow(<App />).contains(<AppNav />)).toBe(true);
  });
});

describe('<AppNav />', () => {
  it('should contain at least 2 <NavLink /> components', () => {
    expect(shallow(<AppNav />).find(NavLink).length).toBeGreaterThan(1);
  });
});

describe('<Company />', () => {
  const match = {
    params: {
      companyID: 1
    }
  };

  it('should render "Loading..." when state.company is empty', () => {
    expect(shallow(<Company match={match} />).text()).toBe('Loading...');
  });

  it('should render the company name', () => {
    const company = {
      id: 1,
      name: 'Good Company'
    };

    expect(mount(<Company match={match} />).setState({ company }).find('h3').text()).toBe(company.name);
  });
});

describe('<CompanyPreview />', () => {
  it('should render <Link /> to company', () => {
    const company = { id: 1, name: 'Good Company' };

    expect(shallow(<CompanyPreview company={company} />).contains(
      <Link to={'company/' + company.id}>
        {company.name}
      </Link>
    )).toBe(true);
  });
});

describe('<CompanyList />', () => {
  it('should render "Loading..." when props.companies is null', () => {
    expect(shallow(<CompanyList companies={null} />).text()).toBe('Loading...');
  });

  it('should render "No companies here... yet." when props.companies is empty', () => {
    expect(shallow(<CompanyList companies={[]} />).text()).toBe('No companies here... yet.');
  });

  it('should render 2 <CompanyPreview /> components', () => {
    const companies = [
      { id: 1, name: 'Good Company' },
      { id: 2, name: 'Another Good Company' }
    ];

    expect(shallow(<CompanyList companies={companies} />).find(CompanyPreview).length).toEqual(2);
  });
});

describe('<Companies />', () => {
  it('should render the title: Companies', () => {
    expect(shallow(<Companies />).find('h2').text()).toBe('Companies');
  });

  it('should render <CompanyList /> component', () => {
    expect(shallow(<Companies />).contains(<CompanyList companies={null} />)).toBe(true);
  });
});

describe('<DiscoverView />', () => {
  it('should render <Link /> to company when it\'s a video', () => {
    const discoverObject = { id: 11, action: { id: 1 }, video: 'video1', title: 'Good Company' };

    expect(shallow(<DiscoverView discoverObject={discoverObject} />).contains(
      <Link to={'company/' + discoverObject.action.id}>
        {discoverObject.title}
      </Link>
    )).toBe(true);
  });
});

describe('<DiscoverList />', () => {
  it('should render "Loading..." when props.discoverList is null', () => {
    expect(shallow(<DiscoverList discoverList={null} />).text()).toBe('Loading...');
  });

  it('should render "Nothing to discover... yet." when props.discoverList is empty', () => {
    expect(shallow(<DiscoverList discoverList={[]} />).text()).toBe('Nothing to discover... yet.');
  });

  it('should render 2 <DiscoverView /> components', () => {
    const discoverList = [
      { id: 11, action: { id: 1 }, video: 'video1', title: 'Good Company' },
      { id: 22, action: { id: 2 }, video: 'video2', title: 'Another Good Company' }
    ];

    expect(shallow(<DiscoverList discoverList={discoverList} />).find(DiscoverView).length).toEqual(2);
  });
});

describe('<Discover />', () => {
  it('should render the title: Discover', () => {
    expect(shallow(<Discover />).find('h2').text()).toBe('Discover');
  });

  it('should render <CompanyList /> component', () => {
    expect(shallow(<Discover />).contains(<DiscoverList discoverList={null} />)).toBe(true);
  });
});
