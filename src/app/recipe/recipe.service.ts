import { RecipeModel } from './recipe.model'
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    NewRecipeAdded = new EventEmitter<RecipeModel[]>();
    showSelectedRecipe = new EventEmitter<RecipeModel>();
    popup: Subject<any> = new Subject<any>();

    private recipeList: RecipeModel[] = []; 
    private recipeSelected: RecipeModel;

    constructor() {}
    
    getRecipes(): RecipeModel[] {
        return this.recipeList.slice();
    }

    addRecipes(recipeItem: RecipeModel): void {
        this.recipeList.push(recipeItem);
        this.NewRecipeAdded.emit(this.recipeList);
    }    


}