import { combineReducers } from 'redux'
import sortBy from 'sort-by'
import {
  SELECTED_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,

  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,

  SHOW_ALL_CATEGORIES,
  SHOW_CATEGORY,

  ORDER_POST_CHANGE,
  SHOW_ALL_POST,
  SHOW_POSTS_BY_CATEGORY,
  SELECT_POST,
  INVALIDATE_POSTS,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_VOTE_TO_POST,
  SUBSTRACT_VOTE_TO_POST,
  ADD_NEW_POST,
  EDIT_POST,
  REQUEST_SELECTED_POST,
  RECEIVE_SELECTED_POST,
  ADD_NEW_COMMENT,
  EDIT_COMMENT,
  ADD_VOTE_TO_COMMENT,
  SUBSTRACT_VOTE_TO_COMMENT,
  DELETE_POST,
  DELETE_COMMENT
} from '../actions'
/************************ CATEGORIES ***********************************/
function selectedCategory(state = 'all', action) {
  switch (action.type) {
    case SELECTED_CATEGORY:
      return action.category
    default:
      return state
  }
}

function categories(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function comments(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_COMMENTS:
      let comments = [...state.items, ...action.comments]
      var dups = [];
      var arr = comments.filter((el) => {
        // If it is not a duplicate, return true
        if (dups.indexOf(el.id) == -1) {
          dups.push(el.id);
          return true;
        }
        return false;
      });

      /*The new Set removes duplicates automatically*/
      //let comments_without_duplicates = Array.from(new Set(comments));
      return  Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.receivedAt,
        items: arr
      })
    case ADD_NEW_COMMENT:
    let newComment = {id:action.id, timestamp:action.timestamp, body:action.body, author:action.author, parentId:action.parentId};
    let addComment = [...state.items, newComment]
    return {
        ...state,
        items: addComment
    }
    case EDIT_COMMENT:
    const commentEditIndex = state.items.findIndex(item => item.id === action.id) // this will get the exact post index
    let editComment = [...state.items]
    editComment[commentEditIndex] = {
        body:action.body,
        timestamp:action.timestamp
    }
    return {
        ...state,
        items: editComment
    }
    case ADD_VOTE_TO_COMMENT:
    //alert(action.id)
    let commentToAddVote = state.items.find(item => item.id === action.id) // this will get the exact post that you need
    let commentToAddVoteIndex = state.items.findIndex(item => item.id === action.id) // this will get the exact post index
    let newCommentsToAddVote = [...state.items]
    newCommentsToAddVote[commentToAddVoteIndex] = {
        ...commentToAddVote,
        voteScore: commentToAddVote.voteScore + action.step,
    }
    return {
        ...state,
        items: newCommentsToAddVote
    }
    case SUBSTRACT_VOTE_TO_COMMENT:
    //alert(action.id)
    let commentToSubsVote = state.items.find(item => item.id === action.id) // this will get the exact post that you need
    let commentToSubsVoteIndex = state.items.findIndex(item => item.id === action.id) // this will get the exact post index
    let newCommentsToSubsVote = [...state.items]
    newCommentsToSubsVote[commentToSubsVoteIndex] = {
        ...commentToSubsVote,
        voteScore: commentToSubsVote.voteScore - action.step,
    }
    return {
        ...state,
        items: newCommentsToSubsVote
    }
    default:
      return state
  }
}

/************************ POSTS ***************************************/


function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    order: 'asc',
    orderField: 'voteScore',
    items: [],
    selectedPost:[]
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_POSTS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    case ORDER_POST_CHANGE:
    return Object.assign({}, state, {
        order: action.order,
        orderField: action.field
      })
    case ADD_VOTE_TO_POST:
    const post = state.items.find(item => item.id === action.id) // this will get the exact post that you need
    const postIndex = state.items.findIndex(item => item.id === action.id) // this will get the exact post index
    const newPosts = [...state.items]
    newPosts[postIndex] = {
        ...post,
        voteScore: post.voteScore + action.step,
    }
    return {
        ...state,
        items: newPosts
    }
    case SUBSTRACT_VOTE_TO_POST:
    const postSubs = state.items.find(item => item.id === action.id) // this will get the exact post that you need
    const postIndexSubs = state.items.findIndex(item => item.id === action.id) // this will get the exact post index
    const newPostsSubs = [...state.items]
    newPostsSubs[postIndexSubs] = {
        ...postSubs,
        voteScore: postSubs.voteScore - action.step,
    }
    return {
        ...state,
        items: newPostsSubs
    }
    case ADD_NEW_POST:
    let newpost = {id:action.id, timestamp:action.timestamp, title:action.title, body:action.body, author:action.author, category:action.category, voteScore:0, deleted:false };
    const posts = [...state.items, newpost]
    return {
        ...state,
        items: posts
    }
    case EDIT_POST:
    const postEditIndex = state.items.findIndex(item => item.id === action.id) // this will get the exact post index
    let editPosts = [...state.items]
    editPosts[postEditIndex] = {
        title:action.title,
        body:action.body,
        category:action.category,
        author:action.author,
        timestamp:action.timestamp,
        voteScore: action.voteScore,
        deleted:action.deleted
    }
    return {
        ...state,
        items: editPosts
    }
    case REQUEST_SELECTED_POST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_SELECTED_POST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        selectedPost: action.selectedPost,
        lastUpdated: action.receivedAt
      })
    case DELETE_POST:
    const allPosts = [...state.items]
    let nonDeletedPosts = Object.values(allPosts).filter(e => e.id !== action.id)
    return {
        ...state,
        items: nonDeletedPosts
    }
    default:
      return state
  }
}


/*
const initialCalendarState = {
  sunday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  monday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  tuesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  wednesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  thursday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  friday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  saturday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
}
*/

const initialCategoryState = {
  isFeching:false,
  didInvalidate:false,
  items:[]
}


/*
function calendar (state = initialCalendarState, action) {
  const { day, recipe, meal } = action

  switch (action.type) {
    case ADD_RECIPE :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label,
        }
      }
    case REMOVE_FROM_CALENDAR :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      }
    default :
      return state
  }
}
*/
/*
function currentCategories (state = initialCategoryState, action) {
  const { category } = action

  switch (action.type) {
    case SHOW_ALL_CATEGORIES :
      return action.currentCategory === 'All'?initialCategoryState:state.filter(obj=>obj.currentCategory !== action.currentCategory);
    default :
      return state
  }
}
*/
//export default currentCategories

/* SACAR COMENTARIO CUANDO ESTE LISTO*/
const rootReducer = combineReducers({
  selectedCategory,
  categories,
  posts,
  comments
})

export default rootReducer
