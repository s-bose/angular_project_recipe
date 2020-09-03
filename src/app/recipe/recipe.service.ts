import { RecipeModel } from './recipe.model'
import { EventEmitter } from '@angular/core';

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
        console.log(this.recipeList);
        return this.recipeList.filter(item => item.favourite);
    }
}