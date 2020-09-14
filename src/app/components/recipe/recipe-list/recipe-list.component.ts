import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { AxiosService } from '../../../shared/axios/axios.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
  // public axiosClient: axiosClient;
  public recipeList: RecipeModel[] = [];
  constructor(private recipeService: RecipeService, private axios: AxiosService) { 
  }

  ngOnInit(): void {
    this.recipeList = this.recipeService.getRecipes();
    this.recipeService.RecipeChanged
    .subscribe((recipe_list: RecipeModel[]) => {
      this.recipeList = recipe_list;
      // console.log(this.recipeList);
    });
  }

  getRandomRecipe(): void {
    this.getRandomRecipeHelper()
    .then(recipe => {
      this.recipeService.addRecipes(recipe);
    })
  }

  async getRandomRecipeHelper(): Promise<RecipeModel> {
    try {
      let recipeObject = await this.axios.get<any>({
        url: "https://www.themealdb.com/api/json/v1/1/random.php",
        
      });
      let meal_info: any = recipeObject.meals[0];

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
      return new Promise<RecipeModel>((resolve, reject) => {resolve(recipe)});
    }
    catch(error) {
      console.error(error);
    }
  }

  clearRecipes() {
    // this.recipeService.clearAll();
  }
}
