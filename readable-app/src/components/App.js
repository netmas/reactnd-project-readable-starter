import React, { Component } from 'react';
import './App.css';
import '../../node_modules/bootstrap/less/bootstrap.less';
import { Route } from 'react-router-dom'
import * as ReadableAPI from '../ReadableAPI'
import HeaderNavigation from './HeaderNavigation';
import TableBody from './TableBody';
import { connect } from 'react-redux';
import sortBy from 'sort-by'
import {
  selectedCategory,
  fetchCategoriesIfNeeded,
} from '../actions'

class App extends Component {

	  	render() {

	    return (
	      <div>
	        <HeaderNavigation />

	        <Route exact path="/" component={TableBody}/>
          <Route exact path="/:category/posts" component={TableBody}/>

	      </div>

	    );
	  }
}

export default App