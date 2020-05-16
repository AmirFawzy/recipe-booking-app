import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/ngrx/shopping-list.reducers';
import * as fromAuth from '../auth/ngrx/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.AuthReducers
};
