import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter as Router } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import App, { AppNav, CompanyPreview, CompanyList, Companies } from './App';

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

describe('<CompanyPreview />', () => {
  it('should render <Link /> to company', () => {
    const company = {
      id: 1,
      name: 'Good Company'
    };

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
