import React, { Component } from 'react';
import './App.css';
import '../../node_modules/bootstrap/less/bootstrap.less';
import { Route } from 'react-router-dom'
import * as ReadableAPI from '../ReadableAPI'
import HeaderNavigation from './HeaderNavigation';
import TableBody from './TableBody';
import { connect } from 'react-redux';

class App extends Component {

		state = {
			posts: []
		}

		componentDidMount() {
			ReadableAPI.getAllPosts().then((posts) => {
		      	this.setState({ posts })
		    })
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

export default connect() (App)
