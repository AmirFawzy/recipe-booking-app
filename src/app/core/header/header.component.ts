import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeService } from '../../recipes/recipe.service';
import { SingupService } from '../../auth/singup.service';
import * as fromApp from '../../ngrx/app.reducers';
import * as authActions from '../../auth/ngrx/auth.actions';
import * as recipeActions from '../../recipes/ngrx/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loginSuccessfully: string;
  private subscription: Subscription;
  isAuthenticated: boolean;

  constructor(
    private recipeServ: RecipeService,
    private router: Router,
    public signupSer: SingupService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth').subscribe(
      data => this.isAuthenticated = data.authenticated
    );
  }

  saveData() {
    this.store.dispatch(new recipeActions.StoreRecipes());
    /*this.recipeServ.sendData().subscribe(   // Handeled by NgRx Effect
      (response: HttpEvent<any>) => {
        switch (response.type) {
          case HttpEventType.UploadProgress:
            console.log(Math.round(100 * response.loaded / response.total));
            break;
          case HttpEventType.DownloadProgress:
            console.log(Math.round(100 * response.loaded / response.total));
            break;
          default: console.log(response);
            break;
        }
      },
      (err) => console.log('somthing went wrong')
    );*/
  }

  fetchData() {
    // this.recipeServ.getData().subscribe(
    //   data => console.log(data),
    //   err => console.log('somthing went wrong: ', err)
    // );
    this.store.dispatch(new recipeActions.FetchRecipes());
    // this.router.navigate(['/recipes']);
  }

  onSignout() {
    // this.recipeServ.signOut();
    // console.log(this.recipeServ.getRecipe());
    this.store.dispatch(new authActions.UserLogout());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
