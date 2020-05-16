import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SingupService } from '../singup.service';
import * as fromApp from '../../ngrx/app.reducers';
import * as authActions from '../ngrx/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMsg: string;
  error: boolean;

  constructor(
    private signupServ: SingupService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.mail;
    const password = form.value.password;

    // this.signupServ.onSignup(email, password);
    this.store.dispatch(new authActions.UserTrySignup({ email: email, password: password }));

    this.signupServ.error.subscribe(
      (err: boolean) => {
        this.error = err;
        if (err === false) {
          this.router.navigate(['/signin']);
        }
      }
    );

    this.signupServ.errorMsg.subscribe(
      (msg: string) => this.errorMsg = msg
    );
  }

}
