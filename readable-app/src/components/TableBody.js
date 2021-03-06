import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import Badge from 'react-bootstrap/lib/Badge';
import ChevronUp from 'react-icons/lib/fa/chevron-up';
import ChevronDown from 'react-icons/lib/fa/chevron-down';
import PencilSquare from 'react-icons/lib/fa/pencil-square';
import PlusCircle from 'react-icons/lib/fa/plus-circle';
import Trash from 'react-icons/lib/fa/trash';
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import sortBy from 'sort-by';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import escapeRegExp from 'escape-string-regexp';
import { connect } from 'react-redux';
import {
  selectedCategory,
  fetchCategoriesIfNeeded,
  fetchPostsIfNeeded,
  invalidateSubreddit,
  addNewPost,
  orderPost,
  addVoteToPost,
  substractVoteToPost,
  fetchComments,
  deletePost
} from '../actions'

class TableBody extends React.Component {

  state = {
          showModal: false,
          title: '',
          body: '',
          category: ''
          }

  close = (e) => {
      this.setState({ showModal: false });
    }

  open = (e) => {
      this.setState(() => ({
        showModal: true,
        title: '',
        body: '',
        category: ''
      }))
    }

  handleChangeTitle = (e) =>{
    this.setState({title: e.target.value})
  }

  handleChangeBody = (e) =>{
    this.setState({body: e.target.value})
  }

  handleChangeCategory = (e) =>{
    this.setState({category: e.target.value})
  }

  handleFormSubmit = (e) => {  
    e.preventDefault();
    let formPayload = {
        id: Math.random().toString(22),
        title: this.state.title,
        body: this.state.body,
        category: this.state.category,
        author: 'me',
        timestamp: Date.now(),
        voteScore: 0,
        deleted: false
      }
    this.props.addPost(formPayload)
    this.close();
  }

  componentDidMount() {
      const { dispatch, selectedCategory, fetchPostsProp, fetchCommentsProps} = this.props
      this.props.fetchPostsProp(selectedCategory)
      
    }

  commentCounter = (idPost) =>{
    const matchParentId = new RegExp(escapeRegExp(`${idPost}`))
    return this.props.comments.filter((c) => matchParentId.test(c.parentId)).length
  }

  render() {
    const Timestamp = require('react-timestamp');
    const divStyle = {
      verticalAlign: 'middle'
    };

    const { showingPosts, navCategories, changeOrder, order, orderField, selectedCategory, addVoteToPost, substractVoteToPost, comments, deletePost} = this.props
    
    /*DISPATCHING  SELECTED CATEGORY*/
    let category = this.props.match.params.category === undefined?'all':this.props.match.params.category
    selectedCategory(category)

    /*FILTERING POSTS*/
    
    let filteredPosts = showingPosts.filter(p => p.deleted === false);
    if (category !== 'all'){
      const matchPostsByCategory = new RegExp(escapeRegExp(`${category}`))
      filteredPosts = showingPosts.filter(p => p.deleted === false).filter((p) => matchPostsByCategory.test(p.category))
    }

    /*ORDERING POSTS*/
    let posts = order === 'asc'? filteredPosts.sort(sortBy(`${orderField}`)):filteredPosts.sort(sortBy(`-${orderField}`))
    
    //console.log('Props POSTS', posts);
    return (    
        <Grid>
          <Row>
            <Col md={12}>
              <Table striped bordered condensed hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>SCORE <ButtonToolbar>
                                <Button bsSize="xsmall" onClick={() => changeOrder('desc', 'voteScore')}><ChevronDown /></Button>
                                <Button bsSize="xsmall" onClick={() => changeOrder('asc', 'voteScore')}><ChevronUp /></Button>
                              </ButtonToolbar>
                    </th>
                    <th>POSTS</th>
                    <th>TIME <ButtonToolbar>
                                <Button bsSize="xsmall" onClick={() => changeOrder('desc', 'timestamp')}><ChevronDown /></Button>
                                <Button bsSize="xsmall" onClick={() => changeOrder('asc', 'timestamp')}><ChevronUp /></Button>
                              </ButtonToolbar>
                    </th>
                    <th>
                      <Button bsSize="small" onClick={() => this.open()}><PlusCircle /></Button>
                      {/*<Link  to="/create"><PlusCircle /></Link>*/}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index)=>(  
                      <tr key={post.id}>
                        <td style={divStyle} className="text-center"><h3>{index + 1}</h3></td>
                        <td style={divStyle} className="text-center">
                          <Button bsSize="xsmall" onClick={() => addVoteToPost(post.id, 1)}><ChevronUp /></Button> <Badge>{post.voteScore}</Badge> <Button bsSize="xsmall" onClick={() => substractVoteToPost(post.id, 1)}><ChevronDown /></Button>
                         </td>
                        <td>
                            <Link  eventKey={0}  to={`/post/${post.id}`}>
                              <h4 class="list-group-item-heading">{post.title}</h4>
                            </Link>
                          <p><small>Category: <strong>{post.category}</strong>, Comments: <Badge>{this.commentCounter(post.id)}</Badge></small></p>  
                          <p><small>Posted By {post.author}, <Timestamp time={post.timestamp} utc={true} format='full' /></small></p>
                        </td>
                        <td>
                          <p><Timestamp time={post.timestamp} utc={true} format='full' /></p>
                        </td>
                        <td>
                          <ButtonToolbar>
                            <LinkContainer exact to={`/post/${post.id}`}><Button bsSize="xsmall" href="#"><PencilSquare /></Button></LinkContainer>
                            <Button bsSize="xsmall" onClick={() => deletePost(post.id)}><Trash /></Button>
                          </ButtonToolbar>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Modal show={this.state.showModal} onHide={this.close}>
              
            <Modal.Header closeButton>
              <Modal.Title>Add Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            <FormGroup controlId="formControlsTitle">
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                value={this.state.title}
                placeholder="Enter text"
                onChange={this.handleChangeTitle}
              /> 
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Post</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Your Post" value={this.state.body} onChange={this.handleChangeBody}/>
            </FormGroup>
          
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
              <Button bsStyle="primary" onClick={this.handleFormSubmit}>Save</Button>
            </Modal.Footer>
            
          </Modal>
        </Grid>
    );
  }
}

function mapStateToProps ( state ) {
  const { posts, comments, categories } = state
  return {
     showingPosts: posts.items,
     order: posts.order,
     orderField: posts.orderField,
     comments: comments.items,
     navCategories: categories.items
  }
}

const mapDispatchToProps = {
  changeOrder: orderPost,
  fetchPostsProp: fetchPostsIfNeeded,
  addVoteToPost: addVoteToPost,
  substractVoteToPost: substractVoteToPost,
  selectedCategory: selectedCategory,
  fetchCommentsProps: fetchComments,
  deletePost:deletePost,
  addPost:addNewPost
}

//export default TableBody

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableBody)