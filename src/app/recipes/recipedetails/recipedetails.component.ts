import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipelist/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServices } from 'src/app/shoppinglist/shoppinglist.services';
import { RecipeServices } from '../recipe.services';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.css']
})
export class RecipedetailsComponent implements OnInit {

 recipe: Recipe;
 id: number;



  constructor(private recepiServices : RecipeServices,
              private route:ActivatedRoute,
              private router: Router
    ) { }

  ngOnInit() {

    this.route.params
    .subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe= this.recepiServices.getRecipeByID(this.id);
    }
    );

  }

  onToTheShoppingList(){

    this.recepiServices.addIngredientsTotheShoppinglist(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
     //other way to do it .... more complex path   --- both way we can do
    //  this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    

  }

onDelete(){
	
	this.recepiServices.deleteRecipe(this.id);
	this.router.navigate(['/recipe']);
	
	
}

  
}
