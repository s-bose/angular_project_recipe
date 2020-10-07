import { AxiosService } from './axios.service';
import { RecipeService } from './recipe.service';
import { RecipeModel } from '../models/recipe.model';
import { Injectable } from '@angular/core';

import { recipeQueryModel } from '../models/recipe-query.model';

@Injectable()
export class ApiService {
    private urlRandom: string = 'https://www.themealdb.com/api/json/v1/1/random.php';   //  random recipe
    private urlById: string = 'https://www.themealdb.com/api/json/v1/1/lookup.php';     // query ?i=id
    private urlFilter: string = 'https://www.themealdb.com/api/json/v1/1/filter.php';   // query c = category 
                                                                                //       a = area 
                                                                                //       i = ingredients

    constructor(
        private axios: AxiosService,
        private recipeService: RecipeService) {}

    // parse the json response into RecipeModel object
    private parseMeal(meal_info: any): RecipeModel {

        let id = parseInt(meal_info['idMeal']);
        let title = meal_info['strMeal'];
        let body = meal_info['strInstructions'];
        let category = meal_info['strCategory'];
        let area = meal_info['strArea'];
        let thumbnail = meal_info['strMealThumb'];
        let link = meal_info['strYoutube'];
        let ingredients: {name: string, measure: string}[] = [];
        for (let i = 1; i <= 20; i++) {
            if (meal_info['strIngredient' + i] !== "" && meal_info['strMeasure' + i] !== "") {
                ingredients.push({'name': meal_info['strIngredient' + i], 'measure': meal_info['strMeasure' + i]});
            }        
        }   
        let recipe = new RecipeModel(id, title, body, category, area, thumbnail, link, ingredients);
        return recipe;
    }

    // get a random recipe
    async RandomRecipe(): Promise<RecipeModel> {
        try {
          let recipeObject = await this.axios.get<any>({
            url: this.urlRandom,
          });
          let meals: any = recipeObject.meals.map(this.parseMeal);
          
          return new Promise<RecipeModel>((resolve, reject) => {resolve(meals[0])});
        }
        catch(error) {
          console.error(error);
        }
    }

    // wrapper for async randomrecipe
    getRandomRecipe(): void {
        this.RandomRecipe()
        .then(recipe => {
            this.recipeService.clearSearch();
            this.recipeService.addRecipes(recipe);
        })
    }

    // get a list of recipes by search filter (category, area, main ingredient)
    async RecipesByFilter(query: recipeQueryModel) {
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
                    let recipeList: RecipeModel[] = list.map((item: any) => {
                        return this.parseMeal(item.meals[0]);
                    })
                    return recipeList;
                });
            } else {
                return [];
            }
        }
        catch(err) {
            console.error(err);
        }
    }

    // wrapper for async recipesbyfilter
    getFilteredRecipes(query: recipeQueryModel): void {
        this.RecipesByFilter(query)
        .then(list => {
            this.recipeService.clearSearch();
            this.recipeService.addMultipleRecipe(list);
        })
    }
}