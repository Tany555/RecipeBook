import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "./recipe.model";
import { RecipeServices } from '../recipe.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit, OnDestroy {

 

 recipes: Recipe[];
subscription : Subscription;

    
  constructor(private recipeServices: RecipeServices,
              private router :Router,
              private route : ActivatedRoute
    ) { }

  ngOnInit() {
	
	this.subscription=this.recipeServices.recipeChanged
	.subscribe(
		(recipes : Recipe[])=> {
			this.recipes = recipes;
		}
		
	);

    this.recipes = this.recipeServices.getRecipes();

  }
  onNewRecipe(){

    this.router.navigate(['new'], {relativeTo: this.route});
    
    
  }

ngOnDestroy(){
	  this.subscription.unsubscribe();
  }


}
