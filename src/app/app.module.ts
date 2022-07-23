import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipelistComponent } from './recipes/recipelist/recipelist.component';
import { RecipeitemComponent } from './recipes/recipelist/recipeitem/recipeitem.component';
import { RecipedetailsComponent } from './recipes/recipedetails/recipedetails.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ShoppingEditComponent } from './shoppinglist/shopping-edit/shopping-edit.component';
import { HelpComponent } from './help/help.component';
import {DropdownDirective} from './shared/dropdown.directive'
import { ShoppingListServices } from './shoppinglist/shoppinglist.services';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeServices } from './recipes/recipe.services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthComponent } from './auth/auth.component';
import { AuthServices } from './auth/auth.serivces';
import { LoadingSpinnerComponent } from './shared/spinner.component';
import { AuthInterceptorService } from './auth/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipelistComponent,
    RecipeitemComponent,
    RecipedetailsComponent,
    ShoppinglistComponent,
    ShoppingEditComponent,
    HelpComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
	AuthComponent,
	LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
	ReactiveFormsModule, 
	HttpClientModule
  ],
  providers: [ShoppingListServices, RecipeServices, AuthServices, {
	provide: HTTP_INTERCEPTORS,
	useClass: AuthInterceptorService,
	multi: true
	}],
  bootstrap: [AppComponent]
})
export class AppModule { }
  