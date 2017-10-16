import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Table from 'react-bootstrap/lib/Table';
import Badge from 'react-bootstrap/lib/Badge';
import ChevronUp from 'react-icons/lib/fa/chevron-up';
import ChevronDown from 'react-icons/lib/fa/chevron-down';
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down';
import Trash from 'react-icons/lib/fa/trash';
import PencilSquare from 'react-icons/lib/fa/pencil-square';
import PlusCircle from 'react-icons/lib/fa/plus-circle';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { Redirect } from 'react-router'
import {
  api,
  headers,
  selectedCategory,
  fetchCategoriesIfNeeded,
  addNewPost,
  editPost,
  fetchSelectedPost
} from '../actions'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { LinkContainer } from 'react-router-bootstrap'

class FormReadable extends React.Component {

	state = {
				fireRedirect: false,
				id: '',
      			title: '',
    			body: '',
    			category: '',
    			author: 'me',
    			voteScore: 0,
    			deleted: false,
    			comments:{},
    			selectedComment:{},
    			showModal: false
    		}

	componentDidMount() {
      const {dispatch, selectedCategory, fetchCategoriesProp, addPost, fetchSelectedPostProp} = this.props
      this.props.fetchCategoriesProp(selectedCategory)
      const idPost = this.props.match.params.idPost === undefined?'':this.props.match.params.idPost
      if(idPost !== ''){
      	fetch(`${api}/posts/${idPost}`, { headers })
	      .then(response => response.json())
	      .then(json => this.setState(json))


     	fetch(`${api}/posts/${idPost}/comments`, {method: 'GET', headers })
      	  .then(response => response.json())
      	  .then(json => this.setState({comments:json}))
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

	close = (e) => {
	    this.setState({ showModal: false });
	  }

	open = ( id, comment ) => {
	    this.setState(() => ({
	      showModal: true,
	      selectedComment:{id, comment}
	    }))
	  }

	handleClearForm =(e)=> {  
		e.preventDefault();
		let string;
		if(this.state.id === ''){
			this.setState({
				id: '',
	      		title: '',
	    		body: '',
	    		category: '',
	    		author: 'me',
	    		voteScore: 0,
	    		deleted: false
			});
			string = `Your post was created!!!`
		}else{
			string = `Your post was edited!!!`
		}
		//alert(string)
		this.setState({fireRedirect: true})
	} 
	  	

	handleFormSubmit = (e) => {  
	  e.preventDefault();
	  let formPayload 
	  if(this.state.id === ''){
	  	formPayload = {
		    id: Math.random().toString(22),
		    title: this.state.title,
		    body: this.state.body,
		    category: this.state.category,
		    author: this.state.author,
		    timestamp: Date.now(),
		    voteScore: 0,
		    deleted: false
		  };

		  this.props.addPost(formPayload)
	  }else{
	  	formPayload = {
		    id: this.state.id,
		    title: this.state.title,
		    body: this.state.body,
		    category: this.state.category,
		    author: this.state.author,
		    timestamp: Date.now(),
		    voteScore: this.state.voteScore,
		    deleted: this.state.deleted
		  };
		 this.props.editPost(formPayload)
	  }
	  this.handleClearForm(e);
	  
	}

	render(){		
		const { navCategories, posts } = this.props
		const { fireRedirect } = this.state
		const divStyle = {
		      verticalAlign: 'middle'
		    };
		const comments = this.state.comments
		
		return(
			<Grid>
          		<Row>
            		<Col md={12}>
            			<PageHeader>{this.state.id === ''?'Create New Post':'Edit Post'}</PageHeader>
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
        								this.state.category === category.name?string = <option value={category.name} selected>{category.name}</option>:string =<option value={category.name}>{category.name}</option>
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
						    <Button type="submit" block>
						      Submit
						    </Button>
					  </form>
					  {fireRedirect && (
				          <Redirect to={'/'}/>
				        )}
			  	</Col>
          	</Row>
          	{this.state.id !== ''&& (
          	<Row>
        		<Col md={12}>
        			<h3>Comments</h3>
        			<Table striped bordered condensed hover responsive>
        				<thead>
        					<tr></tr>
        					<tr></tr>
        					<tr><Button bsSize="xsmall" onClick={() => this.open('', '')}><PlusCircle /></Button></tr>
                  		</thead>
        				<tbody>
        					{Object.values(comments).map((comment, index)=>(  
			                      <tr key={comment.id}>
			                      	<td>
			                          <Button bsSize="xsmall" ><ThumbsUp /></Button><Badge>{comment.voteScore}</Badge><Button bsSize="xsmall"><ThumbsDown /></Button>
			                        </td>
			                      	<td>
			                          <p>{comment.body}</p>
			                        </td>
			                        <td className="text-center">
			                        	<ButtonToolbar>
				                          <Button bsSize="xsmall" onClick={() => this.open(comment.id, comment.body)}><PencilSquare /></Button>
				                          <Button bsSize="xsmall"><Trash /></Button>
			                          	</ButtonToolbar>
			                         </td>
			                      </tr>
			                  ))}
        				</tbody>
        			</Table>
        		</Col>
            </Row>)}	
             <Modal show={this.state.showModal} onHide={this.close}>

	          <Modal.Header closeButton>
	            <Modal.Title>Edit Comment</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
	          	<form>
	            <FormGroup controlId="formControlsTextarea">
			      <ControlLabel>Comment</ControlLabel>
			      <FormControl componentClass="textarea" placeholder="Your Comment" value={this.state.selectedComment.comment} />
			    </FormGroup>
			    </form>
	          </Modal.Body>
	          <Modal.Footer>
	            <Button onClick={this.close}>Close</Button>
	          </Modal.Footer>
	        </Modal>
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
  editPost: editPost,
  fetchSelectedPostProp: fetchSelectedPost
}

//export default FormReadable
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormReadable)