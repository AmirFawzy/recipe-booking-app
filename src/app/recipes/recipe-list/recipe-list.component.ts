import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Recipe } from '../recipe-model';
import { RecipeService } from '../recipe.service';
import { SingupService } from '../../auth/singup.service';
import * as fromAuth from '../../auth/ngrx/auth.reducers';
import * as fromRecipe from '../ngrx/recipes.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // recipes: Recipe[];
  recipesState: Observable<fromRecipe.State>;
  recipeItemID: number;
  subscription: Subscription;
  authState: Observable<fromAuth.State>;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    public signupServ: SingupService,
    private store: Store<fromRecipe.FeatureState>
  ) { }

  ngOnInit() {
    this.authState = this.store.select('auth');

    this.recipesState = this.store.select('recipes');

    // this.subscription = this.recipeService.recipeList.subscribe(
    //   (recipe: Recipe[]) => this.recipes = recipe
    // );
    // this.recipes = this.recipeService.getRecipe();
  }

  selectRecipeItem(evt, itemId: number) {
    this.recipeItemID = itemId;
    // this.router.navigate([itemId], {relativeTo: this.route}); // it's alos work
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
