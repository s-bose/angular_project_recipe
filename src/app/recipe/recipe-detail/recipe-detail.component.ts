import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { RecipeModel } from '../recipe.model';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe: RecipeModel;
  @ViewChild('mymodal') modal: any;
  sub: any;

  constructor(private ngModalService: NgbModal, private modalService: ModalService) {}

  ngOnInit(): void {
    this.sub = this.modalService.selectedRecipe.subscribe(val => {
      this.selectedRecipe = val;
      if (val) {
        this.ngModalService.open(this.modal, {size: 'lg', scrollable: true});
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
