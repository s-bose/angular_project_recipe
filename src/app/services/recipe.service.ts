
import { Subject } from 'rxjs';

import { RecipeModel } from '../models/recipe.model';
import { shoppingItemModel } from '../models/shopping-item.model';


export class RecipeService {
    RecipeChanged = new Subject<RecipeModel[]>();
    FavouritesChanged = new Subject<RecipeModel[]>();
    ShoppingChanged = new Subject<shoppingItemModel[]>();

    private recipeList: RecipeModel[] = []; // serves as the main list to display the searched / randomly generated entries
    private favouritesList: RecipeModel[] = []; // this is the persistent list
    private shoppingList: shoppingItemModel[] = [];


    constructor() {}

    // ! SECTION RECIPES
    getRecipes(): RecipeModel[] {
        return this.recipeList.slice();
    }

    addRecipes(recipeItem: RecipeModel): void {
        this.recipeList.push(recipeItem);
        this.RecipeChanged.next(this.recipeList);
    }

    addMultipleRecipe(list: RecipeModel[]): void {
        this.recipeList = this.recipeList.concat(list);
        this.RecipeChanged.next(this.recipeList);
    }

    clearSearch(): void {
        this.recipeList = [];
        this.RecipeChanged.next(this.recipeList);
    }


    // ! SECTION FAVOURITES
    getFavouriteRecipes(): RecipeModel[] {
        return this.favouritesList.slice();
    }

    addFavouritedRecipe(recipe: RecipeModel): void {
        // adds the favourited recipe into the favouriesList array and removes it from recipeList

        const recipeCopy: RecipeModel = Object.assign({}, recipe);    // copy the recipe object to disconnect shared reference
        this.favouritesList.push(recipeCopy);                       // push to the favourites List
        const index =  this.recipeList.indexOf(recipe);
        this.recipeList.splice(index, 1);                           // remove the item from the main list
        this.FavouritesChanged.next(this.favouritesList);
        this.RecipeChanged.next(this.recipeList);
    }

    deleteFavouritedRecipe(recipe: RecipeModel): void {
        /*
         * removes the recipe if clicked on unfavourite
         * will be removed from the favouritesList since
         * it is already removed from the recipeList
        */

        const index = this.favouritesList.indexOf(recipe);
        this.favouritesList.splice(index, 1);
        this.FavouritesChanged.next(this.favouritesList);
    }


    // ! SECTION SHOPPING LIST
    getShoppingList(): shoppingItemModel[] {
        console.log(this.shoppingList);
        return this.shoppingList.slice();
    }

    addToShoppingList(shoppingItem: shoppingItemModel): void {
        this.shoppingList.push(shoppingItem);
        this.ShoppingChanged.next(this.shoppingList);
    }

    deleteFromShoppingList(shoppingItem: shoppingItemModel): void {
        const index = this.shoppingList.indexOf(shoppingItem);
        this.shoppingList.splice(index, 1);
        this.ShoppingChanged.next(this.shoppingList);
    }
}
