import { EventEmitter } from '@angular/core';

import { RecipeModel } from './recipe.model';
import { shoppingItemModel } from '../shopping-list/shopping-item.model';

import { Subject } from 'rxjs';

export class RecipeService {
    RecipeChanged = new Subject<RecipeModel[]>();
    FavouritesChanged = new Subject<RecipeModel[]>();

    private recipeList: RecipeModel[] = []; // serves as the main list to display the searched / randomly generated entries
    private favouritesList: RecipeModel[] = []; // this is the persistant list


    constructor() {}
    
    getRecipes(): RecipeModel[] {
        return this.recipeList.slice();
    }

    addRecipes(recipeItem: RecipeModel): void {
        this.recipeList.push(recipeItem);
        this.RecipeChanged.next(this.recipeList);
    }    

    getFavouriteRecipes() {
        return this.favouritesList.slice();
    }

    getShoppingList() {
        return this.recipeList.filter(item => item.addedToShopping).map(item => {
            return new shoppingItemModel(item.title, item.ingredients);
        });
    }

    addFavouritedRecipe(recipe: RecipeModel) {
        // adds the favourited recipe into the favouriesList array and removes it from recipeList
        let recipeCopy: RecipeModel = Object.assign({}, recipe);    // copy the recipe object to disconnect shared reference
        this.favouritesList.push(recipeCopy);   // push to the favourites List
        let index =  this.recipeList.indexOf(recipe);
        this.recipeList.splice(index, 1);   // remove the item from the main list
        // console.log(this.favouritesList);
        this.FavouritesChanged.next(this.favouritesList);
        this.RecipeChanged.next(this.recipeList);

    }

    deleteFavouritedRecipe(recipe: RecipeModel) {
        // removes the recipe if clicked on unfavourite
        // will be removed from the favouritesList since it is already removed from the recipeList

        let index = this.favouritesList.indexOf(recipe);
        this.favouritesList.splice(index, 1);
        this.FavouritesChanged.next(this.favouritesList);
    }
}