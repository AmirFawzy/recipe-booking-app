import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping.service';
import * as ShoppingListActions from './ngrx/shopping-list.actions';
import * as fromAppNgRx from '../ngrx/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', [
          animate('1s ease-in', style({ opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          animate('800ms ease-out', style({ opacity: 0 }))
        ], { optional: true })
      ])
    ])
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(private shoppingService: ShoppingListService, private store: Store<fromAppNgRx.AppState>) { }

  ngOnInit() {
    // this.ingredients = this.shoppingService.getIngredients();
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.shoppingService.ingredientChanged.subscribe(
    //   (ingredientsList: Ingredient[]) => this.ingredients = ingredientsList
    // );
  }

  onEditItem(index: number): void {
    // this.shoppingService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
