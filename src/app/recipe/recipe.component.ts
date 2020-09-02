import { Component, OnInit } from '@angular/core';
import { RecipeModel } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: []
})
export class RecipeComponent implements OnInit {
  currentRecipe: RecipeModel;
  recipeSelected: boolean = false;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {  
    this.recipeService.showSelectedRecipe
    .subscribe((recipe: RecipeModel) => {
      this.currentRecipe = recipe;
      this.recipeService.popup.next('open');
      // console.log(this.currentRecipe);
    })  
  }


}
