import { Component, OnInit, Input } from '@angular/core';

import { RecipeModel } from '../../../../models/recipe.model';
import { ModalService } from '../../../../services/modal.service';
import { ApiService } from "../../../../services/api.service";
import { RecipeService } from "../../../../services/recipe.service";
import { Tags, recipeQueryInterface } from "../../../../models/recipe-query.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  isFavourite: boolean = false;
  @Input() recipeInstance: RecipeModel;
  cardText: string;
  constructor(
    private modalService: ModalService,
    private apiService: ApiService,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.cardText = this.recipeInstance.ingredients.slice(0, 3).map(elem => elem.name).join(', ');
    this.cardText = this.cardText + '...and ' + (this.recipeInstance.ingredients.length - 3) + ' more';
  }

  showRecipeDetail() {
    this.modalService.selectedRecipe.next(this.recipeInstance);
  }

  fetchRecipesFromTag(tag: Tags, value: string): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    let query: recipeQueryInterface = new recipeQueryInterface();
    query[Tags[tag]] = value;
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
