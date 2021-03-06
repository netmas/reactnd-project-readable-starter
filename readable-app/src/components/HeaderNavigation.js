import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { LinkContainer } from 'react-router-bootstrap'

import logo from '../logo.svg';

import {
  selectedCategory,
  fetchCategoriesIfNeeded
} from '../actions'

class HeaderNavigation extends React.Component {

  componentDidMount() {
      const {dispatch, selectedCategory, fetchCategoriesProp} = this.props
      this.props.fetchCategoriesProp(selectedCategory)
    }

  

  render() {
    console.log('Props', this.props);
    const { navCategories } = this.props

    //const categories = this.props.fetchAllCategory
    const path = '/category/'
    let brand = 'My Readable Project';
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <a href="#" className="navbar-left"><img src={logo} className="App-logo navbar-left" alt="logo" /></a>
          <Navbar.Brand>
            <a href="#" className="navbar-left">{brand}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer exact to="/"><NavItem  eventKey={0}  to="#">All</NavItem></LinkContainer>
            {navCategories.map((category, index) => (<LinkContainer exact to={`/${category.name}/posts`}><NavItem  eventKey={index}  to="">{category.name}</NavItem></LinkContainer>))}
            
             {/*<LinkContainer exact to="/"><NavItem  eventKey={1}  to="#">All</NavItem></LinkContainer>
            <LinkContainer to="/category/react"><NavItem eventKey={2} href="#">React</NavItem></LinkContainer>
           
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>*/}
          </Nav>
          {/*<Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>*/}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps ( state ) {
  const { categories } = state
  return {
     navCategories: categories.items,
  }
}


/*IN THIS WAY REDUX BINDS THE ACTION CREATOR WITH THE DISPATH AUTOMATICALLY*/
const mapDispatchToProps = {
  fetchCategoriesProp: fetchCategoriesIfNeeded,
  changeSelectedCategory: selectedCategory
}


//export default HeaderNavigation

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderNavigation)