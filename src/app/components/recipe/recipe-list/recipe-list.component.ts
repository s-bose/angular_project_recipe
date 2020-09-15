import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { AxiosService } from '../../../services/axios.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
  // public axiosClient: axiosClient;
  public recipeList: RecipeModel[] = [];
  constructor(
    private recipeService: RecipeService, 
    private axios: AxiosService,
    private apiService: ApiService) { 
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
    this.apiService.RandomRecipe()
    .then(recipe => {
      this.recipeService.addRecipes(recipe);
    })
  }
}
