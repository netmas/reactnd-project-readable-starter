import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/less/bootstrap.less';

import * as ReadableAPI from './ReadableAPI'
import HeaderNavigation from './HeaderNavigation';
import Body from './Body';

class App extends Component {
	state = {
	    categories: [],
	    error: []
	  }
	  
	  componentDidMount() {
	    ReadableAPI.getAllCategories().then((categories) => {
	      this.setState({ categories })
	    })
	  }


	  render() {
	    return (
	      <div>
	        <HeaderNavigation />

	        <Body />
	      </div>
	    );
	  }
}

export default App;
