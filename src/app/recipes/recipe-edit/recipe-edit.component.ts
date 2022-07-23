import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeServices } from '../recipe.services';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  @Input() id : number;
  editMode= false;
  recipeForm :FormGroup;	
  	

  constructor(private route : ActivatedRoute,
			  private recipeService: RecipeServices,
			  private router : Router	 						
				) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params)=> {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
		this.initForm();
        //console.log(this.editMode)
      }
    );

  }

 get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

onSubmit(){
//	const newRecipe = new Recipe(
//		this.recipeForm.value['name'],
//		this.recipeForm.value['description'],
//		this.recipeForm.value['imagePath'],
//		this.recipeForm.value['ingredients']
//		);
	
	if(this.editMode){
		this.recipeService.updateRecipe(this.id, this.recipeForm.value);
	}else {
		this.recipeService.addRecipe(this.recipeForm.value);
	}
	this.onCancel();
}

onCancel(){
	this.router.navigate(['../'], {relativeTo: this.route});
	
}

onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

onDeleteIngredient(index: number){
	(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}



private initForm(){
	
	let recipeName ='';
	let imagePath ='';
	let description ='';
	let recipeIngredients = new FormArray([]);
	
	
	if(this.editMode){
		const recipe = this.recipeService.getRecipeByID(this.id);
		recipeName= recipe.name;
		imagePath = recipe.imagePath;
		description= recipe.description;
		if(recipe['ingredients']){
			for(let ingredient of recipe.ingredients){
				recipeIngredients.push(
					new FormGroup({
					'name': new FormControl(ingredient.name, Validators.required),
					'amount': new FormControl(ingredient.amount, Validators.required),
					
				})
				);
			}
		}
	}
	
	this.recipeForm = new FormGroup({
		'name': new FormControl(recipeName, Validators.required),
		'description': new FormControl(description, Validators.required),
		'imagePath': new FormControl(imagePath, Validators.required),		
		'ingredients': recipeIngredients
	});
}

}
