
import * as ReadableAPI from '../ReadableAPI'

export const SELECTED_CATEGORY = 'SELECTED_CATEGORY'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const SHOW_CATEGORY = 'SHOW_CATEGORY'
export const SHOW_ALL_CATEGORIES = 'SHOW_ALL_CATEGORIES'
export const SHOW_ALL_POST = 'SHOW_ALL_POST'
export const SHOW_POSTS_BY_CATEGORY = 'SHOW_POSTS_BY_CATEGORY'

/*SELECT_SUBREDDIT in the example*/
export const SELECT_POST = 'SELECT_POST'

export const ORDER_POST_CHANGE = 'ORDER_POST_CHANGE'

/*Cuando se aprieta 'refresh'*/
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS'

export const REQUEST_POSTS = 'REQUEST_POSTS'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export const RECEIVE_SELECTED_POST = 'RECEIVE_SELECTED_POST'

export const REQUEST_SELECTED_POST = 'REQUEST_SELECTED_POST'

export const ADD_VOTE_TO_POST = 'ADD_VOTE_TO_POST'

export const SUBSTRACT_VOTE_TO_POST = 'SUBSTRACT_VOTE_TO_POST'

export const ADD_NEW_POST = 'ADD_NEW_POST'

export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'

export const EDIT_COMMENT = 'EDIT_COMMENT'

export const EDIT_POST = 'EDIT_POST'

export const DELETE_POST = 'DELETE_POST'

export const api = "http://localhost:5001"

export const ADD_VOTE_TO_COMMENT = 'ADD_VOTE_TO_COMMENT'

export const SUBSTRACT_VOTE_TO_COMMENT = 'SUBSTRACT_VOTE_TO_COMMENT'

export const DELETE_COMMENT = 'DELETE_COMMENT'

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/******************************POSTS*********************************************/

export function addNewPost({id, title, body, category, author, timestamp}) {
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, title, body, category, author, timestamp})
  })
  return {
    type: ADD_NEW_POST,
    id,
    title,
    body,
    category,
    author,
    timestamp
  }
}

export function deletePost(id) {
  
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  return {
    type: DELETE_POST,
    id
  }
}

export function addNewComment({id, timestamp,  body, author, parentId}) {
  
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, timestamp, body, author, parentId})
  })
  return {
    type: ADD_NEW_COMMENT,
    id,
    timestamp,
    body,
    author,
    parentId
  }
}

export function deleteComment(id) {
  
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  return {
    type: DELETE_COMMENT,
    id
  }
}

export function editPost({id, title, body, category, author, timestamp, voteScore, deleted}) {
  
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, body, category})
  })
  return {
    type: EDIT_POST,
    id,
    title,
    body,
    category,
    author,
    timestamp,
    voteScore,
    deleted
  }
}

export function editComment({id, timestamp,  body}) {
  
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({timestamp, body})
  })
  return {
    type: EDIT_COMMENT,
    id,
    timestamp,
    body
  }
}

export function orderPost(order, field) {
  return {
    type: ORDER_POST_CHANGE,
    order,
    field
  }
}

export function invalidatePost(category) {
  return {
    type: INVALIDATE_POSTS,
    category
  }
}


function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

function requestSelectedPost(id) {
  return {
    type: REQUEST_SELECTED_POST,
    id
  }
}

function requestComments(idPost) {
  return {
    type: REQUEST_COMMENTS,
    idPost
  }
}

function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json,
    receivedAt: Date.now(),
  }
}

function receiveComments(idPost,json) {
  return {
    type: RECEIVE_COMMENTS,
    idPost,
    comments: json,
    receivedAt: Date.now()
  }
}

function receiveSelectedPost(id, json) {
  return {
    type: RECEIVE_SELECTED_POST,
    id,
    selectedPost: json,
    receivedAt: Date.now()
  }
}

export function addVoteToPost(id, step) {
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:"upVote"})
  })
  return {
    type: ADD_VOTE_TO_POST,
    id,
    step
  }
}

export function addVoteToComment(id, step) {
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:"upVote"})
  })
  return {
    type: ADD_VOTE_TO_COMMENT,
    id,
    step
  }
}

export function substractVoteToPost(id, step) {
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:"downVote"})
  })
  return {
    type: SUBSTRACT_VOTE_TO_POST,
    id,
    step
  }
}

export function substractVoteToComment(id, step) {
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:"downVote"})
  })
  return {
    type: SUBSTRACT_VOTE_TO_COMMENT,
    id,
    step
  }
}
/*AQUI SE HACE EL FECHING THE POST*/

function fetchPosts(category) {
  return dispatch => {
    dispatch(requestPosts(category))
    return fetch(`${api}/posts`, { headers })
      .then(response => response.json())
      .then(  
              json => {
                        dispatch(receivePosts(category, json))
                        json.forEach(post => {
                          dispatch(fetchComments(post.id))
                        })
                    }
            )
            
  }
}

export function fetchComments(idPost) {
  return dispatch => {
    dispatch(requestComments(idPost))
    return fetch(`${api}/posts/${idPost}/comments`, { headers })
      .then(response => response.json())
      .then(json => {
                      json.length > 0 && (
                        dispatch(receiveComments(idPost, json))
                      )
                    }
            )
  }
}

function shouldFetchPosts(state, category) {
  const posts = state.posts[category]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category))
    }
  }
}

export function fetchSelectedPost(id) {
  return dispatch => {
    dispatch(requestSelectedPost(id))
    return fetch(`${api}/posts/${id}`, { headers })
      .then(response => response.json())
      .then(json => dispatch(receiveSelectedPost(id, json)))
  }
}

/****************************** CATEGORIES *********************************************/
export function selectedCategory(category) {
  return {
    type: SELECTED_CATEGORY,
    category
  }
}

function requestCategories(categories) {
  return {
    type: REQUEST_CATEGORIES,
    categories
  }
}

function receiveCategories(categories, json) {
  return {

    type: RECEIVE_CATEGORIES,
    categories,
    //items: json.data.children.map(child => child.data),
    items: Object.values(json.categories).map((category) =>{
          
          return {
                    name:category.name, 
                    path:category.path
                 }
        
      }),
    receivedAt: Date.now()
  }
}

function shouldFetchCategories(state, category) {
  const categories = state.categories[category]
  if (!categories) {
    return true
  } else if (categories.isFetching) {
    return false
  } else {
    return categories.didInvalidate
  }
}

export function fetchCategoriesIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchCategories(getState(), category)) {
      return dispatch(fetchCategories(category))
    }
  }
}

/*AQUI SE HACE EL FECHING THE CATEGORIES*/

function fetchCategories(categories) {
  return dispatch => {
    dispatch(requestCategories(categories))
    return fetch(`${api}/categories`, { headers })
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(categories, json)))
  }
}




export function showAllCategories (categories) {
  return {
    type: SHOW_ALL_CATEGORIES,
    categories,
  }
}

/*--AQUI UTILIZO THUNK MIDDLEWARE--*/
export const fetchAllCategories = () => dispatch => (
  ReadableAPI
      .getAllCategories()
      .then(categories => dispatch(showAllCategories(categories)))
);

/*INICIO - ALLPOSTS*/
export function showAllPosts ({posts}) {
  return {
    type: SHOW_ALL_POST,
    posts,
  }
}
  /*--AQUI UTILIZO THUNK MIDDLEWARE--*/
export const fetchAllPosts = () => dispatch => (
  ReadableAPI
      .getAllPosts()
      .then(posts => dispatch(showAllPosts(posts)))
);
/*FIN - ALLPOSTS*/

export function showPostsByCategory ({category}) {
  return {
    type: SHOW_POSTS_BY_CATEGORY,
    category,
  }
}