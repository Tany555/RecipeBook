import {Ingredient} from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { ShoppingListServices } from '../shoppinglist.services';
import {NgForm} from '@angular/forms'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

	@ViewChild('f') slForm : NgForm;
	
	
	subscription : Subscription;
	editedItemIndex: number;
	editMode = false;
	editedItem: Ingredient;
 

  constructor(private slServices: ShoppingListServices) { }

  ngOnInit()  { 
	  
	  this.subscription = this.slServices.startedEditing
.subscribe(
		(index: number)=>{
		  this.editedItemIndex=index;
		  this.editMode = true;
		  this.editedItem = this.slServices.getIngredient(index);
		  this.slForm.setValue({
			  name: this.editedItem.name,
			  amount: this.editedItem.amount
		  })
		  
	  });
	  
  }

  onClickAdd(form: NgForm){
   
    const value = form.value;

    const newIngredient = new Ingredient(value.name,value.amount);

if(this.editMode){
	
	this.slServices.updateIngredient(this.editedItemIndex, newIngredient)
	
} else{
	  this.slServices.addIngredient(newIngredient);
}

  this.editMode=false;
	form.reset();

  }


onDelete(){
	this.slServices.deleteIngredient(this.editedItemIndex);
	this.onClear();
	
}

 ngOnDestroy(){
	  this.subscription.unsubscribe();
  }

onClear(){
	this.slForm.reset();
	 this.editMode=false;
}

}
