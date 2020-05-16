import { Recipe } from './recipe-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping.service';
import { SingupService } from '../auth/singup.service';
import * as ShoppingListActions from '../shopping-list/ngrx/shopping-list.actions';
import * as fromApp from '../ngrx/app.reducers';
import * as authActions from '../auth/ngrx/auth.actions';

const orignalRecipeList: Recipe[] = [
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
];

@Injectable()
export class RecipeService {
    recipeList = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
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
    ];

    constructor(
        // private shoppingService: ShoppingListService,
        private httpClient: HttpClient,
        private signupServ: SingupService,
        private store: Store<fromApp.AppState>
    ) { }

    getRecipe(): Recipe[] {
        return this.recipes.slice();
    }

    getRcipeById(id: number): Recipe {
        return this.recipes[id];
    }

    // addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //     // this.shoppingService.addIngredients(ingredients);
    //     this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    // }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipeList.next(this.recipes);
    }

    updateRecipe(index: number, newRecipe: Recipe): void {
        this.recipes[index] = newRecipe;
        this.recipeList.next(this.recipes);
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipeList.next(this.recipes);
    }

    sendData() {
        // const token = this.signupServ.getToken();
        // const headers = new HttpHeaders().set('Authorization', 'somethin and token');

        // return this.httpClient.put('https://ng-recipe-book-9f1fd.firebaseio.com/recipes.json',
        //     this.getRecipe(), {
        //         observe: 'body',
        //         // headers: headers
        //         params: new HttpParams().set('auth', token)
        //     });
        // const req = new HttpRequest<Recipe[]>('PUT', 'https://ng-recipe-book-9f1fd.firebaseio.com/recipes.json',
        //     this.getRecipe(), { reportProgress: true, params: new HttpParams().set('auth', token) });

        // Handeled by NgRx Effect
        /*const req = new HttpRequest<Recipe[]>('PUT', 'https://ng-recipe-book-9f1fd.firebaseio.com/recipes.json',
            this.getRecipe(), { reportProgress: true });
        return this.httpClient.request(req);*/
    }

    getData() {
        // const token = this.signupServ.getToken();

        // this.httpClient.get('https://ng-recipe-book-9f1fd.firebaseio.com/recipes.json?auth=' + token, {
        //     observe: 'response',
        //     responseType: 'text' // 'blob', 'arraybuffer'
        // });

        // return this.httpClient.get<Recipe[]>('https://ng-recipe-book-9f1fd.firebaseio.com/recipes.json', {
        //     params: new HttpParams().set('auth', token)
        // })

        // handeled by NgRx Effects
        /*return this.httpClient.get<Recipe[]>('https://ng-recipe-book-9f1fd.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json'
        })
            .pipe(map((recipes) => {
                this.recipes = recipes;
                this.recipeList.next(this.recipes);
                console.log(this.recipes);
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return this.recipes;
            }), catchError((err: Response) => {
                return throwError(err);
            }));*/
    }

    signOut() {
        firebase.auth().signOut();
        // this.signupServ.token = null;
        this.store.dispatch(new authActions.UserLogout());
        this.recipes = orignalRecipeList;
        this.recipeList.next(this.recipes.slice());
    }

}
