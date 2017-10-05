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

		
		componentDidMount() {
			const { dispatch, selectedCategory, fetchCategoriesProp, fetchPostsProp} = this.props
			this.props.fetchCategoriesProp(selectedCategory)
			this.props.fetchPostsProp(selectedCategory)
    		//dispatch(fetchCategoriesIfNeeded(selectedCategory))
    		//dispatch(fetchPostsIfNeeded(selectedCategory))
		}

		orderByScoreAsc = (postToOrder) => {

	      return [].slice.call(postToOrder).sort(sortAsc('voteScore'))

	    }

	  	orderByScoreDesc = (postToOrder) => {

	      return [].slice.call(postToOrder).sort(sortDesc('voteScore'))

	    }

	  	render() {

	  	const { navCategories, posts } = this.props

	    return (
	      <div>
	        <HeaderNavigation navCategories = {navCategories} />

	        <Route exact path="/" render={()=>(
	          <TableBody 
	          	showingPosts={posts} 
	          	orderByScoreAsc={this.orderByScoreAsc}
	          	orderByScoreDesc={this.orderByScoreDesc}
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
    fetchCategoriesProp: (data) => dispatch(fetchCategoriesIfNeeded(data)),
    fetchPostsProp: (data) => dispatch(fetchPostsIfNeeded(data))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
