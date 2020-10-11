import { Component, OnInit, Input } from '@angular/core';
import { shoppingItemModel } from '../../../models/shopping-item.model';
@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {

  @Input() shoppingItem: shoppingItemModel;
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
