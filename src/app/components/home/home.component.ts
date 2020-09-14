import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../../services/recipe.service';
import { RecipeModel } from '../../shared/models/recipe.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  favouriteRecipes: RecipeModel[] = [];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.favouriteRecipes = this.favouriteRecipes.concat(this.recipeService.getFavouriteRecipes());
    this.recipeService.FavouritesChanged.subscribe(favouriteRecipeList => {
      this.favouriteRecipes = favouriteRecipeList;
    })
  }

  

}

