import {
  SHOW_ALL_POST,
  SHOW_POSTS_BY_CATEGORY,
  SHOW_ALL_CATEGORIES
} from '../actions'
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
  react:{
        name: 'react',
        path: 'react'
      },
  redux:{
        name: 'redux',
        path: 'redux'
      },
  udacity:{
        name: 'udacity',
        path: 'udacity'
      }
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

function currentCategories (state = initialCategoryState, action) {
  const { category } = action

  switch (action.type) {
    case SHOW_ALL_CATEGORIES :
      return action.currentCategory === 'All'?initialCategoryState:state.filter(obj=>obj.currentCategory !== action.currentCategory);
    default :
      return state
  }
}

export default currentCategories