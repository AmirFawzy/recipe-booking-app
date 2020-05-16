import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRouting } from '../app.routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ShoppingListService } from '../shopping-list/shopping.service';
import { RecipeService } from '../recipes/recipe.service';
import { SingupService } from '../auth/singup.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AppRouting
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  exports: [
    HeaderComponent,
    AppRouting
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    SingupService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class CoreModule { }
