import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe: RecipeModel;
  @ViewChild('mymodal') modal: any;
  
  constructor(private modalService: NgbModal, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.popup.subscribe(val => {
      if (val === 'open') {
        this.modalService.open(this.modal, {size: 'lg', scrollable: true});
      }
    })
  }
}
