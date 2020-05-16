import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';

import * as recipeActions from './recipes.actions';
import { Recipe } from '../recipe-model';
import * as fromRecipe from './recipes.reducers';

@Injectable()
export class RecipeEffects {
  @Effect() fetchRecipes: Observable<Action> = this.actions.pipe(
    ofType(recipeActions.FETCH_RECIPES),
    switchMap((action: recipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-9f1fd.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      });
    }),
    map(recipes => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return {
        type: recipeActions.SET_RECIPES,
        payload: recipes
      } as Action;
    })
  );

  @Effect({ dispatch: false }) storeRecipes = this.actions.pipe(
    ofType(recipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest<Recipe[]>('PUT', 'https://ng-recipe-book-9f1fd.firebaseio.com/recipes.json',
        state.recipes, { reportProgress: true });
      return this.httpClient.request(req);
    })
  );

  constructor(
    private actions: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>
  ) { }
}
