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
import PlusCircle from 'react-icons/lib/fa/plus-circle';
import Trash from 'react-icons/lib/fa/trash';
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import { connect } from 'react-redux';
import {
  selectedCategory,
  fetchCategoriesIfNeeded,
  fetchPostsIfNeeded,
  invalidateSubreddit,
  orderPost,
  addVoteToPost,
  substractVoteToPost,
  fetchComments
} from '../actions'

class TableBody extends React.Component {
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

    const { showingPosts, changeOrder, order, orderField, selectedCategory, addVoteToPost, substractVoteToPost, comments} = this.props
    
    /*DISPATCHING  SELECTED CATEGORY*/
    let category = this.props.match.params.category === undefined?'all':this.props.match.params.category
    selectedCategory(category)

    /*FILTERING POSTS*/
    
    let filteredPosts = showingPosts;
    if (category !== 'all'){
      const matchPostsByCategory = new RegExp(escapeRegExp(`${category}`))
      filteredPosts = showingPosts.filter((p) => matchPostsByCategory.test(p.category))
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
                    <th><Link  to="/create"><PlusCircle /></Link>
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
                          <Button bsSize="xsmall"><Trash /></Button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
    );
  }
}

function mapStateToProps ( state ) {
  const { posts, comments } = state
  return {
     showingPosts: posts.items,
     order: posts.order,
     orderField: posts.orderField,
     comments: comments.items
  }
}

const mapDispatchToProps = {
  changeOrder: orderPost,
  fetchPostsProp: fetchPostsIfNeeded,
  addVoteToPost: addVoteToPost,
  substractVoteToPost: substractVoteToPost,
  selectedCategory: selectedCategory,
  fetchCommentsProps: fetchComments
}

//export default TableBody

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableBody)