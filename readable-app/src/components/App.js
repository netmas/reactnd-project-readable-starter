import React, { Component } from 'react';
import './App.css';
import '../../node_modules/bootstrap/less/bootstrap.less';
import { Route } from 'react-router-dom'
import * as ReadableAPI from '../ReadableAPI'
import HeaderNavigation from './HeaderNavigation';
import TableBody from './TableBody';
import { connect } from 'react-redux';
import {
  selectedCategory,
  fetchCategoriesIfNeeded,
  invalidateSubreddit
} from '../actions'

class App extends Component {

		state = {
			posts: []
		}

		componentDidMount() {
			const { dispatch, selectedCategory } = this.props
    		dispatch(fetchCategoriesIfNeeded(selectedCategory))
		}

	  	render() {
	    return (
	      <div>
	        <HeaderNavigation />

	        <Route exact path="/" render={()=>(
	          <TableBody 
	          	showingPosts={this.state.posts} 
	          />)}
	        />

	        
	        
	      </div>
	    );
	  }
}

function mapStateToProps ( state ) {
  const { categories } = state
  return {
  	 navCategories: state.categories.items 
  }
}

export default connect(
  mapStateToProps
)(App)
