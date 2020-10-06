import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { ApiService } from '../../../services/api.service';


import { recipeQueryInterface } from '../../../models/recipe-query.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
  public recipeList: RecipeModel[] = [];
  
  public searchItem: string;
  public queryType: string;
  
  public types: Array<Object> = 
  [
    {name: "Main Ingredient", value: "mainIngredient"},
    {name: "Category", value: "category"},
    {name: "Cuisine", value: "area"},
  ];

  constructor(
    private recipeService: RecipeService, 
    private apiService: ApiService) { 
      this.queryType = this.types[0]["value"];
  }

  ngOnInit(): void {

    // var scrollpos = window.scrollY; // window scroll position
    var wh = window.innerHeight-50; // as soon as element touches bottom with offset event starts
    var searchParent: HTMLElement = document.querySelector(".search-bar-top"); //element
    var searchBarForm: HTMLElement = document.querySelector(".search-form");
    window.addEventListener('scroll', function(){ 
        var scrollpos = window.scrollY;
        if (scrollpos >= searchParent.offsetTop) {
          searchBarForm.classList.add("search-form-anim"); 
        }
        else {
          searchBarForm.classList.remove("search-form-anim");
        }
    });

    this.recipeList = this.recipeService.getRecipes();
    this.recipeService.RecipeChanged
    .subscribe((recipe_list: RecipeModel[]) => {
      this.recipeList = recipe_list;
    });
  }

  getRandomRecipe(): void {
    this.apiService.RandomRecipe()
    .then(recipe => {
      this.recipeService.clearSearch();
      this.recipeService.addRecipes(recipe);
      // this.recipeService.addRecipes(recipe);
    })
  }

  fetchRecipesFromSearch(): void {
    let query : recipeQueryInterface = new recipeQueryInterface;
    query[this.queryType] = this.searchItem;
    // console.log(query);
    this.apiService.RecipesByFilter(query)
    .then(lists => {
      this.recipeService.clearSearch();
      lists.forEach(elem => {
        this.recipeService.addRecipes(elem);
      })
    })
  }
}
