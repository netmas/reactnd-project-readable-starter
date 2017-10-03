import React, { Component } from 'react';
import './App.css';
import '../../node_modules/bootstrap/less/bootstrap.less';
import { Route } from 'react-router-dom'
import * as ReadableAPI from '../ReadableAPI'
import HeaderNavigation from './HeaderNavigation';
import TableBody from './TableBody';
import { connect } from 'react-redux';
import sortAsc from 'sort-asc';
import sortDesc from 'sort-desc';
import {
  selectedCategory,
  fetchCategoriesIfNeeded,
  fetchPostsIfNeeded,
  invalidateSubreddit,
  orderPost
} from '../actions'

class App extends Component {

		state = {
			posts: []
		}

		componentDidMount() {
			const { dispatch, selectedCategory, fetchCategories, fetchPosts} = this.props
    		//dispatch(fetchCategoriesIfNeeded(selectedCategory))
    		//dispatch(fetchPostsIfNeeded(selectedCategory))
    		
		}

		orderByScoreAsc = (posts) => {

	      return posts.sort(sortAsc('voteScore'))

	    }

	  	orderByScoreDesc = (posts) => {

	      return posts.sort(sortDesc('voteScore'))

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

function mapDispatchToProps (dispatch) {
  return {
    changeOrder: (data) => dispatch(orderPost(data)),
    fetchCategories: (data) => dispatch(fetchCategoriesIfNeeded(data)),
    fetchPosts: (data) => dispatch(fetchPostsIfNeeded(data))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
