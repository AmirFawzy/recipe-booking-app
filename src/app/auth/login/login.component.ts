import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SingupService } from '../singup.service';
import { RecipeService } from '../../recipes/recipe.service';
import * as fromApp from '../../ngrx/app.reducers';
import * as authActions from '../ngrx/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinErrorMsg: string;

  constructor(
    public signupServ: SingupService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.mail;
    const password = form.value.password;

    // this.signupServ.onSignin(email, password);
    this.store.dispatch(new authActions.UserTrySignin({ email: email, password: password }));

    this.signupServ.loginSuccessfully.subscribe(
      (status: boolean) => {
        if (status) {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      }
    );
    this.signupServ.signinErrorMsg.subscribe(
      errMsg => this.signinErrorMsg = errMsg
    );
  }

}
