//export const ADD_RECIPE = 'ADD_RECIPE'
//export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'
import * as ReadableAPI from '../ReadableAPI'
export const SHOW_CATEGORY = 'SHOW_CATEGORY'

export const SHOW_ALL_CATEGORIES = 'SHOW_ALL_CATEGORIES'

export const SHOW_ALL_POST = 'SHOW_ALL_POST'

export const SHOW_POSTS_BY_CATEGORY = 'SHOW_POSTS_BY_CATEGORY'

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

export function showAllCategories () {
  return {
    type: SHOW_ALL_CATEGORIES,
  }
}

/*--AQUI UTILIZO THUNK MIDDLEWARE--*/
export const fetchAllCategories = () => dispatch => (
  ReadableAPI
      .getAllCategories()
      .then(category => dispatch(showAllCategories(category)))
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