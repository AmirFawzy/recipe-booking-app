import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Recipe } from '../recipe-model';
import { RecipeService } from '../recipe.service';
import { SingupService } from '../../auth/singup.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/ngrx/shopping-list.actions';
import * as fromAuth from '../../auth/ngrx/auth.reducers';
import * as fromRecipes from '../ngrx/recipes.reducers';
import * as recipeActions from '../ngrx/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  // recipeState: Observable<fromRecipes.State>;
  recipeId: number;
  authState: Observable<fromAuth.State>;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    public signupServ: SingupService,
    private store: Store<fromRecipes.FeatureState>
  ) { }

  ngOnInit() {
    this.authState = this.store.select('auth');

    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params['id'];
        this.store.select('recipes').pipe(take(1)).subscribe(
          recipes => {
            this.recipe = recipes.recipes[this.recipeId];
          }
        );
        // this.recipeState = this.recipeService.getRcipeById(this.recipeId);
      }
    );
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditClick() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    // this.recipeService.deleteRecipe(this.recipeId);
    this.store.dispatch(new recipeActions.DeleteRecipe(this.recipeId));
    this.router.navigate(['recipes']);
  }
}
