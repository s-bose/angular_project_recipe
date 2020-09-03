import { Component, OnInit, Input, ViewChild, OnDestroy, TemplateRef } from '@angular/core';

import { RecipeModel } from '../recipe.model';
import { ModalService } from '../modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
              private ngModalService: BsModalService) {}

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
  }
}
