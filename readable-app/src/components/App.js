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
  fetchPostsIfNeeded,
  invalidateSubreddit,
  orderPost,
  addVoteToPost,
  substractVoteToPost
} from '../actions'

class App extends Component {

		
		componentDidMount() {
			const { dispatch, selectedCategory, fetchCategoriesProp, fetchPostsProp} = this.props
			this.props.fetchCategoriesProp(selectedCategory)
			this.props.fetchPostsProp(selectedCategory)
		}


	  	render() {

	  	const { navCategories, posts, changeOrder, order, addVote, substractVote } = this.props
	  	let postsOrdered = order === 'asc'? posts.sort(sortBy('voteScore')):posts.sort(sortBy('-voteScore'))

	    return (
	      <div>
	        <HeaderNavigation navCategories = {navCategories} />

	        <Route exact path="/" render={()=>(
	          <TableBody 
	          	showingPosts={postsOrdered} 
	          	changeOrder={changeOrder}
	          	order={order}
	          	selectedCategory={this.selectedCategory}
	          	addVoteToPost={addVote}
	          	substractVoteToPost={substractVote}
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
     posts: posts.items,
     order: posts.order
  }
}
/*IN THIS WAY data represents only the first argument, and doesnt work with two arguments
function mapDispatchToProps (dispatch) {
  return {
    changeOrder: (data) => dispatch(orderPost(data)),
    fetchCategoriesProp: (data) => dispatch(fetchCategoriesIfNeeded(data)),
    fetchPostsProp: (data) => dispatch(fetchPostsIfNeeded(data)),
    addVote: (data) => dispatch(addVoteToPost(data)),
  }
}
*/

/*IN THIS WAY REDUX BINDS THE ACTION CREATOR WITH THE DISPATH AUTOMATICALLY*/
const mapDispatchToProps = {
  changeOrder: orderPost,
  fetchCategoriesProp: fetchCategoriesIfNeeded,
  fetchPostsProp: fetchPostsIfNeeded,
  addVote: addVoteToPost,
  substractVote: substractVoteToPost
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
