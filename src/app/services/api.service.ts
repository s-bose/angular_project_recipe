import { AxiosService } from './axios.service';
import { RecipeService } from './recipe.service';
import { RecipeModel } from '../models/recipe.model';
import { Injectable } from '@angular/core';

import { RecipeQueryModel } from '../models/recipe-query.model';

@Injectable()
export class ApiService {
    private urlRandom = 'https://www.themealdb.com/api/json/v1/1/random.php';   //  random recipe
    private urlById = 'https://www.themealdb.com/api/json/v1/1/lookup.php';     // query ?i=id
    private urlFilter = 'https://www.themealdb.com/api/json/v1/1/filter.php';   // query c = category 
                                                                                        // a = area 
                                                                                        // i = ingredients

    private urlList = 'https://www.themealdb.com/api/json/v1/1/list.php';       // list categories / Areas

    constructor(
        private axios: AxiosService,
        private recipeService: RecipeService) {}

    // parse the json response into RecipeModel object
    private parseMeal(meal_info: any): RecipeModel {

        const id = parseInt(meal_info[`idMeal`]);
        const title = meal_info[`strMeal`];
        const body = meal_info[`strInstructions`];
        const category = meal_info[`strCategory`];
        const area = meal_info[`strArea`];
        const thumbnail = meal_info[`strMealThumb`];
        const link = meal_info[`strYoutube`];
        const ingredients: {name: string, measure: string}[] = [];
        for (let i = 1; i <= 20; i++) {
            if (meal_info['strIngredient' + i] !== "" && meal_info['strMeasure' + i] !== "") {
                ingredients.push({'name': meal_info['strIngredient' + i], 'measure': meal_info['strMeasure' + i]});
            }
        }
        const recipe = new RecipeModel(id, title, body, category, area, thumbnail, link, ingredients);
        return recipe;
    }

    // get a random recipe
    private async RandomRecipe(): Promise<RecipeModel> {
        try {
          const recipeObject = await this.axios.get<any>({
            url: this.urlRandom,
          });
          const meals: any = recipeObject.meals.map(this.parseMeal);
          return new Promise<RecipeModel>((resolve, reject) => { resolve(meals[0]); });
        }
        catch (error) {
          console.error(error);
        }
    }

    // wrapper for async randomrecipe
    getRandomRecipe(): void {
        this.RandomRecipe()
        .then(recipe => {
            this.recipeService.clearSearch();
            this.recipeService.addRecipes(recipe);
        });
    }

    // get a list of recipes by search filter (category, area, main ingredient)
    private async RecipesByFilter(query: RecipeQueryModel) {
        try {
            let list = await this.axios.get<any>({
                url: this.urlFilter,
                params: {
                    a: query.area,
                    c: query.category,
                    i: query.mainIngredient,
                }
            });
            if (list.meals) {
                list = list.meals.map((elem) => {
                    return parseInt(elem['idMeal']);
                });
                return await Promise.all(list.map(async (id) => {
                    return await this.axios.get<any>({
                        url: this.urlById,
                        params: {
                            i: id,
                        }
                    });
                })).then(list => {
                    const recipeList: RecipeModel[] = list.map((item: any) => {
                        return this.parseMeal(item.meals[0]);
                    })
                    return recipeList;
                });
            } else {
                return [];
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    // wrapper for async recipesbyfilter
    getFilteredRecipes(query: RecipeQueryModel): void {
        this.RecipesByFilter(query)
        .then(list => {
            this.recipeService.clearSearch();
            this.recipeService.addMultipleRecipe(list);
        })
    }


    // get the list of all categories
    public async Categories() {
        try {
            let categories = await this.axios.get<any>({
                url: this.urlList,
                params: {
                    c: "list",
                }
            });

            categories = categories.meals.map(elem => {
                return elem["strCategory"];
            })
            return categories;
        }
        catch(err) {
            console.error(err);
        };
    }

    // get the list of all cuisines (area)
    public async Cuisines() {
        try {
            let cuisines = await this.axios.get<any>({
                url: this.urlList,
                params: {
                    a: "list",
                }
            });
            cuisines = cuisines.meals.map(elem => {
                return elem["strArea"];
            });
            return cuisines;
        }
        catch(err) {
            console.error(err);
        };
    }

}