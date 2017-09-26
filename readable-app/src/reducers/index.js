import { combineReducers } from 'redux'
import {
  SELECTED_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,

  SHOW_ALL_CATEGORIES,
  SHOW_CATEGORY,

  SHOW_ALL_POST,
  SHOW_POSTS_BY_CATEGORY,
  SELECT_POST,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
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

/************************ POSTS ***************************************/
function selectedPost(state = 'all', action) {
  switch (action.type) {
    case SELECT_POST:
      return action.post
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
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
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
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
  categories
})

export default rootReducer
