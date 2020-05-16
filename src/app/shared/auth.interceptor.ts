import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { SingupService } from '../auth/singup.service';
import * as fromApp from '../ngrx/app.reducers';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    // private signupSer: SingupService,
    private store: Store<fromApp.AppState>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    // const copiedReq = req.clone({ params: req.params.set('auth', this.signupSer.getToken()) });
    // return next.handle(copiedReq);
    return this.store.select('auth').pipe(
      take(1),
      switchMap(authState => {
        const copiedReq = req.clone({ params: req.params.set('auth', authState.token) });
        return next.handle(copiedReq);
      })
    );
  }
}
