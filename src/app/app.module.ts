import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AccessingElementDirective } from './directives/accessing-element.directive';
import { AppRouting } from './app.routing.module';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

// import { shoppingListReducer } from './shopping-list/ngrx/shopping-list.reducers';
import { reducers } from './ngrx/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/ngrx/auth.effects';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AccessingElementDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // RecipesModule,
    // ShoppingListModule,
    AuthModule,
    AppRouting,
    CoreModule,
    BrowserAnimationsModule,
    // StoreModule.forRoot({ shoppingList: shoppingListReducer })
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffect]),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
