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
  addNewPost
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
      const {dispatch, selectedCategory, fetchCategoriesProp, addPost} = this.props
      const idPost = this.props.match.params.idPost === undefined?undefined:this.props.match.params.idPost
      alert(idPost)
      this.props.fetchCategoriesProp(selectedCategory)
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
		
		console.log('IDPOST', this.idPost )
      	
		if((this.idPost !== undefined))
	    {
	      	const post = this.posts.find(item => item.id === this.idPost) // this will get the exact post that you need
	    	this.state.id = post.id;
	    	this.state.title = post.title;
	    	this.state.body = post.body;
	    	this.state.category = post.category;
	    	this.state.author = post.author;
	    	this.state.voteScore = post.voteScore;
	    	this.state.deleted = post.deleted;
	    }
		
		return(
			<Grid>
          		<Row>
            		<Col md={12}>
            			<PageHeader>{this.idPost === undefined?'Create New Post':'Edit Post'}</PageHeader>
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
     posts: posts.items
  }
}


/*IN THIS WAY REDUX BINDS THE ACTION CREATOR WITH THE DISPATH AUTOMATICALLY*/
const mapDispatchToProps = {
  fetchCategoriesProp: fetchCategoriesIfNeeded,
  addPost: addNewPost
}

//export default FormReadable
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormReadable)