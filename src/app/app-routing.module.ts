import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule} from '@angular/core';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { HelpComponent } from './help/help.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipedetailsComponent } from './recipes/recipedetails/recipedetails.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGaurd } from './auth/auth.gaurd';

const routes: Routes =[
{path: '', redirectTo: '/recipe', pathMatch: 'full'},
{path:'recipe',canActivate: [AuthGaurd], component: RecipesComponent, children: [
  {path: '',    component: RecipeStartComponent},  
  {path: 'new', component: RecipeEditComponent},
  {path: ':id', component: RecipedetailsComponent},
  {path: ':id/edit', component: RecipeEditComponent}
]},
{path: 'shoppingList', component: ShoppinglistComponent},
{path: 'help', component: HelpComponent},
{path: 'auth', component: AuthComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  
  
})

export class AppRoutingModule{

}