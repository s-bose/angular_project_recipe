import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { shoppingItemModel } from './shopping-item.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingCartRecipes: shoppingItemModel[];
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.shoppingCartRecipes = this.recipeService.getShoppingList();

    let searchSection = document.getElementById('searchSection');
    searchSection.appendChild(document.createElement('script')).src = "https://cse.google.com/cse.js?cx=dc5cfbd31541cbb99";
    if (!this.shoppingCartRecipes.length) {
      searchSection.style.opacity = '0';
    }
  }
}

