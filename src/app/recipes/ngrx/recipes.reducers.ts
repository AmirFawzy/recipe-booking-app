import { Recipe } from '../recipe-model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as recipeActions from './recipes.actions';
import * as fromApp from '../../ngrx/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe('Tasty Schnitzel',
      'A super tasty schnitzel - just awesome!',
      'http://orogold.com/wp-content/uploads/2015/10/orogold-healthy-and-tasty-german-dishes-schnitzel.jpg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://www.eatthis.com/content/uploads//media/images/ext/111576974/mcdonalds-Big-Mac-1024-750.jpg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('Bread', 1)
      ])
  ]
};

export function recipesReducer(state = initialState, action: recipeActions.RecipeActions) {
  switch (action.type) {
    case recipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      } as State;
      break;
    case recipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      } as State;
    case recipeActions.UPDATE_RECIPE:
      const oldRecipe = state.recipes;
      oldRecipe.splice(action.payload.index, 1);
      return {
        ...state,
        recipes: [...oldRecipe, action.payload.recipe]
      } as State;
    case recipeActions.DELETE_RECIPE:
      const newRecipes = state.recipes;
      newRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: [...newRecipes]
      } as State;
    default:
      return state;
  }
}
