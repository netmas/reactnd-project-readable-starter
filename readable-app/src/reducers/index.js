import { combineReducers } from 'redux'
import sortBy from 'sort-by'
import {
  SELECTED_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,

  SHOW_ALL_CATEGORIES,
  SHOW_CATEGORY,

  ORDER_POST_CHANGE,
  SHOW_ALL_POST,
  SHOW_POSTS_BY_CATEGORY,
  SELECT_POST,
  INVALIDATE_POSTS,
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


function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    order: 'asc',
    items: []
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
        order: action.order
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
  categories,
  posts
})

export default rootReducer
