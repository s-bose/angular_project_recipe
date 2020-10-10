import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('categoryModal') modal: any;
  sub: any;
  
  constructor(
    private bsModal: BsModalService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.sub = this.modalService.categoriesList.subscribe(val => {
      // this.openModal(this.modal);
      this.modal.show();
    })
  }
}
