import {Ingredient} from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListServices } from './shoppinglist.services';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {
	
	private subscription: Subscription;

       ingredients: Ingredient[];
    
  constructor(private slServices: ShoppingListServices) { }

  ngOnInit() {
    this.ingredients=this.slServices.getShoppingList();
    this.subscription=this.slServices.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });

  } 
  
  onEditedItem(index : number) {
	  
	  this.slServices.startedEditing.next(index);
	  
  }
  
  ngOnDestroy(){
	  this.subscription.unsubscribe();
  }
	
 

}
