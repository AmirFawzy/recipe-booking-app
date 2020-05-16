import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping.service';
import * as ShoppingListActions from '../ngrx/shopping-list.actions';
import * as fromAppNgRx from '../../ngrx/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: true }) form: NgForm;
  subscription: Subscription;
  editMode = false;
  // editItemIndex: number;
  editingIngredient: Ingredient;

  constructor(private shoppingService: ShoppingListService, private store: Store<fromAppNgRx.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(data => {

      if (data.editedIngredientIndex > -1) {

        this.editingIngredient = data.editedIngredient;
        this.editMode = true;
        this.form.setValue({
          'name': this.editingIngredient.name,
          'amount': this.editingIngredient.amount
        });

      } else {

        this.editMode = false;

      }
    });

    // this.subscription = this.shoppingService.startedEditing.subscribe(
    //   (index: number) => {
    //     // this.editItemIndex = index;
    //     this.editMode = true;
    //     this.editingIngredient = this.shoppingService.getEditIngredient(index);
    //     this.form.setValue({
    //       'name': this.editingIngredient.name,
    //       'amount': this.editingIngredient.amount
    //     });
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      // this.shoppingService.update(this.editItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredent({ ingredent: newIngredient }));
    } else {
      // this.shoppingService.addIngredientItem(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this.onClear();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    // this.shoppingService.deleteIngredient(this.editItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
