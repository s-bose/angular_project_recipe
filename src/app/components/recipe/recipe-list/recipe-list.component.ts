import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { RecipeModel } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { ApiService } from '../../../services/api.service';
import { ModalService } from '../../../services/modal.service';

import { RecipeQueryModel } from '../../../models/recipe-query.model';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
  public recipeList: RecipeModel[] = [];
  public searchItem: string;
  public queryType: string;

  public searchResultInfo: string;

  @ViewChild('searchTop') searchParentRef: ElementRef;
  @ViewChild('searchForm') searchBarForm: ElementRef;

  public types: Array<object> =
  [
    {name: 'Main Ingredient', value: 'mainIngredient'},
    {name: 'Category', value: 'category'},
    {name: 'Cuisine', value: 'area'},
  ];

  constructor(
    private recipeService: RecipeService,
    private apiService: ApiService,
    private modalService: ModalService) {
      this.queryType = this.types[0][`value`];
  }

  ngOnInit(): void {

    // ? this part enables the animation which expands the search bar on page scroll

    window.addEventListener('scroll', () => {
        const scrollpos = window.scrollY;
        if (scrollpos >= this.searchParentRef.nativeElement.offsetTop) {
          this.searchBarForm.nativeElement.classList.add('col-12');
        }
        else {
          this.searchBarForm.nativeElement.classList.remove('col-12');
        }
    });

    // ? sync local recipeList with service recipeList via subscription
    this.recipeList = this.recipeService.getRecipes();
    this.recipeService.RecipeChanged
    // tslint:disable-next-line: variable-name
    .subscribe((recipe_list: RecipeModel[]) => {
      this.recipeList = recipe_list;
    });

    this.apiService.currentQuery.subscribe(query => {
      this.searchResultInfo = query[Object.keys(query)[0]];
    });
  }

  // ? SECTION handler for the getters in the apiService

  getRandomRecipe(): void {
    this.apiService.getRandomRecipe();
  }

  getRecipesFromSearch(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    const query: RecipeQueryModel = new RecipeQueryModel();
    query[this.queryType] = this.searchItem;
    this.apiService.getFilteredRecipes(query);
  }


  getCategories(): void {
    this.modalService.categoriesList.next('category');
  }

  getCuisines(): void {
    this.modalService.categoriesList.next('area');
  }

}
