import { Component, OnInit, Input } from '@angular/core';
import { RecipeModel } from '../../../../models/recipe.model';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  isFavourite: boolean = false;
  @Input() recipeInstance: RecipeModel;
  cardText: string;
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.cardText = this.recipeInstance.ingredients.slice(0, 3).map(elem => elem.name).join(', ');
    this.cardText = this.cardText + '...and ' + (this.recipeInstance.ingredients.length - 3) + ' more';
  }

  showRecipeDetail() {
    this.modalService.selectedRecipe.next(this.recipeInstance);
  }

  dummygetRecipeById() {}
}
