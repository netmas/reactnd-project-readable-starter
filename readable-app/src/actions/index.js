
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

export const ADD_VOTE_TO_POST = 'ADD_VOTE_TO_POST'

export const SUBSTRACT_VOTE_TO_POST = 'SUBSTRACT_VOTE_TO_POST'


const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/******************************POSTS*********************************************/

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

function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json,
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
/*AQUI SE HACE EL FECHING THE POST*/

function fetchPosts(category) {
  return dispatch => {
    dispatch(requestPosts(category))
    return fetch(`${api}/posts`, { headers })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(category, json)))
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


/* PROPOSED SHAPE OF SATE
{
  selectedCategory: 'all',
  posts: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: 1439478405547,
    items: [
      {
        id: 42,
        title: 'Confusion about Flux and Relay'
        ...
      },
      {
        id: 500,
        title: 'Creating a Simple Application Using React JS and Flux Architecture'
        ...
      }
    ]  
  },
  comments:{
    isFetching: false,
    lastUpdated: 1439478405547,
    items: [
      {
        id: 42,
        title: 'Confusion about Flux and Relay'
        ...
      },
      {
        id: 500,
        title: 'Creating a Simple Application Using React JS and Flux Architecture'
        ...
      }
    ]
  },
  categories:{
    isFetching: false,
    lastUpdated: 1439478405547,
    items: [
      {
        id: 42,
        title: 'Confusion about Flux and Relay'
        ...
      },
      {
        id: 500,
        title: 'Creating a Simple Application Using React JS and Flux Architecture'
        ...
      }
    ]
  }
}
*/

/*
export function addRecipe ({ day, recipe, meal }) {
  return {
    type: ADD_RECIPE,
    recipe,
    day,
    meal,
  }
}

export function removeFromCalendar ({ day, meal }) {
  return {
    type: REMOVE_FROM_CALENDAR,
    day,
    meal,
  }
}
*/

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