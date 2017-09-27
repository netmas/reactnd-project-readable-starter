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
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions'

class App extends Component {

		state = {
			posts: []
		}

		componentDidMount() {
			const { dispatch, selectedCategory } = this.props
    		dispatch(fetchCategoriesIfNeeded(selectedCategory))
    		dispatch(fetchPostsIfNeeded(selectedCategory))
		}

	  	render() {

	  	const { navCategories, posts } = this.props

	    return (
	      <div>
	        <HeaderNavigation navCategories = {navCategories} />

	        <Route exact path="/" render={()=>(
	          <TableBody 
	          	showingPosts={posts} 
	          />)}
	        />

	        
	        
	      </div>
	    );
	  }
}

function mapStateToProps ( state ) {
  const { categories, posts } = state
  return {
     navCategories: categories.items,
     posts: posts.items
  }
}

export default connect(
  mapStateToProps
)(App)
