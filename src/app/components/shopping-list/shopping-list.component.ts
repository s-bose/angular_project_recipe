import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { shoppingItemModel } from '../../shared/models/shopping-item.model';

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
    this.recipeService.ShoppingChanged
    .subscribe(shoppingList => {
      this.shoppingCartRecipes = shoppingList;
    })
    let searchSection = document.getElementById('searchSection');
    searchSection.appendChild(document.createElement('script')).src = "https://cse.google.com/cse.js?cx=dc5cfbd31541cbb99";
    if (!this.shoppingCartRecipes.length) {
      searchSection.style.opacity = '0';
    }
  }
}

