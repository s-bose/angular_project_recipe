import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './home/home.component';


const appRoute: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'shopping', component: ShoppingListComponent },
  { path: 'recipes', component: RecipeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
