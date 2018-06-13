import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter as Router } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import App, { AppNav } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('A suite', () => {
  it('should mount without crashing', () => {
    expect(mount(
      <Router>
        <App/>
      </Router>
    ).find('.App').length).toBe(1);
  });

  it('should render AppNav', () => {
    expect(shallow(<App />).contains(<AppNav />)).toBe(true);
  });

  it('should contain at least 2 NavLink\'s', () => {
    expect(shallow(<AppNav />).find(NavLink).length).toBeGreaterThan(1);
  });
});
