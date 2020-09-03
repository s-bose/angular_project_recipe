import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe/recipe.service';
import { RecipeModel } from '../recipe/recipe.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  favouriteRecipes: RecipeModel[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.favouriteRecipes = this.recipeService.getFavouriteRecipes();
  }

  

}

