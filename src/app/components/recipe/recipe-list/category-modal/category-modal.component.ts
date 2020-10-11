import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


import { ModalService } from '../../../../services/modal.service';
import { ApiService } from '../../../../services/api.service';

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
    private bsModal: BsModalService,
    private modalService: ModalService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.sub = this.modalService.categoriesList.subscribe(type => {
      this.listType = type;
      if (type === "categories") {
        this.apiService.Categories()
        .then(categories => {
          this.list = categories;
          console.log(categories);
        })
      }
      else {
        this.apiService.Cuisines()
        .then(cuisines => {
          this.list = cuisines;
          console.log(cuisines);
        })
      }   
      this.modal.show();
    })
  }



}
