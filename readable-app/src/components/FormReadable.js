import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import {
  selectedCategory,
  fetchCategoriesIfNeeded,
  addNewPost,
  fetchSelectedPost
} from '../actions'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { LinkContainer } from 'react-router-bootstrap'

class FormReadable extends React.Component {

	state = {
				id: '',
      			title: '',
    			body: '',
    			category: '',
    			author: 'me',
    			voteScore: 0,
    			deleted: false
    		}

	componentDidMount() {
      const {dispatch, selectedCategory, fetchCategoriesProp, addPost, fetchSelectedPostProp} = this.props
      this.props.fetchCategoriesProp(selectedCategory)
      const idPost = this.props.match.params.idPost === undefined?'':this.props.match.params.idPost
      if(idPost !== ''){
      	this.setState({id: idPost})
      	const auxState = fetchSelectedPostProp(idPost)
      	/*
      	this.setState({	id: auxState.posts.selectedPost.id,
		      			title: auxState.posts.selectedPost.title,
		    			body: auxState.posts.selectedPost.body,
		    			category: auxState.posts.selectedPost.category,
		    			author: auxState.posts.selectedPost.author,
		    			voteScore: auxState.posts.selectedPost.voteScore,
		    			deleted: auxState.posts.selectedPost.deleted})*/
      } 
    }

    //id, title, body, category, author, timestamp
	

	handleChangeTitle = (e) =>{
		this.setState({title: e.target.value})
	}

	handleChangeDescription = (e) =>{
		this.setState({body: e.target.value})
	}

	handleChangeCategory = (e) =>{
		this.setState({category: e.target.value})
	}

	handleClearForm =(e)=> {  
		e.preventDefault();
		this.setState({
			id: '',
      		title: '',
    		body: '',
    		category: '',
    		author: 'me',
    		voteScore: 0,
    		deleted: false
		});
	} 
	  	

	handleFormSubmit = (e) => {  
	  e.preventDefault();

	  const formPayload = {
	    id: Math.random().toString(22),
	    title: this.state.title,
	    body: this.state.body,
	    category: this.state.category,
	    author: this.state.author,
	    timestamp: Date.now()
	  };

	 // console.log('Send this in a POST request:', formPayload);
	  this.props.addPost(formPayload)
	  this.handleClearForm(e);
	}

	render(){		
		const { navCategories, posts } = this.props
		
		
      	
		if((this.state.id !== ''))
	    {/*
	      	const post = posts.find(item => item.id === this.state.id) // this will get the exact post that you need
	    	this.state.id = post.id;
	    	this.state.title = post.title;
	    	this.state.body = post.body;
	    	this.state.category = post.category;
	    	this.state.author = post.author;
	    	this.state.voteScore = post.voteScore;
	    	this.state.deleted = post.deleted;*/
	    }
		
		return(
			<Grid>
          		<Row>
            		<Col md={12}>
            			<PageHeader>{this.state.id === undefined?'Create New Post':'Edit Post'}</PageHeader>
						<form onSubmit={this.handleFormSubmit}>
						    {/*<FieldGroup
						      id="formControlsText"
						      type="text"
						      label="Text"
						      value={this.state.value}
						      placeholder="Enter text"
						      onChange={this.handleChange}
						    />*/}
						    <FormGroup controlId="formControlsSelect">
      							<ControlLabel>Category</ControlLabel>
      							<FormControl componentClass="select" placeholder="select" onChange={this.handleChangeCategory}>
        							{navCategories.map((category) => {
        								var string;
        								string = <option value={category.name}>{category.name}</option>
        								return string;

        								})
        							}
      							</FormControl>
    						</FormGroup>
						    <FormGroup controlId="formControlsText">
						      <ControlLabel>Post Title</ControlLabel>
						      <FormControl
				            	type="text"
				            	placeholder="Enter your post title here"
				            	value={this.state.title}
				            	onChange={this.handleChangeTitle}
				          	  />
				          	</FormGroup>
						    <FormGroup controlId="formControlsTextarea">
						      <ControlLabel>Body</ControlLabel>
						      <FormControl componentClass="textarea" placeholder="Write here your post's body" value={this.state.body} onChange={this.handleChangeDescription}/>
						    </FormGroup>
						    <Button type="submit">
						      Submit
						    </Button>
					  </form>
			  	</Col>
          	</Row>
        </Grid>

		)
	}
}

function mapStateToProps ( state ) {
  const { categories, posts } = state
  return {
     navCategories: categories.items,
     post: posts.selectedPost
  }
}


/*IN THIS WAY REDUX BINDS THE ACTION CREATOR WITH THE DISPATH AUTOMATICALLY*/
const mapDispatchToProps = {
  fetchCategoriesProp: fetchCategoriesIfNeeded,
  addPost: addNewPost,
  fetchSelectedPostProp: fetchSelectedPost
}

//export default FormReadable
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormReadable)