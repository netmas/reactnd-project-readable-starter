import React, { Component } from 'react';
import './App.css';
import '../../node_modules/bootstrap/less/bootstrap.less';
import { Route, Switch } from 'react-router-dom'
import * as ReadableAPI from '../ReadableAPI'
import HeaderNavigation from './HeaderNavigation';
import TableBody from './TableBody';
import Page404 from './Page404';
import FormReadable from './FormReadable';
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
	        <Switch>
		        <Route exact path="/" component={TableBody}/>
	          	<Route exact path="/:category/posts" component={TableBody}/>
	          	<Route exact path="/create" component={FormReadable}/>
	          	<Route exact path="/post/:idPost" component={FormReadable}/>
	          	<Route exact path="/error" component={Page404}/>
	          	<Route component={Page404}/>
          	</Switch>
	      </div>

	    );
	  }
}

export default App