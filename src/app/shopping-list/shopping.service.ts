import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 2),
        new Ingredient('Avocado', 3)
    ];

    // getIngredients(): Ingredient[] {
    //     return this.ingredients.slice();
    // }

    getEditIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    // addIngredientItem(newIngredient: Ingredient): void {
    //     this.ingredients.push(newIngredient);
    //     this.ingredientChanged.next(this.ingredients.slice());
    // }

    // addIngredients(ingredients: Ingredient[]) {
    //     this.ingredients.push(...ingredients);
    //     this.ingredientChanged.next(this.ingredients);
    // }

    update(index: number, newIngredient: Ingredient): void {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients);
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients);
    }
}
