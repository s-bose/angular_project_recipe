import { EventEmitter } from '@angular/core';

import { RecipeModel } from './recipe.model';
import { shoppingItemModel } from '../shopping-list/shopping-item.model';

export class RecipeService {
    NewRecipeAdded = new EventEmitter<RecipeModel[]>();

    private recipeList: RecipeModel[] = []; 
    constructor() {}
    
    getRecipes(): RecipeModel[] {
        return this.recipeList.slice();
    }

    addRecipes(recipeItem: RecipeModel): void {
        this.recipeList.push(recipeItem);
        this.NewRecipeAdded.emit(this.recipeList);
    }    

    getFavouriteRecipes() {
        return this.recipeList.filter(item => item.favourite);
    }

    getShoppingList() {
        return this.recipeList.filter(item => item.addedToShopping).map(item => {
            return new shoppingItemModel(item.title, item.ingredients);
        });
    }
}