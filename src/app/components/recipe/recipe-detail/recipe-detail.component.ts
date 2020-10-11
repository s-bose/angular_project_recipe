import { Component, OnInit, Input, ViewChild, OnDestroy, TemplateRef } from '@angular/core';

import { RecipeModel } from '../../../models/recipe.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { RecipeService } from '../../../services/recipe.service';
import { ModalService } from '../../../services/modal.service';
import { shoppingItemModel } from '../../../models/shopping-item.model';
import { ApiService } from '../../../services/api.service';

import { Tags, RecipeQueryModel } from '../../../models/recipe-query.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  @Input() selectedRecipe: RecipeModel;
  @ViewChild('mymodal') modal: any;
  sub: any;

  constructor(private modalService: ModalService,
              private ngModalService: BsModalService,
              private recipeService: RecipeService,
              private apiService: ApiService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.ngModalService.show(template, {class: 'modal-lg'});
  }
  
  ngOnInit(): void {
    this.sub = this.modalService.selectedRecipe.subscribe(val => {
      this.selectedRecipe = val;
      if (val) {
        this.openModal(this.modal);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onFavouriteSelected() {
    this.selectedRecipe.favourite = !this.selectedRecipe.favourite;
    if (this.selectedRecipe.favourite) {
      this.recipeService.addFavouritedRecipe(this.selectedRecipe);
    } else {
      this.recipeService.deleteFavouritedRecipe(this.selectedRecipe);
    }
  }

  onAddToShoppingSelected() {
    this.selectedRecipe.addedToShopping = !this.selectedRecipe.addedToShopping;
    let shoppingItem: shoppingItemModel = new shoppingItemModel(this.selectedRecipe.id, this.selectedRecipe.title, this.selectedRecipe.ingredients);
    if (this.selectedRecipe.addedToShopping) {
      this.recipeService.addToShoppingList(shoppingItem);
    } else {
      this.recipeService.deleteFromShoppingList(shoppingItem);
    }
  }

  onTagSelected(tag: Tags, value: string): void {
    this.modalRef.hide();

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    let query : RecipeQueryModel = new RecipeQueryModel;
    query[Tags[tag]] = value;
    this.apiService.getFilteredRecipes(query);
  }
}
