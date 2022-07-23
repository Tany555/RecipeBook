import { Recipe } from './recipelist/recipe.model';
import {Injectable} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListServices } from '../shoppinglist/shoppinglist.services';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage-services';

@Injectable()
export class RecipeServices{
	
	recipeChanged = new Subject <Recipe[]>();

	 recipeSelected = new Subject<Recipe>();

	 recipes: Recipe[] = [/*new Recipe('Biriyani',
						  'This test Biriyani recipe', 
						  "https://thumbs.dreamstime.com/b/chicken-biryani-indian-pilau-rice-19004171.jpg",
						  [new Ingredient('Meat', 10),
						   new Ingredient('Rice', 2)]),
						 new Recipe('Ice Cream',
						  'This test Ice Cream recipe',
						   "https://www.teahub.io/photos/full/358-3581164_cute-ice-cream-hd-photo-ice-cream-background.jpg",
						   [new Ingredient('Cream', 2),
							new Ingredient('Ice Cream Holder', 2)]),
						 new Recipe('Sandwitch',
						  'This test Sandwitch recipe',
						   "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3338409.jpg",
						   [new Ingredient('Bread', 2),
							new Ingredient('Meat', 2),
							new Ingredient('Potato', 2)]),
						 new Recipe('Chappan Bhog',
						  'This test Chappan Bhog recipe',
						   "https://chhappanbhogvadodara.com/wp-content/uploads/2017/12/240_F_170385123_sSN1Cf07SWbUzgtcGg5fcdlCFVaX0Qkj.jpg",
						   [new Ingredient('Bread', 2),
							new Ingredient('Meat', 2),
							new Ingredient('Potato', 2),
							new Ingredient('Chatni', 3)])*/
						 ];

		constructor(private slService: ShoppingListServices){}		
		
	FetchRecipeData(recipe: Recipe[]){
		this.recipes = recipe;
		this.recipeChanged.next(this.recipes.slice());
		
	}			 
						  
	getRecipes(){
		return this.recipes.slice();
	}	

	getRecipeByID(index: number){

		return this.recipes[index];

	}
	
	addIngredientsTotheShoppinglist(ingredients: Ingredient[]){

		this.slService.addIngredients(ingredients);
		

	} 
	
	addRecipe(recipe : Recipe){
		
		this.recipes.push(recipe);
		this.recipeChanged.next(this.recipes.slice());
	}
	
	updateRecipe(index : number, newRecipe : Recipe){
		
		this.recipes[index] = newRecipe;
		this.recipeChanged.next(this.recipes.slice());
	}
	
	deleteRecipe(index: number){
		
		this.recipes.splice(index, 1);
		this.recipeChanged.next(this.recipes.slice());
	}

	

}