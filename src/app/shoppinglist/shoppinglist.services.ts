import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListServices{

	ingredientsChanged = new Subject<Ingredient[]>();
	
	startedEditing = new Subject<number>();

	private ingredients: Ingredient[] = [
                                     
                                     new Ingredient('Apple', 5),
                                     new Ingredient('Orrange', 10)
                                     
									 ];

	getShoppingList(){
		return this.ingredients.slice();
	}
	
	getIngredient(index : number){
		return this.ingredients[index];
		
	}
	
	addIngredient (newIngredient: Ingredient){

		this.ingredients.push(newIngredient);
		this.ingredientsChanged.next(this.ingredients.slice());

		

	}

	addIngredients(ingrd : Ingredient[]){
		this.ingredients.push(...ingrd);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
	
	updateIngredient(index: number, newIngredient: Ingredient){
		
		this.ingredients[index] = newIngredient;
		this.ingredientsChanged.next(this.ingredients.slice());
		
	}
	
	
	deleteIngredient(index: number){
	
		this.ingredients.splice(index, 1);
		this.ingredientsChanged.next(this.ingredients.slice());
	}


									 

}