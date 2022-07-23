import { HttpClient, HttpParams } from "@angular/common/http";
import { take, exhaustMap, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { AuthServices } from "../auth/auth.serivces";
import { RecipeServices } from "../recipes/recipe.services";
import { Recipe } from "../recipes/recipelist/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService{
	
	constructor(private http: HttpClient,
				private recipeService : RecipeServices,
				private authService: AuthServices){}
	
	
	storeData(){
		
		let recipes = this.recipeService.getRecipes();
		
		
		
		this.http.put('https://recipe-8169e-default-rtdb.firebaseio.com/Recipes.json', recipes)
		.subscribe(responce=>{
			console.log(responce);
		})
	}
	
	
	fetchData() {		
    
        return this.http.get<Recipe[]>( 
          'https://recipe-8169e-default-rtdb.firebaseio.com/Recipes.json'
       )
		.pipe( 
      map(recipes => {	
        return recipes.map(recipe => {	
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.FetchRecipeData(recipes); 

      })

    );


  }

 /*fetchRecipes() {
	
	console.log('fething  1********')
    return this.http
      .get<Recipe[]>(
        'https://projectapp-2d801-default-rtdb.firebaseio.com/Recipes.json')
      .pipe(map(recipes => {
	console.log('fething  2********')
          return recipes.map(recipe => {
            
return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
          })
        ).
        subscribe(recipes => {
	console.log('fething  3********')
          this.recipeService.FetchRecipeData(recipes);
        });
      
  }*/
	
	
	
}


