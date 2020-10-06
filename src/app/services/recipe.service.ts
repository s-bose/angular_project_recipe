
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
    // private shoppingList = new Set<shoppingItemModel>();

    constructor() {}
    
    getRecipes(): RecipeModel[] {
        return this.recipeList.slice();
    }

    addRecipes(recipeItem: RecipeModel, listView: boolean = false): void {
        if (!listView) {
            this.recipeList = [];
        }
        this.recipeList.push(recipeItem);
        this.RecipeChanged.next(this.recipeList);
    }

    getFavouriteRecipes() {
        return this.favouritesList.slice();
    }

    addFavouritedRecipe(recipe: RecipeModel) {
        // adds the favourited recipe into the favouriesList array and removes it from recipeList

        let recipeCopy: RecipeModel = Object.assign({}, recipe);    // copy the recipe object to disconnect shared reference
        this.favouritesList.push(recipeCopy);                       // push to the favourites List
        let index =  this.recipeList.indexOf(recipe);
        this.recipeList.splice(index, 1);                           // remove the item from the main list
        this.FavouritesChanged.next(this.favouritesList);
        this.RecipeChanged.next(this.recipeList);

    }

    deleteFavouritedRecipe(recipe: RecipeModel) {
        /*
         * removes the recipe if clicked on unfavourite
         * will be removed from the favouritesList since 
         * it is already removed from the recipeList
        */
       
        let index = this.favouritesList.indexOf(recipe);
        this.favouritesList.splice(index, 1);
        this.FavouritesChanged.next(this.favouritesList);
    }

    getShoppingList() {
        console.log(this.shoppingList);
        return this.shoppingList.slice();
        // return Array.from(this.shoppingList);
    }

    addToShoppingList(shoppingItem: shoppingItemModel) {
        this.shoppingList.push(shoppingItem);
        this.ShoppingChanged.next(this.shoppingList);
        // this.shoppingList.add(shoppingItem);
        // this.ShoppingChanged.next(Array.from(this.shoppingList));
    }

    deleteFromShoppingList(shoppingItem: shoppingItemModel) {
        let index = this.shoppingList.indexOf(shoppingItem);
        this.shoppingList.splice(index, 1);
        this.ShoppingChanged.next(this.shoppingList);
        // this.shoppingList.delete(shoppingItem);
        // this.ShoppingChanged.next(Array.from(this.shoppingList));
    }
}