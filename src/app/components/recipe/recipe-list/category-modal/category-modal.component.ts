import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


import { ModalService } from '../../../../services/modal.service';
import { ApiService } from '../../../../services/api.service';

import { Tags, RecipeQueryModel } from '../../../../models/recipe-query.model';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('categoryModal') modal: any;
  sub: any;
  list: string[] = [];
  listType: string;

  constructor(
    private modalService: ModalService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.sub = this.modalService.categoriesList.subscribe(type => {
      this.list = [];
      this.listType = type;
      if (type === 'category') {
        this.apiService.Categories()
        .then(categories => {
          this.list = categories;
          console.log(categories);
        });
      }
      else {
        this.apiService.Cuisines()
        .then(cuisines => {
          this.list = cuisines;
          console.log(cuisines);
        });
      }
      this.modal.show();
      // console.log(Tags[this.listType]);
    });
  }

  openSelected(val): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    const query: RecipeQueryModel = new RecipeQueryModel();
    query[this.listType] = val;
    this.apiService.getFilteredRecipes(query);
    this.modal.hide();
  }
}
