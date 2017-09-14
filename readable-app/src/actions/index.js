//export const ADD_RECIPE = 'ADD_RECIPE'
//export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'

export const SHOW_CATEGORY = 'SHOW_CATEGORY'

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

export function showCategory ({currentCategory}) {
  return {
    type: SHOW_CATEGORY,
    currentCategory,
  }
}