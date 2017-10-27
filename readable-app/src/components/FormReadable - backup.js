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
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import { Redirect } from 'react-router'
import {
  api,
  headers,
  selectedCategory,
  fetchCategoriesIfNeeded,
  addNewPost,
  editPost,
  fetchSelectedPost,
  addNewComment,
  editComment,
  addVoteToComment,
  fetchComments,
  substractVoteToComment,
  deleteComment,
  deletePost,
  addVoteToPost,
  substractVoteToPost,
} from '../actions'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import { LinkContainer } from 'react-router-bootstrap'

class FormReadable extends React.Component {

	state = {
				fireRedirect: false,
				redirecPath: '/',
				id: '',
      			title: '',
    			body: '',
    			category: 'react',
    			author: 'me',
    			voteScore: 0,
    			deleted: false,
    			comments:{},
    			selectedComment:{id:'', body:'', parentId:''},
    			showModal: false,
    			disabled: false
    		}

	componentDidMount() {
      const {dispatch, selectedCategory, fetchCategoriesProp, addPost, fetchSelectedPostProp, addComment, editComment} = this.props
      this.props.fetchCategoriesProp(selectedCategory)
      const idPost = this.props.match.params.idPost === undefined?'':this.props.match.params.idPost
      if(idPost !== ''){
      	fetch(`${api}/posts/${idPost}`, { headers })
	      .then(response => response.json())
	      .then(json => {Object.keys(json).length > 0?this.setState(json):this.setState({fireRedirect: true, redirecPath:'/error'})})
	      .then(this.setState({selectedComment: {parentId:idPost}}))


     	fetch(`${api}/posts/${idPost}/comments`, {method: 'GET', headers })
      	  .then(response => response.json())
      	  .then(json => this.setState({comments:json}))

      	this.setState({disabled: true})

      	this.state.deleted == true && (this.setState({fireRedirect: true, redirecPath: '/error'}))

      } 
    }

    //id, title, body, category, author, timestamp
	handleEditButton = (e) =>{
		e.preventDefault
		let value
		this.state.disabled === true ? value=false : value = true
		this.setState({disabled: value})
	}

	handleChangeTitle = (e) =>{
		this.setState({title: e.target.value})
	}

	handleChangeDescription = (e) =>{
		this.setState({body: e.target.value})
	}

	handleChangeCommentBody = (e) =>{
		this.setState({selectedComment: {id:this.state.selectedComment.id, body:e.target.value, parentId:this.state.id}})
	}

	handleChangeCategory = (e) =>{
		this.setState({category: e.target.value})
	}

	close = (e) => {
	    this.setState({ showModal: false,
	    				selectedComment: {id:'', body:'', parentId: this.state.id} });
	  }

	open = ( id, body, parentId ) => {
		let aux = {id, body, parentId:this.state.id}
	    this.setState(() => ({
	      showModal: true,
	      selectedComment:aux
	    }))
	   
	  }

	addVoteToPostLocal = (step) =>{
		this.setState(() => ({
	      voteScore: this.state.voteScore + step
	    }))
	}

	substractVoteToPostLocal = (step) =>{
		this.setState(() => ({
	      voteScore: this.state.voteScore - step
	    }))
	}
	

	addVoteToCommentLocal =(id, step) =>{

		const commentToAddVote = this.state.comments.find(item => item.id === id) // this will get the exact post that you need
	    const commentToAddVoteIndex = this.state.comments.findIndex(item => item.id === id) // this will get the exact post index
	    let newCommentsToAddVote = [...this.state.comments]
	    newCommentsToAddVote[commentToAddVoteIndex] = {
	        ...commentToAddVote,
	        voteScore: commentToAddVote.voteScore + step
	    }
	    //alert(JSON.stringify(newCommentsToAddVote))
	    this.setState(() => ({
	      comments: newCommentsToAddVote
	    }))
	}

	substractVoteToCommentLocal =(id, step) =>{

		const commentToSubsVote = this.state.comments.find(item => item.id === id) // this will get the exact post that you need
	    const commentToSubsVoteIndex = this.state.comments.findIndex(item => item.id === id) // this will get the exact post index
	    let newCommentsToSubsVote = [...this.state.comments]
	    newCommentsToSubsVote[commentToSubsVoteIndex] = {
	        ...commentToSubsVote,
	        voteScore: commentToSubsVote.voteScore - step
	    }
	    //alert(JSON.stringify(newCommentsToAddVote))
	    this.setState(() => ({
	      comments: newCommentsToSubsVote
	    }))
	}

	deleteCommentLocal =(id) =>{

		
	    const allComments = [...this.state.comments]
	    let nonDeletedComments = allComments.filter(e => e.id !== id)
	    //alert(JSON.stringify(newCommentsToAddVote))
	    this.setState(() => ({
	      comments: nonDeletedComments
	    }))
	}

	handleClearForm =(e)=> {  
		e.preventDefault();
		let string;
		this.state.id === ''?(
			this.setState({
				id: '',
	      		title: '',
	    		body: '',
	    		category: '',
	    		author: 'me',
	    		voteScore: 0,
	    		deleted: false
			}),
			string = `Your post was created!!!`
		): string = `Your post was edited!!!`
		
		alert(string)
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

	handleCommentFormSubmit = () => {  
	  //e.preventDefault();
	  let formPayload 
	  //alert(this.state.selectedComment.id)
	  if((this.state.selectedComment.id === '') || (this.state.selectedComment.id === undefined)){
	  	formPayload = {
		    id: Math.random().toString(22),
		    timestamp: Date.now(),
		    body: this.state.selectedComment.body,
		    author: 'me',
		    parentId: this.state.id
		  }
		  
		  this.props.addComment(formPayload)

		  formPayload.voteScore = 1

		  this.setState({ 
			  comments: [...this.state.comments, formPayload]
			})
		  this.close()
		  
	  }else{
	  	formPayload = {
		    id: this.state.selectedComment.id,
		    body: this.state.selectedComment.body,
		    timestamp: Date.now(),
		  }
		  //alert('2 -' + this.state.selectedComment.id)
		 this.props.editComment(formPayload)
		 const commentEditIndex = this.state.comments.findIndex(item => item.id === this.state.selectedComment.id)
		 let editComment = [...this.state.comments]
		    editComment[commentEditIndex] = {
		    	...editComment[commentEditIndex],
		        body:formPayload.body,
		        timestamp:formPayload.timestamp
		    }
		 this.setState({ 
			  comments: editComment
			})
		 this.close()
	  }

	}

	render(){		
		const { navCategories, posts, addVoteToComment, substractVoteToComment, deleteComment, deletePost, addVoteToPost, substractVoteToPost } = this.props
		//const { fireRedirect } = this.state
		const divStyle = {
		      verticalAlign: 'middle'
		    };
		const comments = this.state.comments
		//alert(JSON.stringify(this.state))
		return(
			<Grid>
          		<Row>
            		<Col md={12}>
            			<Col md={10}>
            				<PageHeader>{this.state.id === ''?'Create New Post':'Edit Post'}</PageHeader>
            			</Col>
            			<Col md={2}>
            				{this.state.id !== '' && (
            					<ButtonGroup>
            						<Button type="button" bsSize="small" bsStyle="primary" onClick={this.handleEditButton} >
							      		<PencilSquare /> Edit &nbsp; &nbsp;
							    	</Button>
	            					<Button type="button" bsSize="small" bsStyle="danger" onClick={() => {deletePost(this.state.id); this.setState({fireRedirect: true}) }}>
							      		<Trash /> Delete
							    	</Button>
						    	</ButtonGroup>
						    )}
					    </Col>
					    <Col md={12}>
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
	      							<FormControl componentClass="select" placeholder="select" onChange={this.handleChangeCategory} disabled={this.state.disabled}>
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
					            	disabled={this.state.disabled}
					          	  />
					          	</FormGroup>
							    <FormGroup controlId="formControlsTextarea">
							      <ControlLabel>Body</ControlLabel>
							      <FormControl componentClass="textarea" placeholder="Write here your post's body" value={this.state.body} onChange={this.handleChangeDescription} disabled={this.state.disabled}/>
							    </FormGroup>
							    {this.state.id !== '' && (<p><Button bsSize="xsmall" onClick={() => {addVoteToPost(this.state.id, 1); this.addVoteToPostLocal(1)}}><ChevronUp  /></Button><Badge>{this.state.voteScore}</Badge><Button bsSize="xsmall" onClick={() => {substractVoteToPost(this.state.id, 1); this.substractVoteToPostLocal(1)}}><ChevronDown /></Button></p>)}
							    <Button type="submit" block disabled={this.state.disabled}>
							      Save
							    </Button>
						  </form>
						  {this.state.fireRedirect === true && (
					          <Redirect to={this.state.redirecPath}/>
					        )}
					  </Col>
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
        					<tr><Button bsSize="xsmall" onClick={() => this.open('', '', this.state.id)}><PlusCircle /></Button></tr>
                  		</thead>
        				<tbody>
        					{Object.values(comments).sort(sortBy('-voteScore')).map((comment, index)=>(  
			                      <tr key={comment.id}>
			                      	<td>
			                          <Button bsSize="xsmall" onClick={() => {this.addVoteToCommentLocal(comment.id, 1); addVoteToComment(comment.id, 1);}} ><ThumbsUp  /></Button><Badge>{comment.voteScore}</Badge><Button bsSize="xsmall" onClick={() => {this.substractVoteToCommentLocal(comment.id, 1); substractVoteToComment(comment.id, 1);}}><ThumbsDown /></Button>
			                        </td>
			                      	<td>
			                          <p>{comment.body}</p>
			                        </td>
			                        <td className="text-center">
			                        	<ButtonToolbar>
				                          <Button bsSize="xsmall" onClick={() => this.open(comment.id, comment.body, comment.parentId)}><PencilSquare /></Button>
				                          <Button bsSize="xsmall" onClick={() => {deleteComment(comment.id); this.deleteCommentLocal(comment.id)}}><Trash /></Button>
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
	          	
	            <FormGroup controlId="formControlsTextarea">
			      <ControlLabel>Comment</ControlLabel>
			      <FormControl componentClass="textarea" placeholder="Your Comment" value={this.state.selectedComment.body} onChange={this.handleChangeCommentBody}/>
			    </FormGroup>
			    
	          </Modal.Body>
	          <Modal.Footer>
	            <Button onClick={this.close}>Close</Button>
	            <Button bsStyle="primary" onClick={() => this.handleCommentFormSubmit()}>Save</Button>
	          </Modal.Footer>
	          
	        </Modal>
        </Grid>

		)
	}
}

function mapStateToProps ( state ) {
  const { categories, posts, comments } = state
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
  fetchSelectedPostProp: fetchSelectedPost,
  addComment: addNewComment,
  editComment: editComment,
  addVoteToComment: addVoteToComment,
  substractVoteToComment: substractVoteToComment,
  deleteComment: deleteComment,
  deletePost:deletePost,
  addVoteToPost,
  substractVoteToPost,
  fetchComments
}

//export default FormReadable
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormReadable)